import rateLimit from 'express-rate-limit';

// Max 3 OTP requests per IP per 10 minutes, as specified.
export const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many verification requests. Please try again in 10 minutes.' }
});

// General-purpose looser limiter for public write endpoints.
export const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down and try again shortly.' }
});
