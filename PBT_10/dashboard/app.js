// Danh sách các API endpoints (Cố tình thêm tham số random vào post để data đổi mới nếu có thể, hoặc dùng id ngẫu nhiên)
const API_URLS = [
  "https://dog.ceo/api/breeds/image/random",
  "https://jsonplaceholder.typicode.com/posts/1", // Sẽ random ID ở hàm fetch
  "https://randomuser.me/api/",
];

// DOM Elements
const btnRefresh = document.getElementById("btn-refresh");
const timeDisplay = document.getElementById("time-display");
const globalLoader = document.getElementById("global-loader");

// Gắn sự kiện cho nút Refresh
btnRefresh.addEventListener("click", loadDashboard);

// Tự động load lần đầu khi mở trang
document.addEventListener("DOMContentLoaded", loadDashboard);

// Hàm Helper: Đưa widget về trạng thái loading
function setWidgetLoading(index) {
  const contentDiv = document.querySelector(`#widget-${index} .widget-content`);
  contentDiv.innerHTML = `<div class="widget-loading">Đang tải dữ liệu...</div>`;
}

// Hàm Helper: Xử lý lỗi riêng cho từng Widget
function renderWidgetError(index, message) {
  const contentDiv = document.querySelector(`#widget-${index} .widget-content`);
  contentDiv.innerHTML = `
        <div class="widget-error">
            <strong>Lỗi tải dữ liệu</strong><br>
            <small>${message}</small>
        </div>
    `;
}

// Hàm Helper: Hiển thị dữ liệu thành công tùy theo từng API
function renderWidget(index, data) {
  const contentDiv = document.querySelector(`#widget-${index} .widget-content`);

  switch (index) {
    case 0: // Dog API
      contentDiv.innerHTML = `<img src="${data.message}" class="dog-img" alt="Random Dog">`;
      break;

    case 1: // JSONPlaceholder Post
      contentDiv.innerHTML = `
                <div class="post-title">${data.title}</div>
                <div class="post-body">${data.body}</div>
            `;
      break;

    case 2: // Random User
      const user = data.results[0];
      contentDiv.innerHTML = `
                <img src="${user.picture.large}" class="user-avatar" alt="User">
                <div class="user-info">
                    <strong>${user.name.first} ${user.name.last}</strong><br>
                    <small>${user.email}</small><br>
                    <small>${user.location.country}</small>
                </div>
            `;
      break;
  }
}

// ==========================================
// HÀM CHÍNH: Xử lý Promise.allSettled (Bắt buộc)
// ==========================================
async function loadDashboard() {
  const startTime = Date.now();

  // Cập nhật UI trạng thái Loading tổng thể
  btnRefresh.disabled = true;
  globalLoader.style.display = "block";
  timeDisplay.textContent = "Đang fetch dữ liệu...";

  // Reset 3 widget về trạng thái loading nội bộ
  [0, 1, 2].forEach(setWidgetLoading);

  // Random post ID (từ 1 đến 100) để JSONPlaceholder luôn trả về data khác nhau mỗi lần Refresh
  const randomPostId = Math.floor(Math.random() * 100) + 1;

  // Sử dụng Promise.allSettled để gọi song song
  // Gắn thêm khối .then() để bắt lỗi mạng/status HTTP nội tại của từng fetch
  const results = await Promise.allSettled([
    fetch(API_URLS[0]).then((r) => {
      if (!r.ok) throw new Error("Dog API Error");
      return r.json();
    }),
    fetch(`https://jsonplaceholder.typicode.com/posts/${randomPostId}`).then(
      (r) => {
        if (!r.ok) throw new Error("Post API Error");
        return r.json();
      },
    ),
    fetch(API_URLS[2]).then((r) => {
      if (!r.ok) throw new Error("User API Error");
      return r.json();
    }),
  ]);

  // Xử lý kết quả trả về của từng Promise
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      // Promise chạy thành công (200 OK)
      renderWidget(index, result.value);
    } else {
      // Promise bị từ chối (Lỗi mạng hoặc bị throw Error bên trên)
      renderWidgetError(index, result.reason.message);
    }
  });

  // Cập nhật UI trạng thái hoàn thành
  const duration = Date.now() - startTime;
  timeDisplay.textContent = `Data loaded in ${duration} ms`;
  console.log(`Loaded in ${duration}ms`); // Log theo yêu cầu đề bài

  globalLoader.style.display = "none";
  btnRefresh.disabled = false;
}
