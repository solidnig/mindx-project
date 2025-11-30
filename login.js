// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Sai email hoặc mật khẩu!");
    return;
  }

  // Lưu user đang đăng nhập
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Đăng nhập thành công!");
  window.location.href = "index.html";
});
