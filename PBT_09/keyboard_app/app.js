const images = [
  {
    id: 1,
    src: "https://placehold.co/600x400/3498db/fff?text=Anh+1",
    alt: "Ảnh phong cảnh 1",
    caption: "Bình minh trên biển",
  },
  {
    id: 2,
    src: "https://placehold.co/600x400/e74c3c/fff?text=Anh+2",
    alt: "Ảnh phong cảnh 2",
    caption: "Hoàng hôn núi rừng",
  },
  {
    id: 3,
    src: "https://placehold.co/600x400/27ae60/fff?text=Anh+3",
    alt: "Ảnh phong cảnh 3",
    caption: "Cánh đồng xanh",
  },
  {
    id: 4,
    src: "https://placehold.co/600x400/f39c12/fff?text=Anh+4",
    alt: "Ảnh phong cảnh 4",
    caption: "Sa mạc cát vàng",
  },
  {
    id: 5,
    src: "https://placehold.co/600x400/9b59b6/fff?text=Anh+5",
    alt: "Ảnh phong cảnh 5",
    caption: "Thác nước huyền bí",
  },
  {
    id: 6,
    src: "https://placehold.co/600x400/1abc9c/fff?text=Anh+6",
    alt: "Ảnh phong cảnh 6",
    caption: "Rừng nhiệt đới",
  },
  {
    id: 7,
    src: "https://placehold.co/600x400/e67e22/fff?text=Anh+7",
    alt: "Ảnh phong cảnh 7",
    caption: "Bờ biển sóng vỗ",
  },
  {
    id: 8,
    src: "https://placehold.co/600x400/2c3e50/fff?text=Anh+8",
    alt: "Ảnh phong cảnh 8",
    caption: "Đêm đầy sao",
  },
  {
    id: 9,
    src: "https://placehold.co/600x400/c0392b/fff?text=Anh+9",
    alt: "Ảnh phong cảnh 9",
    caption: "Hoa anh đào mùa xuân",
  },
];

const commands = [
  {
    icon: "🌙",
    name: "Bật Dark Mode",
    desc: "Chuyển sang giao diện tối",
    action: () => {
      document.body.classList.add("dark-mode");
      showToast("🌙 Dark Mode đã bật");
    },
  },
  {
    icon: "☀️",
    name: "Tắt Dark Mode",
    desc: "Chuyển sang giao diện sáng",
    action: () => {
      document.body.classList.remove("dark-mode");
      showToast("☀️ Light Mode đã bật");
    },
  },
  {
    icon: "▶️",
    name: "Play Slideshow",
    desc: "Bắt đầu trình chiếu tự động",
    action: () => startSlideshow(),
  },
  {
    icon: "⏸️",
    name: "Pause Slideshow",
    desc: "Dừng trình chiếu",
    action: () => stopSlideshow(),
  },
  {
    icon: "⬅️",
    name: "Ảnh trước",
    desc: "Chuyển sang ảnh trước (←)",
    action: () => goTo(state.current - 1),
  },
  {
    icon: "➡️",
    name: "Ảnh tiếp theo",
    desc: "Chuyển sang ảnh tiếp theo (→)",
    action: () => goTo(state.current + 1),
  },
  {
    icon: "🔝",
    name: "Về ảnh đầu",
    desc: "Quay về ảnh số 1",
    action: () => {
      goTo(0);
      showToast("Đã về ảnh đầu");
    },
  },
  {
    icon: "🔚",
    name: "Đến ảnh cuối",
    desc: "Nhảy đến ảnh số 9",
    action: () => {
      goTo(images.length - 1);
      showToast("Đã đến ảnh cuối");
    },
  },
  {
    icon: "🖼️",
    name: "Xem ảnh hiện tại",
    desc: "Mở ảnh đang chọn ở chế độ toàn màn hình",
    action: () => openModal(state.current),
  },
];

const state = {
  current: 0,
  isPlaying: false,
  slideshowId: null,
  modalOpen: false,
  paletteOpen: false,
};

