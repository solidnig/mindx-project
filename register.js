// lấy phần tử form đăng ký
const registerForm = document.querySelector("#registerForm");

// nếu registerForm tồn tại thì mới thêm sự kiện submit
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // ngăn chặn hành vi mặc định của form
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(displayName, email, password);

    const req = await fetch();
  });
}
