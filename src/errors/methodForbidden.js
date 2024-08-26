function methodForbidden(req, res, next) {
  next({
    status: 403,
    message: `${req.method} forbidden for ${req.originalUrl}`,
  });
}

module.exports = methodForbidden;
