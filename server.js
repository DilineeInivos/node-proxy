const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Reverse proxy route
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://tea-dev.inivosglobal.com:8443',
    changeOrigin: true,
    secure: false, // skip SSL verification (if self-signed)
    pathRewrite: {
      '^/api': '', // remove /api prefix before forwarding
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
