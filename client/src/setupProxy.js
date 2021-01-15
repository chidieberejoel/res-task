const proxy = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
  app.use(
    proxy(`/auth/**`, { target: "http://localhost:4000", changeOrigin: true })
  );
};