const galleryGrid = document.getElementById("galleryGrid");
const slideInfo = document.getElementById("slideInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");

const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

const commandPalette = document.getElementById("commandPalette");
const paletteInput = document.getElementById("paletteInput");
const paletteList = document.getElementById("paletteList");
const openPaletteBtn = document.getElementById("openPalette");

function renderGallery() {
  galleryGrid.innerHTML = "";

  images.forEach((img, index) => {
    const thumb = document.createElement("div");
    thumb.className = "thumb" + (index === state.current ? " active" : "");
    thumb.dataset.index = index;
    thumb.setAttribute("role", "listitem");

    thumb.setAttribute(
      "aria-label",
      `${img.caption} — ảnh ${index + 1} trên ${images.length}. Nhấn Enter hoặc click để xem lớn`,
    );

    thumb.setAttribute("tabindex", "0");

    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = img.alt;

    imgEl.setAttribute("aria-hidden", "true");

    const badge = document.createElement("span");
    badge.className = "thumb-number";
    badge.textContent = index + 1;
    badge.setAttribute("aria-hidden", "true");

    thumb.appendChild(imgEl);
    thumb.appendChild(badge);
    galleryGrid.appendChild(thumb);
  });

  updateInfo();
}

function goTo(index) {
  state.current = (index + images.length) % images.length;

  document.querySelectorAll(".thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === state.current);
  });

  if (state.modalOpen) updateModal();

  updateInfo();
}

function updateInfo() {
  slideInfo.textContent = `${state.current + 1} / ${images.length}`;
}

function startSlideshow() {
  if (state.isPlaying) return;
  state.isPlaying = true;

  state.slideshowId = setInterval(() => {
    goTo(state.current + 1);
  }, 2000);

  playBtn.textContent = "⏸ Pause";
  playBtn.classList.add("playing");
  playBtn.setAttribute("aria-pressed", "true");
  showToast("▶ Slideshow đang chạy — nhấn Space để dừng");
}

function stopSlideshow() {
  if (!state.isPlaying) return;
  state.isPlaying = false;

  clearInterval(state.slideshowId);
  state.slideshowId = null;

  playBtn.textContent = "▶ Play";
  playBtn.classList.remove("playing");
  playBtn.setAttribute("aria-pressed", "false");
  showToast("⏸ Đã dừng slideshow");
}

function toggleSlideshow() {
  state.isPlaying ? stopSlideshow() : startSlideshow();
}

function openModal(index) {
  state.modalOpen = true;
  state.current = index;
  updateModal();

  imageModal.classList.remove("hidden");

  modalClose.focus();
}

function closeModal() {
  state.modalOpen = false;
  imageModal.classList.add("hidden");

  const activeThumb = document.querySelector(".thumb.active");
  if (activeThumb) activeThumb.focus();
}

function updateModal() {
  const img = images[state.current];
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalTitle.textContent = `${img.caption} (${state.current + 1} / ${images.length})`;
}

function openPalette() {
  state.paletteOpen = true;
  commandPalette.classList.remove("hidden");
  paletteInput.value = "";
  renderCommands("");
  paletteInput.focus();
}

function closePalette() {
  state.paletteOpen = false;
  commandPalette.classList.add("hidden");
  openPaletteBtn.focus();
}

