function saveRecipe() {
  const recipe = {
    ten: document.getElementById("ten").value,
    ghi_chu: document.getElementById("ghi_chu").value,
    nguyen_lieu: [],
    cach_lam: [],
    tip: document.getElementById("tip").value || null,
  };

  // LẤY LIST HIỆN CÓ
  let data = JSON.parse(localStorage.getItem("recipes")) || [];

  // PUSH MỚI
  data.push(recipe);

  // LƯU LẠI
  localStorage.setItem("recipes", JSON.stringify(data));
  console.log("Dữ liệu lấy ra:", data);

  alert("Đã lưu công thức!");
}
