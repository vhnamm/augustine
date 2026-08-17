const jsonServer = require("json-server");
const cors = require("cors");
const express = require("express"); // json-server uses express; require để rõ ràng

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// CORS + expose header
server.use(
  cors({
    origin: "*",
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(middlewares);

// Middleware thêm X-Total-Count khi dùng pagination
server.use((req, res, next) => {
  if (
    req.method === "GET" &&
    (req.query._page || req.query._limit || req.query._start || req.query._end)
  ) {
    const parts = req.path.split("/").filter(Boolean);
    const collection = parts[0] || "";
    try {
      const data = router.db.get(collection).value() || [];
      res.header("X-Total-Count", data.length);
      res.header("Access-Control-Expose-Headers", "X-Total-Count");
    } catch (err) {
      // ignore if collection not found
    }
  }
  next();
});

server.use(router);

const PORT = 3000;
// Thêm '0.0.0.0' để server mở cho tất cả các thiết bị trong mạng
server.listen(PORT, '0.0.0.0', () => {
  console.log(`JSON Server running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  // Hiển thị IP thật để bạn dễ biết đường dẫn cho điện thoại
  console.log(`- Network: http://[IP_MAY_TINH_CUA_BAN]:${PORT}`); 
});
