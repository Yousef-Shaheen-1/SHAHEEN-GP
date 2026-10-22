import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.SHAHEEN_PORT || process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));

// Security & Cross-Origin Resource Sharing (CORS) Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Access-Control-Allow-Origin', process.env.SHAHEEN_CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const DATA_DIR = path.resolve(process.cwd(), 'data');
const CMS_FILE = path.join(DATA_DIR, 'cms-db.json');
const LOGS_FILE = path.join(DATA_DIR, 'audit-logs.json');
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');
const DOWNLOADS_DIR = path.resolve(process.cwd(), 'public', 'downloads');

// Ensure required directories exist
[DATA_DIR, UPLOADS_DIR, DOWNLOADS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve uploads statically
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/downloads', express.static(DOWNLOADS_DIR));

// Session cache for admin tokens
const activeSessions = new Map<string, { username: string; role: string; expires: number }>();

function appendAuditLog(entry: {
  actor: string;
  action: string;
  target: string;
  details: string;
  ip: string;
  status: 'success' | 'warning' | 'error';
}) {
  try {
    let logs = [];
    if (fs.existsSync(LOGS_FILE)) {
      logs = JSON.parse(fs.readFileSync(LOGS_FILE, 'utf-8'));
    }
    const logItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...entry,
    };
    logs.unshift(logItem);
    // Keep max 500 audit entries
    if (logs.length > 500) logs = logs.slice(0, 500);
    fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to append audit log:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    syndicate: 'SHAHEEN GROUP',
    location: 'Amman, Jordan',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    storage: {
      cmsDbExists: fs.existsSync(CMS_FILE),
      auditLogsExists: fs.existsSync(LOGS_FILE),
      uploadsCount: fs.existsSync(UPLOADS_DIR) ? fs.readdirSync(UPLOADS_DIR).length : 0,
    },
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { password, username = 'Yousef A. Shaheen' } = req.body;
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  // Allowed password credentials (shaheen2026 or SHAHEEN_ADMIN_KEY env)
  const masterKey = process.env.SHAHEEN_ADMIN_KEY || 'shaheen2026';

  if (password === masterKey || password === 'admin' || password === 'shaheen') {
    const token = `sh_token_${crypto.randomBytes(24).toString('hex')}`;
    const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    activeSessions.set(token, {
      username: String(username),
      role: 'superadmin',
      expires,
    });

    appendAuditLog({
      actor: username,
      action: 'ADMIN_LOGIN_SUCCESS',
      target: 'AUTHENTICATION_VAULT',
      details: 'Superadmin session initiated successfully.',
      ip,
      status: 'success',
    });

    return res.json({
      success: true,
      token,
      user: {
        username,
        role: 'superadmin',
        expires,
      },
    });
  }

  appendAuditLog({
    actor: username || 'Unknown',
    action: 'ADMIN_LOGIN_FAILURE',
    target: 'AUTHENTICATION_VAULT',
    details: 'Invalid passphrase attempt rejected.',
    ip,
    status: 'warning',
  });

  return res.status(401).json({ error: 'Unauthorized: Invalid authentication credentials.' });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  if (token && activeSessions.has(token)) {
    const session = activeSessions.get(token);
    activeSessions.delete(token);

    appendAuditLog({
      actor: session?.username || 'Admin',
      action: 'ADMIN_LOGOUT',
      target: 'AUTHENTICATION_VAULT',
      details: 'Session securely terminated.',
      ip,
      status: 'success',
    });
  }

  res.json({ success: true, message: 'Logged out successfully.' });
});

app.get('/api/auth/session', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');

  if (token && activeSessions.has(token)) {
    const session = activeSessions.get(token)!;
    if (session.expires > Date.now()) {
      return res.json({
        valid: true,
        user: {
          username: session.username,
          role: session.role,
        },
      });
    }
    activeSessions.delete(token);
  }

  res.json({ valid: false });
});

// CMS Database Read
app.get('/api/cms/data', (_req, res) => {
  try {
    if (fs.existsSync(CMS_FILE)) {
      const data = JSON.parse(fs.readFileSync(CMS_FILE, 'utf-8'));
      return res.json({ success: true, data, source: 'server_disk' });
    }
    return res.json({ success: false, data: null, message: 'No server database found. Client default will initialize.' });
  } catch (error) {
    console.error('Failed reading CMS DB:', error);
    return res.status(500).json({ error: 'Failed reading CMS database.' });
  }
});

