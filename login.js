var formLogin = document.querySelector("#form-login");

// lắng nghe sự kiện khi người dùng bấm vào nút Login có type = submit
// thì sự kiện sẽ đón nhận
formLogin.addEventListener("submit", (e) => {
  e.preventDefault(); // ngăn chặm reload lại trang
  let email = e.target[0].value;
  let password = e.target[1].value;
  console.log(email, password);

  // kiểm tra trong localStorage có cái user với email và password đã đăng kí đó chưa?
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  // tìm trong data xem có user nào giống như ở trên đăng nhập hay không?
  const userExists = userData.find(
    (user) => user.email === email && user.password === password
  );

  if (userExists) {
    console.log("found user", userExists);
    // lưu lại user hiện tại để biết người dùng đăng nhập hay chưa
    localStorage.setItem("currentUser", JSON.stringify(userExists));

    window.location.href = "index.html";
  } else {
    alert("Tài khoản hoặc mật khẩu không đúng!");
  }
});
