// =============================================================
// DỮ LIỆU SẢN PHẨM — 12 sản phẩm, 4 categories
// categories: phone | laptop | tablet | accessory
// =============================================================
const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
    category: "phone",
    image: "https://placehold.co/200x180?text=iPhone+16",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 22490000,
    category: "phone",
    image: "https://placehold.co/200x180?text=Galaxy+S24",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 3,
    name: "Xiaomi 14",
    price: 15990000,
    category: "phone",
    image: "https://placehold.co/200x180?text=Xiaomi+14",
    rating: 4.2,
    inStock: false,
  },
  {
    id: 4,
    name: "OPPO Reno 12",
    price: 9990000,
    category: "phone",
    image: "https://placehold.co/200x180?text=OPPO+Reno12",
    rating: 3.9,
    inStock: true,
  },
  {
    id: 5,
    name: "MacBook Air M3",
    price: 32990000,
    category: "laptop",
    image: "https://placehold.co/200x180?text=MacBook+Air",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 6,
    name: "Dell XPS 15",
    price: 45000000,
    category: "laptop",
    image: "https://placehold.co/200x180?text=Dell+XPS+15",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 7,
    name: "ASUS VivoBook 15",
    price: 14990000,
    category: "laptop",
    image: "https://placehold.co/200x180?text=ASUS+VivoBook",
    rating: 4.1,
    inStock: true,
  },
  {
    id: 8,
    name: "Lenovo ThinkPad E15",
    price: 18500000,
    category: "laptop",
    image: "https://placehold.co/200x180?text=ThinkPad+E15",
    rating: 4.3,
    inStock: false,
  },
  {
    id: 9,
    name: "iPad Air M2",
    price: 18990000,
    category: "tablet",
    image: "https://placehold.co/200x180?text=iPad+Air+M2",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 10,
    name: "Samsung Tab S9",
    price: 16990000,
    category: "tablet",
    image: "https://placehold.co/200x180?text=Galaxy+Tab+S9",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 11,
    name: "Tai nghe Sony WH-1000XM5",
    price: 7490000,
    category: "accessory",
    image: "https://placehold.co/200x180?text=Sony+WH1000",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 12,
    name: "Chuột Logitech MX Master 3",
    price: 2490000,
    category: "accessory",
    image: "https://placehold.co/200x180?text=MX+Master+3",
    rating: 4.5,
    inStock: true,
  },
];

// =============================================================
// STATE — lưu trạng thái hiện tại của ứng dụng
// =============================================================
let state = {
  keyword: "", // Từ khóa search
  category: "all", // Category đang filter
  sortBy: "default", // Cách sắp xếp
  cartCount: 0, // Số sản phẩm trong giỏ
};

