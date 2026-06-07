## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — DOM Tree

## 1. DOM Tree

```text
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        │
        └── li.todo-item.completed
            └── "Learn CSS"
```

## 2. Query Selectors

### Chọn thẻ `<h1>`

```javascript
document.querySelector("h1");
```

### Chọn input trong form

```javascript
document.querySelector("#todoForm input");
```

Hoặc:

```javascript
document.querySelector("#todoInput");
```

### Chọn tất cả `.todo-item`

```javascript
document.querySelectorAll(".todo-item");
```

### Chọn link đang active

```javascript
document.querySelector("a.active");
```

Hoặc:

```javascript
document.querySelector("nav .active");
```

### Chọn thẻ `<li>` đầu tiên trong `#todoList`

```javascript
document.querySelector("#todoList li:first-child");
```

### Chọn tất cả thẻ `<a>` bên trong `<nav>`

```javascript
document.querySelectorAll("nav a");
```

# Câu A2 - innerHTML vs textContent

## 1. Sự khác nhau giữa innerHTML và textContent

| innerHTML                                         | textContent                                   |
| ------------------------------------------------- | --------------------------------------------- |
| Đọc hoặc ghi nội dung dưới dạng HTML              | Đọc hoặc ghi nội dung dưới dạng văn bản thuần |
| Các thẻ HTML được trình duyệt phân tích và render | Thẻ HTML được hiển thị như văn bản            |
| Có thể tạo phần tử HTML mới                       | Chỉ hiển thị text                             |
| Tiềm ẩn nguy cơ XSS nếu dữ liệu đến từ người dùng | An toàn hơn vì không thực thi HTML            |

---

## 2. Ví dụ

### Sử dụng innerHTML

```javascript
document.querySelector("#result").innerHTML = "<strong>Hello</strong>";
```

Kết quả hiển thị:

**Hello**

### Sử dụng textContent

```javascript
document.querySelector("#result").textContent = "<strong>Hello</strong>";
```

Kết quả hiển thị:

```html
<strong>Hello</strong>
```

## 3. Khi nào sử dụng

### Dùng innerHTML khi:

- Cần thêm hoặc thay đổi cấu trúc HTML.
- Muốn render thẻ HTML động.

Ví dụ:

```javascript
document.querySelector("#list").innerHTML =
  "<li>HTML</li><li>CSS</li><li>JavaScript</li>";
```

### Dùng textContent khi:

- Chỉ cần hiển thị văn bản.
- Dữ liệu đến từ người dùng hoặc API.
- Muốn tránh lỗ hổng bảo mật XSS.

Ví dụ:

```javascript
document.querySelector("#message").textContent = userInput;
```

## 4. XSS là gì?

XSS (Cross-Site Scripting) là lỗ hổng cho phép kẻ tấn công chèn mã JavaScript độc hại vào trang web.

Nếu sử dụng `innerHTML` với dữ liệu do người dùng nhập, trình duyệt sẽ phân tích dữ liệu đó như HTML và có thể thực thi mã JavaScript bên trong.

## 5. Ví dụ XSS

Người dùng nhập:

```html
<img src="x" onerror="alert('Hacked!')" />
```

Code:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;
```

Khi ảnh không tải được, sự kiện `onerror` sẽ chạy:

```javascript
alert("Hacked!");
```

Điều này chứng tỏ mã độc đã được thực thi.

## 6. Cách sửa an toàn

Sử dụng `textContent`:

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

Lúc này trình duyệt chỉ hiển thị:

```html
<img src="x" onerror="alert('Hacked!')" />
```

như văn bản thông thường và không thực thi JavaScript.

# Câu A3 - Event Bubbling

## Output khi click vào button

HTML:

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Click me</button>
  </div>
</div>
```

JavaScript:

```javascript
document.querySelector("#outer").addEventListener("click", () => {
  console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
  console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
  console.log("BUTTON");
});
```

Khi click vào button, sự kiện xảy ra tại button trước, sau đó nổi bọt (bubbling) lên các phần tử cha.

Thứ tự thực thi:

```text
BUTTON
INNER
OUTER
```

## Giải thích Event Bubbling

Event Bubbling là cơ chế sự kiện lan truyền từ phần tử được click lên các phần tử cha.

Luồng lan truyền:

```text
button
  ↑
inner
  ↑
outer
```

Vì vậy:

1. Button nhận sự kiện đầu tiên.
2. Sự kiện nổi lên inner.
3. Sau đó nổi lên outer.

## Nếu sử dụng stopPropagation()

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
  console.log("BUTTON");
  e.stopPropagation();
});
```

Kết quả:

```text
BUTTON
```

Giải thích:

- `e.stopPropagation()` chặn quá trình bubbling.
- Sự kiện không lan truyền lên `#inner` và `#outer`.
- Chỉ handler của button được thực thi.

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

1. Lỗi 1: `addEventListener("onclick"` → sai syntax

```javascript
// SAI
document.querySelector("#decrementBtn").addEventListener("onclick", function() {

// ĐÚNG
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

2. Lỗi 2: `countDisplay = count` → thiếu property

```javascript
// SAI
countDisplay = count;

// ĐÚNG
countDisplay.textContent = count;
```

3. Lỗi 3: `innerHTML = null` → nên dùng ""

```javascript
// SAI
historyList.innerHTML = null;

// ĐÚNG
historyList.innerHTML = "";
```

4. Lỗi 4: `item.remove` → thiếu ()

```javascript
// SAI
item.remove;

// ĐÚNG
item.remove();
```

5. Lỗi 5: localStorage trả về string, cần parse

```javascript
// SAI
count = localStorage.getItem("count");

// ĐÚNG
count = parseInt(localStorage.getItem("count")) || 0;
```

6. Lỗi 6: Decrement không thêm history

```javascript
// THIẾU - cần thêm code lưu history giống increment
```

7. Lỗi 7: Không kiểm tra null khi load

```javascript
// SAI
count = localStorage.getItem("count");

// ĐÚNG
const savedCount = localStorage.getItem("count");
if (savedCount !== null) {
  count = parseInt(savedCount);
}
```

### Câu C2 (7đ) — Performance

1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

- Tốn bộ nhớ: Mỗi element có 1 event listener riêng → 1000 listeners
- Chậm: Phải loop và bind từng cái một
- Dynamic elements: Elements tạo sau không có event

Event Delegation giải quyết:

- Chỉ bind 1 event lên parent
- Dùng `e.target` để biết click vào element nào
- Elements tạo sau vẫn hoạt động

2. Refactor dùng DocumentFragment:

```javascript
// Tạo fragment
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div); // Thêm vào fragment (trong memory)
}

document.body.appendChild(fragment); // Chỉ 1 lần append vào DOM
```

Tại sao nhanh hơn:

- DocumentFragment ở trong memory, không gây reflow
- Chỉ khi append fragment vào body mới gây 1 lần reflow
- 1 reflow thay vì 1000 reflow => nhanh hơn nhiều
