import express from 'express';
import path from 'path';
import os from 'os';
import dns from 'dns';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Force DNS resolution to prefer IPv4 first across Node.js networking
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch {
  // ignore if not supported in old node versions
}

// Load .env first, then fallback to .env.example if variables are missing
dotenv.config();
dotenv.config({ path: path.join(process.cwd(), '.env.example') });

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Enable CORS headers for API requests
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Contact API endpoint for sending emails directly via SMTP/Server
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body || {};

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required fields.',
        });
      }

      const recipient = 'kasiram186@gmail.com';
      const mailSubject = subject
        ? `[Portfolio Contact] ${subject} - ${name}`
        : `[Portfolio Contact] New message from ${name}`;

      const emailBody = `
New message received from your Portfolio website contact form:

Name: ${name}
Email: ${email}
Subject: ${subject || 'General Inquiry'}

Message:
${message}

---
Sent via Portfolio Backend Dispatcher
      `.trim();

      // 1. First try Resend API (HTTPS based - works everywhere including Render)
      const resendApiKey = process.env.RESEND_API_KEY;
      console.log("========== RESEND DEBUG ==========");
console.log("API Key Exists:", !!process.env.RESEND_API_KEY);
console.log("API Key Prefix:", process.env.RESEND_API_KEY?.substring(0, 8));
console.log("Using Fallback Key:", !process.env.RESEND_API_KEY);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("==================================");
      if (resendApiKey) {
        try {
          console.log('[Email Dispatch] Attempting email send via Resend API...');
          const resend = new Resend(resendApiKey);
          const resendResult = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'kasiram186@gmail.com',
            replyTo: email,
            subject: mailSubject,
            text: emailBody,
          });

          if (resendResult.error) {
            console.warn('[Email Dispatch Warning] Resend returned error:', resendResult.error);
            throw new Error(resendResult.error.message || 'Resend delivery failed');
          }

          console.log('[Email Dispatch] Successfully sent email via Resend API! ID:', resendResult.data?.id);
          return res.status(200).json({
            success: true,
            message: 'Your message has been sent directly to kasiram186@gmail.com!',
            recipient,
            sentViaResend: true,
          });
        } catch (resendErr: any) {
          console.error("========== RESEND EXCEPTION ==========");
    console.error(resendErr);
    console.error("Message:", resendErr?.message);
    console.error("Stack:", resendErr?.stack);
    console.error("======================================");

          console.warn('[Email Dispatch Warning] Resend send failed, attempting SMTP fallback:', resendErr?.message || resendErr);
        }
      }

      // 2. Fallback to Nodemailer SMTP
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const configuredPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER || 'kasiram186@gmail.com';
      const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

      if (!smtpPass) {
        console.error('[Email Dispatch Error] SMTP_PASS is missing in environment variables.');
        return res.status(500).json({
          success: false,
          error: 'SMTP Password is missing. Please set SMTP_PASS in your Render Environment Variables.',
        });
      }

      // Resolve IPv4 address for SMTP host to prevent IPv6 ENETUNREACH errors on cloud hosting (Render)
      let targetHost = smtpHost;
      try {
        const resolved = await dns.promises.lookup(smtpHost, { family: 4 });
        if (resolved && resolved.address) {
          targetHost = resolved.address;
          console.log(`[Email Dispatch] Resolved ${smtpHost} to IPv4: ${targetHost}`);
        }
      } catch (lookupErr) {
        console.warn('[Email Dispatch Warning] Could not resolve IPv4 explicitly, falling back to hostname:', lookupErr);
      }

      // Helper to create transport with explicit IPv4 forcing and timeouts
      const createTransportForPort = (port: number) => {
        return nodemailer.createTransport({
          host: targetHost,
          port: port,
          secure: port === 465, // SSL for 465, STARTTLS for 587
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 15000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
          tls: {
            servername: 'smtp.gmail.com',
            rejectUnauthorized: false,
          },
          lookup: (hostname, _options, callback) => {
            dns.lookup(hostname, { family: 4 }, (err, address) => {
              callback(err, address, 4);
            });
          },
        } as any);
      };

      let sendError: any = null;
      let sentViaSmtp = false;

      // Primary attempt using configured port
      const portsToTry = configuredPort === 465 ? [465, 587] : [587, 465];

      for (const port of portsToTry) {
        try {
          console.log(`[Email Dispatch] Attempting SMTP send via ${smtpHost}:${port}...`);
          const transporter = createTransportForPort(port);
          await transporter.sendMail({
            from: `"${name} via Portfolio" <${smtpUser}>`,
            replyTo: email,
            to: recipient,
            subject: mailSubject,
            text: emailBody,
          });

          sentViaSmtp = true;
          console.log(`[Email Dispatch] Successfully sent email on port ${port}!`);
          break;
        } catch (err: any) {
          console.warn(`[Email Dispatch Warning] Port ${port} failed: ${err?.message || err}`);
          sendError = err;
        }
      }

      if (sentViaSmtp) {
        return res.status(200).json({
          success: true,
          message: 'Your message has been sent directly to kasiram186@gmail.com!',
          recipient,
          sentViaSmtp: true,
        });
      } else {
        throw sendError || new Error('SMTP connection timed out on all ports.');
      }
    } catch (err: any) {
      console.error('[Email Dispatch Error]:', err);
      
      return res.status(500).json({
        success: false,
        error: `Failed to send email via SMTP: ${err?.message || 'Check your Gmail App Password and Render Environment Variables.'}`,
      });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Serve static assets directory
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

  // Vite middleware for development or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    let networkAddress: string | null = null;
    try {
      const interfaces = os.networkInterfaces();
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
          if (iface.family === 'IPv4' && !iface.internal) {
            networkAddress = iface.address;
            break;
          }
        }
        if (networkAddress) break;
      }
    } catch {
      // ignore
    }

    console.log(`\n  Server running at:`);
    console.log(`  > Local:   http://localhost:${PORT}/`);
    if (networkAddress) {
      console.log(`  > Network: http://${networkAddress}:${PORT}/`);
    } else {
      console.log(`  > Network: http://0.0.0.0:${PORT}/`);
    }
    console.log('');
  });
}

startServer();
