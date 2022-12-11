const authRoutes = require('./auth.routes');

function initRoutes(app) {
  app.use("/api/auth", authRoutes);
}

module.exports = initRoutes;