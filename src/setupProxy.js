/*
 * @Author: yanzhourong
 * @Date: 2022-06-28 22:39:12
 * @LastEditTime: 2022-06-28 22:48:26
 * @Description: 
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://i.maoyan.com',
      changeOrigin: true,
    })
  );
};