// =============================================================
// BƯỚC 1 — TẠO LAYOUT CHÍNH bằng JavaScript (đề yêu cầu)
// Hàm này chạy 1 lần khi app khởi động.
// Nó tạo toàn bộ skeleton HTML rồi nhét vào <div id="app">
// =============================================================
function buildLayout() {
  const app = document.getElementById("app");

  // --- NAVBAR ---
  const navbar = document.createElement("nav");
  navbar.className = "navbar";

  const brand = document.createElement("span");
  brand.className = "navbar-brand";
  brand.textContent = "🛍️ ShopVN";

  const navRight = document.createElement("div");
  navRight.className = "navbar-right";

  // Nút dark mode
  const darkBtn = document.createElement("button");
  darkBtn.className = "dark-toggle-btn";
  darkBtn.id = "darkToggle";
  darkBtn.textContent = "🌙 Dark Mode";

  // Giỏ hàng
  const cartWrapper = document.createElement("div");
  cartWrapper.className = "cart-wrapper";
  cartWrapper.textContent = "🛒";

  const badge = document.createElement("span");
  badge.className = "cart-badge";
  badge.id = "cartBadge";
  badge.textContent = "0";

  cartWrapper.appendChild(badge);
  navRight.appendChild(darkBtn);
  navRight.appendChild(cartWrapper);
  navbar.appendChild(brand);
  navbar.appendChild(navRight);

  // --- CONTROLS (search + sort) ---
  const controls = document.createElement("div");
  controls.className = "controls";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "searchInput";
  searchInput.className = "search-input";
  searchInput.placeholder = "🔍 Tìm kiếm sản phẩm...";

  const sortSelect = document.createElement("select");
  sortSelect.id = "sortSelect";
  sortSelect.className = "sort-select";

  // Các option sort
  const sortOptions = [
    { value: "default", label: "Sắp xếp mặc định" },
    { value: "price-asc", label: "Giá: Thấp → Cao" },
    { value: "price-desc", label: "Giá: Cao → Thấp" },
    { value: "name-az", label: "Tên: A → Z" },
    { value: "rating", label: "Đánh giá cao nhất" },
  ];

  sortOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    sortSelect.appendChild(option);
  });

  controls.appendChild(searchInput);
  controls.appendChild(sortSelect);

  // --- FILTER BAR (category buttons) ---
  const filterBar = document.createElement("div");
  filterBar.className = "filter-bar";
  filterBar.id = "filterBar";

  const categories = ["all", "phone", "laptop", "tablet", "accessory"];
  const categoryLabels = {
    all: "Tất cả",
    phone: "📱 Điện thoại",
    laptop: "💻 Laptop",
    tablet: "📟 Tablet",
    accessory: "🎧 Phụ kiện",
  };

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === "all" ? " active" : "");
    btn.dataset.category = cat;
    btn.textContent = categoryLabels[cat];
    filterBar.appendChild(btn);
  });

  // --- PRODUCT GRID ---
  const grid = document.createElement("div");
  grid.className = "product-grid";
  grid.id = "productGrid";

  // Nhét tất cả vào #app
  app.appendChild(navbar);
  app.appendChild(controls);
  app.appendChild(filterBar);
  app.appendChild(grid);
}

// =============================================================
// BƯỚC 2 — HÀM TẠO 1 CARD (createElement, không dùng innerHTML)
// =============================================================
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = product.id;

  // Ảnh
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  // Body
  const body = document.createElement("div");
  body.className = "card-body";

  const name = document.createElement("div");
  name.className = "card-name";
  name.textContent = product.name;

  const category = document.createElement("div");
  category.className = "card-category";
  category.textContent = product.category;

  const price = document.createElement("div");
  price.className = "card-price";
  price.textContent = formatPrice(product.price);

  const rating = document.createElement("div");
  rating.className = "card-rating";
  // Tạo sao: ví dụ 4.5 → "★★★★½ (4.5)"
  rating.textContent = `${renderStars(product.rating)} (${product.rating})`;

  const stock = document.createElement("div");
  stock.className =
    "card-stock " + (product.inStock ? "in-stock" : "out-stock");
  stock.textContent = product.inStock ? "✔ Còn hàng" : "✘ Hết hàng";

  const addBtn = document.createElement("button");
  addBtn.className = "add-cart-btn";
  addBtn.textContent = "🛒 Thêm giỏ";
  addBtn.disabled = !product.inStock;
  // Gán id sản phẩm lên button để dùng Event Delegation
  addBtn.dataset.id = product.id;
  addBtn.dataset.action = "add-cart";
  // Ngăn click button lan ra card (tránh mở modal)
  addBtn.addEventListener("click", (e) => e.stopPropagation());

  body.appendChild(name);
  body.appendChild(category);
  body.appendChild(price);
  body.appendChild(rating);
  body.appendChild(stock);
  body.appendChild(addBtn);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}

