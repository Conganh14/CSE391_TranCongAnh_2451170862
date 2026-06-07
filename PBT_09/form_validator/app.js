const validity = {
  name: false,
  email: false,
  password: false,
  confirm: false,
  phone: false,
};

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registerForm");

function setFieldState(fieldName, isValid, message) {
  const group = document.getElementById(`group-${fieldName}`);
  const msg = document.getElementById(`msg-${fieldName}`);
  const icon = document.getElementById(`icon-${fieldName}`);

  // Cập nhật validity object
  validity[fieldName] = isValid;

  // Đổi class → CSS tự thay màu border và chữ
  group.classList.toggle("valid", isValid);
  group.classList.toggle("invalid", !isValid);

  // Hiện icon ✅ hoặc ❌
  icon.textContent = isValid ? "✅" : "❌";

  // Hiện message
  msg.textContent = message;

  // Kiểm tra lại nút Submit sau mỗi lần field thay đổi
  checkSubmitBtn();
}

function clearFieldState(fieldName) {
  const group = document.getElementById(`group-${fieldName}`);
  const msg = document.getElementById(`msg-${fieldName}`);
  const icon = document.getElementById(`icon-${fieldName}`);

  validity[fieldName] = false;
  group.classList.remove("valid", "invalid");
  icon.textContent = "";
  msg.textContent = "";

  checkSubmitBtn();
}

function checkSubmitBtn() {
  // Object.values() → lấy tất cả giá trị → every() → kiểm tra tất cả đều true
  const allValid = Object.values(validity).every((v) => v === true);
  submitBtn.disabled = !allValid;
}

nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim();

  // Nếu rỗng → không hiện gì
  if (value === "") {
    clearFieldState("name");
    return;
  }

  if (value.length < 2) {
    setFieldState("name", false, "❌ Tên phải có ít nhất 2 ký tự");
  } else if (value.length > 50) {
    setFieldState("name", false, "❌ Tên không được quá 50 ký tự");
  } else {
    setFieldState("name", true, "✅ Tên hợp lệ");
  }
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener("input", () => {
  const value = emailInput.value.trim();

  if (value === "") {
    clearFieldState("email");
    return;
  }

  // Kiểm tra có @ không
  if (!value.includes("@")) {
    setFieldState("email", false, "❌ Email phải có ký tự @");
    return;
  }

  // Kiểm tra có dấu chấm ở phần sau @ không
  const afterAt = value.split("@")[1] || "";
  if (!afterAt.includes(".")) {
    setFieldState("email", false, "❌ Thiếu phần đuôi tên miền (vd: .com)");
    return;
  }

  // Kiểm tra toàn bộ regex
  if (!emailRegex.test(value)) {
    setFieldState("email", false, "❌ Định dạng email không hợp lệ");
  } else {
    setFieldState("email", true, "✅ Email hợp lệ");
  }
});

function getPasswordStrength(password) {
  if (password.length < 8) return "weak";

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (hasLower && hasUpper && hasNumber && hasSpecial) return "strong";
  if ((hasLower || hasUpper) && hasNumber) return "medium";
  return "weak";
}

const strengthBar = document.getElementById("strengthBar");
const strengthMessages = {
  weak: { text: "❌ Mật khẩu yếu (dưới 8 ký tự)", isValid: false },
  medium: {
    text: "⚠️ Trung bình — thêm chữ hoa và ký tự đặc biệt để mạnh hơn",
    isValid: false,
  },
  strong: { text: "✅ Mật khẩu mạnh", isValid: true },
};

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  if (value === "") {
    clearFieldState("password");
    // Reset thanh strength bar
    strengthBar.className = "strength-bar-fill";
    strengthBar.style.width = "0%";
    // Nếu đang nhập confirm → check lại khớp không
    validateConfirm();
    return;
  }

  const strength = getPasswordStrength(value);
  const { text, isValid } = strengthMessages[strength];

  // Đổi class trên thanh bar → CSS lo màu & width
  strengthBar.className = `strength-bar-fill ${strength}`;

  setFieldState("password", isValid, text);

  // Mỗi khi password đổi → validate lại confirm ngay
  validateConfirm();
});

function validateConfirm() {
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  if (confirm === "") {
    clearFieldState("confirm");
    return;
  }

  if (confirm !== password) {
    setFieldState("confirm", false, "❌ Mật khẩu nhập lại chưa khớp");
  } else {
    setFieldState("confirm", true, "✅ Mật khẩu khớp");
  }
}

confirmInput.addEventListener("input", validateConfirm);

phoneInput.addEventListener("input", () => {
  let digits = phoneInput.value.replace(/\D/g, "");

  // Giới hạn tối đa 10 số
  digits = digits.slice(0, 10);

  let formatted = digits;
  if (digits.length > 4 && digits.length <= 7) {
    formatted = digits.slice(0, 4) + "-" + digits.slice(4);
  } else if (digits.length > 7) {
    formatted =
      digits.slice(0, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7);
  }

  // Bước 3: Gán lại vào input
  phoneInput.value = formatted;

  // Bước 4: Validate
  if (digits === "") {
    clearFieldState("phone");
    return;
  }

  if (digits.length !== 10) {
    setFieldState(
      "phone",
      false,
      `❌ Cần đúng 10 chữ số (đã có ${digits.length})`,
    );
  } else if (!digits.startsWith("0")) {
    setFieldState("phone", false, "❌ Số điện thoại VN phải bắt đầu bằng 0");
  } else {
    setFieldState("phone", true, "✅ Số điện thoại hợp lệ");
  }
});

// =============================================================
// SUBMIT FORM — hiện modal thành công
// =============================================================
form.addEventListener("submit", (e) => {
  // Ngăn form reload trang (hành vi mặc định của browser)
  e.preventDefault();

  // Lấy dữ liệu từ form để hiện trong modal
  const userData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value,
  };

  openSuccessModal(userData);
});

function openSuccessModal(userData) {
  // Overlay (nền mờ)
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  // Hộp nội dung
  const box = document.createElement("div");
  box.className = "modal-box";

  // Icon
  const icon = document.createElement("div");
  icon.className = "modal-icon";
  icon.textContent = "🎉";

  // Tiêu đề
  const title = document.createElement("div");
  title.className = "modal-title";
  title.textContent = "Đăng ký thành công!";

  // Mô tả
  const desc = document.createElement("div");
  desc.className = "modal-desc";
  desc.textContent = "Tài khoản của bạn đã được tạo. Thông tin đăng ký:";

  // Bảng thông tin
  const info = document.createElement("div");
  info.className = "modal-info";

  const rows = [
    { label: "Họ tên", value: userData.name },
    { label: "Email", value: userData.email },
    { label: "SĐT", value: userData.phone },
  ];

  rows.forEach((row) => {
    const p = document.createElement("p");
    p.innerHTML = `${row.label}: <strong>${row.value}</strong>`;
    info.appendChild(p);
  });

  // Nút đóng
  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close-btn";
  closeBtn.textContent = "Xác nhận";
  closeBtn.addEventListener("click", () => overlay.remove());

  // Lắp ráp
  box.appendChild(icon);
  box.appendChild(title);
  box.appendChild(desc);
  box.appendChild(info);
  box.appendChild(closeBtn);
  overlay.appendChild(box);

  // Click ra ngoài modal → đóng
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.getElementById("modalArea").appendChild(overlay);
}