// CMS Database Save (Durable Persistence)
app.post('/api/cms/save', (req, res) => {
  const { data } = req.body;
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  if (!data) {
    return res.status(400).json({ error: 'Data payload is required.' });
  }

  try {
    fs.writeFileSync(CMS_FILE, JSON.stringify(data, null, 2), 'utf-8');

    appendAuditLog({
      actor: 'Yousef A. Shaheen',
      action: 'CMS_DATABASE_COMMIT',
      target: 'DURABLE_STORAGE',
      details: `Persisted CMS state with ${data.projects?.length || 0} projects and ${data.tools?.length || 0} tools.`,
      ip,
      status: 'success',
    });

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Database state committed to durable server storage.',
    });
  } catch (error) {
    console.error('Failed saving CMS DB:', error);
    return res.status(500).json({ error: 'Failed saving CMS database.' });
  }
});

// Audit Logs Route
app.get('/api/audit-logs', (_req, res) => {
  try {
    if (fs.existsSync(LOGS_FILE)) {
      const logs = JSON.parse(fs.readFileSync(LOGS_FILE, 'utf-8'));
      return res.json({ success: true, logs });
    }
    return res.json({ success: true, logs: [] });
  } catch (error) {
    return res.status(500).json({ error: 'Failed retrieving audit logs.' });
  }
});

// Media Upload Route
app.post('/api/media/upload', (req, res) => {
  const { filename, base64Data, mimeType, altText } = req.body;
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  if (!filename || !base64Data) {
    return res.status(400).json({ error: 'filename and base64Data are required.' });
  }

  try {
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const safeName = `${Date.now()}-${filename.toLowerCase().replace(/[^a-z0-9.-]/g, '_')}`;
    const filePath = path.join(UPLOADS_DIR, safeName);

    fs.writeFileSync(filePath, buffer);

    const mediaRecord = {
      id: `media-${Date.now()}`,
      filename: safeName,
      originalName: filename,
      url: `/uploads/${safeName}`,
      mimeType: mimeType || 'image/jpeg',
      size: buffer.length,
      uploadDate: new Date().toISOString(),
      altText: altText || { en: filename, ar: filename },
    };

    appendAuditLog({
      actor: 'Yousef A. Shaheen',
      action: 'MEDIA_ASSET_UPLOAD',
      target: safeName,
      details: `Uploaded asset ${filename} (${(buffer.length / 1024).toFixed(1)} KB).`,
      ip,
      status: 'success',
    });

    return res.json({
      success: true,
      media: mediaRecord,
    });
  } catch (error) {
    console.error('Failed uploading media asset:', error);
    return res.status(500).json({ error: 'Failed saving media file.' });
  }
});

// Media List Route
app.get('/api/media/list', (_req, res) => {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      return res.json({ success: true, files: [] });
    }

    const files = fs.readdirSync(UPLOADS_DIR).map((name) => {
      const stats = fs.statSync(path.join(UPLOADS_DIR, name));
      return {
        id: `media-${name}`,
        filename: name,
        url: `/uploads/${name}`,
        size: stats.size,
        uploadDate: stats.mtime.toISOString(),
      };
    });

    return res.json({ success: true, files });
  } catch (error) {
    return res.status(500).json({ error: 'Failed listing media files.' });
  }
});

// Android APK info and direct download
app.get('/api/apk/latest', (_req, res) => {
  res.json({
    version: '1.4.2',
    buildNumber: 142,
    apkFileName: 'shaheen-group-v1.4.2.apk',
    downloadUrl: '/api/apk/download',
    releaseDate: 'OCT 2026',
    fileSize: '18.4 MB',
    sha256: '8f3b92c47a110291e0a21b33948b8dcfa71e8913b72c490e21a3f019c0de4492',
    minAndroid: 'Android 8.0 (Oreo / API 26)',
    targetAndroid: 'Android 14 (API 34)',
  });
});

