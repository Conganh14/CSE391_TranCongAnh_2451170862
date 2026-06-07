// Trạng thái của ứng dụng
const state = {
  page: 1,
  limit: 20,
  isLoading: false,
};

// DOM Elements
const galleryGrid = document.getElementById("gallery-grid");
const loadTrigger = document.getElementById("load-trigger");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxLoader = document.getElementById("lightbox-loader");
const closeLightboxBtn = document.getElementById("close-lightbox");

// ==========================================
// 1. LAZY LOAD IMAGES (INTERSECTION OBSERVER)
// ==========================================
// Yêu cầu: Ảnh chỉ tải khi cuộn tới viewport
const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Thay src bằng data-src để trình duyệt bắt đầu tải ảnh
        img.src = img.dataset.src;

        // Lắng nghe sự kiện load để thêm class hiển thị mượt mà
        img.onload = () => {
          img.classList.add("loaded");
        };

        // Hủy theo dõi sau khi ảnh đã được tải
        observer.unobserve(img);
      }
    });
  },
  {
    rootMargin: "50px 0px", // Load trước khi ảnh vào màn hình 50px cho mượt
  },
);

// ==========================================
// 2. FETCH VÀ RENDER DỮ LIỆU
// ==========================================
async function loadMorePhotos() {
  if (state.isLoading) return; // Ngăn gọi API liên tục khi đang tải

  state.isLoading = true;
  loadTrigger.classList.add("active"); // Hiện chữ "Đang tải thêm..."

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${state.page}&_limit=${state.limit}`,
    );
    if (!response.ok) throw new Error("Lỗi tải dữ liệu");

    const photos = await response.json();
    renderPhotos(photos);

    state.page++; // Tăng trang lên cho lần cuộn tiếp theo
  } catch (error) {
    console.error("Lỗi:", error);
    alert("Không thể tải thêm ảnh!");
  } finally {
    state.isLoading = false;
    loadTrigger.classList.remove("active");
  }
}

function renderPhotos(photos) {
  photos.forEach((photo) => {
    // Tạo thẻ bọc ảnh
    const itemDiv = document.createElement("div");
    itemDiv.className = "gallery-item";

    // Tạo thẻ ảnh với data-src (phục vụ Lazy Load) và data-large (phục vụ Lightbox)
    const img = document.createElement("img");
    img.dataset.src = photo.thumbnailUrl;
    img.dataset.large = photo.url;
    img.alt = photo.title;

    // Sự kiện click mở ảnh lớn
    img.addEventListener("click", () => openLightbox(photo.url));

    itemDiv.appendChild(img);
    galleryGrid.appendChild(itemDiv);

    // Gắn ảnh này vào imageObserver để theo dõi Lazy Load
    imageObserver.observe(img);
  });
}

// ==========================================
// 3. INFINITE SCROLL (INTERSECTION OBSERVER)
// ==========================================
// Yêu cầu: Khi user cuộn gần đáy (thấy load-trigger) thì tự động load tiếp
const scrollObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadMorePhotos();
    }
  },
  {
    rootMargin: "100px 0px", // Kích hoạt sớm khi còn cách thẻ trigger 100px
  },
);

// Bắt đầu theo dõi phần tử ở đáy
scrollObserver.observe(loadTrigger);

// ==========================================
// 4. LIGHTBOX LOGIC
// ==========================================
function openLightbox(largeUrl) {
  lightbox.classList.add("show");
  lightboxImg.style.display = "none";
  lightboxLoader.style.display = "block";

  // Đặt src để tải ảnh lớn
  lightboxImg.src = largeUrl;

  // Khi ảnh lớn tải xong, ẩn chữ loading và hiện ảnh
  lightboxImg.onload = () => {
    lightboxLoader.style.display = "none";
    lightboxImg.style.display = "block";
  };
}

function closeLightbox() {
  lightbox.classList.remove("show");
  // Xóa src để giải phóng bộ nhớ khi đóng
  setTimeout(() => {
    lightboxImg.src = "";
  }, 300);
}

// Lắng nghe sự kiện đóng Lightbox
closeLightboxBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  // Nếu click ra vùng đen (không trúng ảnh) thì đóng
  if (e.target === lightbox) closeLightbox();
});
// Hỗ trợ phím ESC để đóng Lightbox
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("show")) {
    closeLightbox();
  }
});