function renderCommands(keyword) {
  paletteList.innerHTML = "";

  const lower = keyword.toLowerCase();
  const filtered = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(lower) ||
      cmd.desc.toLowerCase().includes(lower),
  );

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.className = "palette-item";
    li.textContent = "Không tìm thấy lệnh nào";
    li.style.color = "var(--text-2)";
    li.setAttribute("role", "option");
    paletteList.appendChild(li);
    return;
  }

  filtered.forEach((cmd, i) => {
    const li = document.createElement("li");
    li.className = "palette-item" + (i === 0 ? " focused" : "");
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", i === 0 ? "true" : "false");

    const icon = document.createElement("span");
    icon.className = "palette-item-icon";
    icon.textContent = cmd.icon;
    icon.setAttribute("aria-hidden", "true");

    const name = document.createElement("span");
    name.textContent = cmd.name;

    const desc = document.createElement("span");
    desc.className = "palette-item-desc";
    desc.textContent = cmd.desc;

    li.appendChild(icon);
    li.appendChild(name);
    li.appendChild(desc);

    li.addEventListener("click", () => {
      cmd.action();
      closePalette();
    });

    li.dataset.cmdIndex = commands.indexOf(cmd);

    paletteList.appendChild(li);
  });
}

let paletteFocusedIndex = 0;

function movePaletteFocus(direction) {
  const items = paletteList.querySelectorAll(".palette-item");
  if (items.length === 0) return;

  items[paletteFocusedIndex]?.classList.remove("focused");
  items[paletteFocusedIndex]?.setAttribute("aria-selected", "false");

  paletteFocusedIndex =
    (paletteFocusedIndex + direction + items.length) % items.length;

  items[paletteFocusedIndex].classList.add("focused");
  items[paletteFocusedIndex].setAttribute("aria-selected", "true");

  items[paletteFocusedIndex].scrollIntoView({ block: "nearest" });
}

function executeFocusedCommand() {
  const items = paletteList.querySelectorAll(".palette-item");
  if (items.length === 0) return;

  const focused = items[paletteFocusedIndex];
  if (!focused) return;

  const cmdIndex = parseInt(focused.dataset.cmdIndex);
  if (!isNaN(cmdIndex)) {
    commands[cmdIndex].action();
    closePalette();
  }
}

function showToast(message) {
  const old = document.querySelector(".toast");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("hide"), 2000);
  setTimeout(() => toast.remove(), 2400);
}

function trapFocus(event, container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.key !== "Tab") return;

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (state.paletteOpen) {
    if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      movePaletteFocus(+1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      movePaletteFocus(-1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      executeFocusedCommand();
    }

    trapFocus(e, commandPalette);
    return;
  }

  if (state.modalOpen) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(state.current - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(state.current + 1);
    }

    trapFocus(e, imageModal);
    return;
  }

  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    openPalette();
    return;
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    goTo(state.current - 1);
    showToast(`← Ảnh ${state.current + 1}`);
    return;
  }

  if (e.key === "ArrowRight") {
    e.preventDefault();
    goTo(state.current + 1);
    showToast(`→ Ảnh ${state.current + 1}`);
    return;
  }

  if (e.key === " " && e.target === document.body) {
    e.preventDefault();
    toggleSlideshow();
    return;
  }

  if (e.key >= "1" && e.key <= "9") {
    if (e.target.tagName === "INPUT") return;

    const index = parseInt(e.key) - 1;
    if (index < images.length) {
      goTo(index);
      showToast(`Nhảy đến ảnh ${index + 1}`);
    }
    return;
  }

  if (e.key === "Enter" && e.target.classList.contains("thumb")) {
    const index = parseInt(e.target.dataset.index);
    openModal(index);
  }
});

galleryGrid.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb) return;
  const index = parseInt(thumb.dataset.index);
  goTo(index);
  openModal(index);
});

prevBtn.addEventListener("click", () => goTo(state.current - 1));
nextBtn.addEventListener("click", () => goTo(state.current + 1));
playBtn.addEventListener("click", toggleSlideshow);

modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", () => goTo(state.current - 1));
modalNext.addEventListener("click", () => goTo(state.current + 1));

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) closeModal();
});

openPaletteBtn.addEventListener("click", openPalette);

paletteInput.addEventListener("input", (e) => {
  paletteFocusedIndex = 0;
  renderCommands(e.target.value);
});

commandPalette.addEventListener("click", (e) => {
  if (e.target === commandPalette) closePalette();
});

renderGallery();
showToast("💡 Dùng phím ← → Space 1–9 và Ctrl+K");