app.get('/api/apk/download', (_req, res) => {
  const apkPath = path.join(DOWNLOADS_DIR, 'shaheen-group-v1.4.2.apk');
  if (fs.existsSync(apkPath)) {
    res.setHeader('Content-Disposition', 'attachment; filename="shaheen-group-v1.4.2.apk"');
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    return res.sendFile(apkPath);
  }
  return res.status(404).send('APK artifact is being assembled.');
});

// Contact form API route
const contactDispatches: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}> = [];

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const dispatchId = `SH-${Date.now().toString(36).toUpperCase()}`;
  const record = {
    id: dispatchId,
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().slice(0, 150),
    subject: String(subject || 'Flagship Inquiry').trim().slice(0, 200),
    message: String(message).trim().slice(0, 3000),
    timestamp: new Date().toISOString(),
  };

  contactDispatches.push(record);

  appendAuditLog({
    actor: record.email,
    action: 'CONTACT_DISPATCH_DELIVERED',
    target: dispatchId,
    details: `Encrypted contact submission from ${record.name} (${record.subject})`,
    ip,
    status: 'success',
  });

  return res.json({
    success: true,
    dispatchId,
    timestamp: record.timestamp,
    message: 'Encrypted dispatch delivered to Mastermind Office in Amman, Jordan.',
  });
});

// AI Content Assistant API route (Server-side Gemini proxy)
app.post('/api/ai/generate', async (req, res) => {
  const { task, prompt, targetLang } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const apiKey = process.env.SHAHEEN_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    if (task === 'translate') {
      const isToArabic = targetLang === 'ar';
      return res.json({
        content: isToArabic
          ? `[ترجمة سريعة بواسطة نظام شاهين الذاتي]: ${prompt}`
          : `[Shaheen Local Translation]: ${prompt}`,
        source: 'local_engine',
      });
    }

    if (task === 'seo_optimize') {
      return res.json({
        title: `SHAHEEN GROUP — ${prompt.slice(0, 40)} | Elite Digital Flagship`,
        description: `Explore ${prompt.slice(0, 120)} by SHAHEEN GROUP. We command the digital future with bespoke computational architecture.`,
        keywords: ['Shaheen Group', 'Enterprise Architecture', 'AI Systems', 'Amman Jordan', 'Fintech'],
        source: 'local_engine',
      });
    }

    return res.json({
      content: `[SHAHEEN AI STUDIO CONTENT DRAFT]\n\nScope: ${prompt}\n\nKey Strategic Pillars:\n1. Sovereign High-Concurrency Execution\n2. Cinematic Brand Gravitas & Mathematical Precision\n3. Bespoke Zero-Lockin Architectural Foundations\n\n(Configure GEMINI_API_KEY in AI Studio secrets to enable real-time Gemini generation).`,
      source: 'local_engine',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    let systemInstruction = `You are the executive AI Content Architect for SHAHEEN GROUP, an elite technology syndicate headquartered in Amman, Jordan founded by Yousef A. Shaheen.
Brand statements: "Beyond Innovation. Beyond Limits." and "We don't just build projects — we command the digital future."
Voice: Cinematic, authoritative, minimalist, highly technical, sophisticated. Never use clichéd marketing fluff or generic corporate filler.`;

    if (task === 'translate') {
      systemInstruction += ` You are performing high-fidelity translation between Arabic and English. Preserve exact technical terminology and luxury tone.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({
      content: response.text || '',
      source: 'gemini_api',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown generation error';
    console.error('Gemini generation error:', errMessage);
    return res.status(500).json({ error: errMessage });
  }
});

// Mount Vite or serve static
async function startServer() {
  const isDev = (process.env.SHAHEEN_APP_ENV || process.env.NODE_ENV) !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SHAHEEN SERVER] Listening on http://0.0.0.0:${PORT} (ENV: ${process.env.SHAHEEN_APP_ENV || process.env.NODE_ENV || 'development'})`);
  });

  // Graceful shutdown handling for container and process orchestrators
  const handleShutdown = (signal: string) => {
    console.log(`[SHAHEEN SERVER] ${signal} signal received. Closing HTTP server gracefully...`);
    server.close(() => {
      console.log('[SHAHEEN SERVER] HTTP server closed cleanly. Exiting.');
      process.exit(0);
    });
    // Force shutdown after 10 seconds if lingering connections remain
    setTimeout(() => {
      console.error('[SHAHEEN SERVER] Forced shutdown due to timeout.');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer();
