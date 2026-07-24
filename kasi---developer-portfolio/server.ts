import express from 'express';
import path from 'path';
import os from 'os';
import dns from 'dns';
import nodemailer from 'nodemailer';
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

      // Helper to create transport with timeouts
      const createTransportForPort = (port: number) => {
        return nodemailer.createTransport({
          host: smtpHost,
          port: port,
          secure: port === 465, // SSL for 465, STARTTLS for 587/25
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 10000, // 10 seconds max connection
          greetingTimeout: 8000,
          socketTimeout: 12000,
          tls: {
            rejectUnauthorized: false,
          },
          // Force IPv4 address resolution to fix ENETUNREACH on Render/Cloud containers without IPv6
          family: 4,
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
