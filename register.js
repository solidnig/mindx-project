// REGISTER
document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const displayName = document.getElementById("displayName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!displayName || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // kiểm tra email tồn tại chưa
    const exist = users.find((u) => u.email === email);

    if (exist) {
      alert("Email đã tồn tại, hãy dùng email khác!");
      return;
    }

    // thêm user mới
    users.push({
      displayName: displayName,
      email: email,
      password: password,
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
  });
