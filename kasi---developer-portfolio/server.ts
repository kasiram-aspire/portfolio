import express from 'express';
import path from 'path';
import os from 'os';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load .env first, then fallback to .env.example if variables are missing
dotenv.config();
dotenv.config({ path: path.join(process.cwd(), '.env.example') });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER || 'kasiram186@gmail.com';
      const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

      if (!smtpPass) {
        console.error('[Email Dispatch Error] SMTP_PASS is missing in environment variables.');
        return res.status(500).json({
          success: false,
          error: 'SMTP Password is missing. Please configure SMTP_PASS in your .env file.',
        });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} via Portfolio" <${smtpUser}>`,
        replyTo: email,
        to: recipient,
        subject: mailSubject,
        text: emailBody,
      });

      console.log(`[Email Dispatch] Successfully sent SMTP email from ${email} to ${recipient}`);

      return res.status(200).json({
        success: true,
        message: 'Your message has been sent directly to kasiram186@gmail.com!',
        recipient,
        sentViaSmtp: true,
      });
    } catch (err: any) {
      console.error('[Email Dispatch Error]:', err);
      return res.status(500).json({
        success: false,
        error: `Failed to send email via SMTP: ${err?.message || 'Check your Gmail App Password or network connection.'}`,
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
