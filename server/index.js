import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import otpRoutes from './routes/otp.js';
import leadRoutes from './routes/leads.js';
import bookingRoutes from './routes/bookings.js';
import blogRoutes from './routes/blog.js';
import bookRoutes from './routes/books.js';
import surveyRoutes from './routes/survey.js';
import settingsRoutes from './routes/settings.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = (process.env.FRONTEND_URLS || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);
app.use(express.json({ limit: '2mb' }));

// Keep-alive endpoint for Render free tier (ping via cron-job.org every 14 min)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/admin', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/settings', settingsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Aome Consults API running on port ${PORT}`);
});
