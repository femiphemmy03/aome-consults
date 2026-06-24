// Centralized error handler — every route's catch block should call next(err)
// or this won't catch it. Keeps error responses consistent and avoids leaking
// stack traces to the client outside development.
export function errorHandler(err, req, res, next) {
  console.error('[errorHandler]', err);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong. Please try again.';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}
