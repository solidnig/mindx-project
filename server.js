const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const CryptoJS = require("crypto-js");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("users.json");
const db = low(adapter);

// Khởi tạo DB nếu chưa có
db.defaults({ users: [] }).write();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(".")); // Phục vụ file HTML/JS/CSS từ thư mục gốc
app.use(
  session({
    secret: "mindx-social-secret-key", // Thay bằng key thật
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // true nếu dùng HTTPS
  })
);

// Route trang index
app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(`
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <title>MindX-Social - Index</title>
                <style>body { font-family: Arial; padding: 20px; } .welcome { color: #1877f2; }</style>
            </head>
            <body>
                <h1>Chào mừng đến MindX-Social!</h1>
                <p class="welcome">Chào <strong>${req.session.user.username}</strong>! Bạn đã đăng nhập thành công.</p>
                <a href="/logout">Đăng xuất</a> | <a href="/register">Đăng ký</a> | <a href="/login">Đăng nhập</a>
            </body>
            </html>
        `);
  } else {
    res.send(`
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <title>MindX-Social - Index</title>
                <style>body { font-family: Arial; padding: 20px; }</style>
            </head>
            <body>
                <h1>MindX-Social</h1>
                <p>Chưa đăng nhập. <a href="/login">Đăng nhập</a> | <a href="/register">Đăng ký</a></p>
            </body>
            </html>
        `);
  }
});

// Route đăng ký (POST /register)
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  const existingUser = db.get("users").find({ email }).value();
  if (existingUser) {
    return res.json({ success: false, message: "Email đã tồn tại!" });
  }
  const hashedPassword = CryptoJS.SHA256(password).toString(); // Hash password
  db.get("users").push({ email, username, password: hashedPassword }).write();
  res.json({
    success: true,
    message: "Đăng ký thành công! Vui lòng đăng nhập.",
  });
});

// Route đăng nhập (POST /login)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();
  const user = db
    .get("users")
    .find({ email, password: hashedPassword })
    .value();
  if (user) {
    req.session.user = user; // Lưu session
    res.json({
      success: true,
      message: "Đăng nhập thành công!",
      redirect: "/",
    });
  } else {
    res.json({ success: false, message: "Email hoặc password sai!" });
  }
});

// Route đăng xuất
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Phục vụ trang login.html
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Phục vụ trang register.html
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
