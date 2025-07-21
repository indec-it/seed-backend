export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Request received`);

  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - start;
    const endTimestamp = new Date().toISOString();

    console.log(`[${endTimestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);

    originalEnd.apply(this, args);
  };

  next();
};
