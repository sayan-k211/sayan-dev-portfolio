// server/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const path = require('path');

// create app BEFORE any app.use(...)
const app = express();

/* ---------- Env ---------- */
const {
  NODE_ENV = 'development',
  PORT = 8080,
  MONGO_URI,
  CLIENT_ORIGIN,
} = process.env;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in .env');
  process.exit(1);
}

/* ---------- Middleware ---------- */
app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
];
if (CLIENT_ORIGIN) allowedOrigins.push(CLIENT_ORIGIN);

app.use(cors({ origin: allowedOrigins, credentials: false }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(
  '/api',
  rateLimit({
    windowMs: 60_000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ---------- Static: /public for assets you added ---------- */
// serve files from /server/src/public at /public/...
app.use(
  '/public',
  express.static(path.join(__dirname, 'public'), {
    etag: true,
    maxAge: NODE_ENV === 'production' ? '1y' : '1d',
    setHeaders: (res, filepath) => {
      if (filepath.endsWith('.pdf')) {
        res.set('Content-Type', 'application/pdf');
      }
    },
  })
);

// dev log for static requests you wanted
if (NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    if (req.path.includes('/projects/') || req.path.includes('/resume/')) {
      console.log('Static file requested:', req.path);
    }
    next();
  });
}

/* ---------- API Routes ---------- */
const portfolioRoutes = require('./routes/portfolio.routes');
const contactRoutes = require('./routes/contact.routes');
const resumeRoutes = require('./routes/resume.routes');

app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: 'ok' });
});

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);

/* ---------- Serve Angular build ---------- */
// confirmed output path: client/dist/client/browser
const clientDist = path.join(__dirname, '..', '..', 'client', 'dist', 'client', 'browser');

// serve the Angular static files
app.use(express.static(clientDist));

/* ---------- SPA fallback (Express v5 safe) ---------- */
// any GET not starting with /api returns Angular index.html
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

/* ---------- 404 ---------- */
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

/* ---------- Error Handler ---------- */
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: NODE_ENV === 'production' ? 'Server error' : err.message,
  });
});

/* ---------- DB + Start ---------- */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅');
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed ❌', err.message);
    process.exit(1);
  });