// =============================================================
// BƯỚC 3 — renderProducts()
// Lấy mảng đã lọc/sort → xóa grid → tạo card mới → append
// =============================================================
function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = ""; // Xóa hết card cũ

  // Pipeline: lọc → tìm kiếm → sắp xếp
  let result = filterByCategory(products, state.category);
  result = searchProducts(result, state.keyword);
  result = sortProducts(result, state.sortBy);

  if (result.length === 0) {
    // Hiện thông báo không có kết quả
    const empty = document.createElement("div");
    empty.className = "no-results";
    empty.textContent = "😢 Không tìm thấy sản phẩm nào.";
    grid.appendChild(empty);
    return;
  }

  result.forEach((product) => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

// =============================================================
// filterByCategory() — lọc theo category
// Nhận vào mảng gốc + category → trả về mảng đã lọc
// =============================================================
function filterByCategory(arr, category) {
  if (category === "all") return arr;
  return arr.filter((p) => p.category === category);
}

// =============================================================
// searchProducts() — tìm kiếm theo tên (không phân biệt hoa thường)
// =============================================================
function searchProducts(arr, keyword) {
  if (!keyword) return arr;
  const lower = keyword.toLowerCase();
  return arr.filter((p) => p.name.toLowerCase().includes(lower));
}

// =============================================================
// sortProducts() — sắp xếp theo tiêu chí
// =============================================================
function sortProducts(arr, sortBy) {
  // slice() để không thay đổi mảng gốc (tránh bug)
  const copy = arr.slice();

  switch (sortBy) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name-az":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy; // Giữ thứ tự ban đầu
  }
}

// =============================================================
// MODAL — tạo bằng JS, hiện chi tiết sản phẩm
// =============================================================
function openModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Tạo overlay (lớp nền mờ)
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "modalOverlay";

  // Tạo hộp nội dung
  const content = document.createElement("div");
  content.className = "modal-content";

  // Nút đóng
  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", closeModal);

  // Ảnh
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.className = "modal-img";

  // Thông tin
  const name = document.createElement("div");
  name.className = "modal-name";
  name.textContent = product.name;

  const cat = document.createElement("div");
  cat.className = "modal-category";
  cat.textContent = product.category;

  const price = document.createElement("div");
  price.className = "modal-price";
  price.textContent = formatPrice(product.price);

  const rating = document.createElement("div");
  rating.className = "modal-rating";
  rating.textContent = `${renderStars(product.rating)} ${product.rating}/5`;

  const stock = document.createElement("div");
  stock.className =
    "modal-stock " + (product.inStock ? "in-stock" : "out-stock");
  stock.textContent = product.inStock ? "✔ Còn hàng" : "✘ Hết hàng";

  const addBtn = document.createElement("button");
  addBtn.className = "modal-add-btn";
  addBtn.textContent = "🛒 Thêm vào giỏ hàng";
  addBtn.disabled = !product.inStock;
  addBtn.addEventListener("click", () => {
    addToCart();
    closeModal();
  });

  content.appendChild(closeBtn);
  content.appendChild(img);
  content.appendChild(name);
  content.appendChild(cat);
  content.appendChild(price);
  content.appendChild(rating);
  content.appendChild(stock);
  content.appendChild(addBtn);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (overlay) overlay.remove();
}

function addToCart() {
  state.cartCount++;
  const badge = document.getElementById("cartBadge");
  badge.textContent = state.cartCount;

  badge.style.display = "flex";
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " ₫";
}

function renderStars(rating) {
  const full = Math.floor(rating); // 4
  const half = rating % 1 >= 0.5 ? 1 : 0; // 1
  const empty = 5 - full - half; // 0
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.keyword = e.target.value;
    renderProducts();
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  document.getElementById("filterBar").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    state.category = btn.dataset.category;
    renderProducts();
  });

  document.getElementById("productGrid").addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-action='add-cart']");
    if (addBtn) {
      addToCart();
      return;
    }

    const card = e.target.closest(".product-card");
    if (card) {
      openModal(Number(card.dataset.id));
    }
  });

  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    document.getElementById("darkToggle").textContent = isDark
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

buildLayout();
bindEvents();
