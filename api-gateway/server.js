const path = require("path");
const gateway = require("express-gateway");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
  })
);

app.use(
  "/api/board",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
  })
);

console.log("게이트웨이 굴러간다");

gateway().load(path.join(__dirname, "config")).run();
