## PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1 (Nguồn tham chiếu: 01_introduction_html_universe.md 1.1 Kiến trúc Client-Server, 1.2 HTTP, 1.3 Browser Rendering và 4.3 Developer Tools)

1. 5 bước xảy ra khi nhập https://shopee.vn và nhấn Enter:
   - Gửi Request (Yêu cầu): Trình duyệt (Client) gửi yêu cầu đi qua router, nhà mạng, xuyên cáp quang để đến máy chủ (Server) của Shopee.
   - DNS Lookup (Tra cứu): Hệ thống tìm kiếm địa chỉ IP tương ứng với tên miền shopee.vn.
   - Server xử lý: Máy chủ nhận yêu cầu, xử lý logic (ví dụ: lấy dữ liệu sản phẩm, kiểm tra đăng nhập).
   - Trả về Response (Phản hồi): Máy chủ gửi ngược dữ liệu (file HTML, CSS, JS) về cho trình duyệt.
   - Browser Rendering (Kết xuất): Trình duyệt nhận file, đọc bản vẽ (HTML), thiết kế nội thất (CSS), lắp hệ thống điện nước (JS) để hiện ra giao diện Shopee.

2. Trong DevTools của Chrome:
   - Tab Network cho thấy thông tin cho phép người dùng xem các Requests/Responses (yêu cầu và phản hồi). Cụ thể là kiểm tra xem website tải nhanh hay chậm và file nào đang chiếm dung lượng nặng nhất.
   - Screenshots file `A1.2.png`.

## Câu A2 (Nguồn tham chiếu: 04_visible_part_html.md - Bản đồ Semantic Elements)

Trang web này bị Google đánh giá SEO thấp vì lạm dụng quá nhiều thẻ `<div>` (lỗi "Div Soup"). Các thẻ này không mang ý nghĩa nội dung, khiến công cụ tìm kiếm không thể xác định được đâu là phần quan trọng nhất hay cấu trúc chính của trang.

4 lỗi ngữ nghĩa:

1. Đầu trang: Thay `<div class="header">` bằng thẻ `<header>` để xác định phần chứa logo và điều hướng.
2. Thanh menu: Thay `<div class="menu">` bằng thẻ `<nav>` để thông báo đây là khu vực điều hướng chính.
3. Nội dung chính: Thay `<div class="main">` bằng thẻ `<main>` để đánh dấu nội dung độc nhất của trang.
4. Phần tử sản phẩm: Thay `<div class="product">` bằng thẻ `<article>` vì đây là một nội dung độc lập. Ngoài ra, nên đổi thẻ `<div class="title">` thành thẻ `<h1>` để nhấn mạnh tên sản phẩm cho SEO.

Code sửa lại:

```html
<header>
  <div class="logo">ShopTLU</div>
  <nav>
    <a href="/">Trang chủ</a>
    <a href="/products">Sản phẩm</a>
  </nav>
</header>
<main>
  <article>
    <h1>iPhone 16 Pro</h1>
    <p>25.990.000đ</p>
    <figure>
      <img src="iphone.jpg" alt="iPhone 16 Pro" />
    </figure>
  </article>
</main>
<footer>© 2026 ShopTLU</footer>
```

## Câu A3: (Nguồn tham chiếu: 04_visible_part_html.md)

Kết quả là:

```html
[Hộp 1] Text A Text B [Hộp 2] Text C Text D [Hộp 3]
```

-`<div>` là 1 thẻ thuộc Block element luôn bắt đầu trên một dòng mới và chiếm toàn bộ chiều ngang của trang. Do đó, Hộp 1, Hộp 2, và Hộp 3 mỗi cái nằm riêng biệt trên một dòng. -`<span>` và `<strong>` là 2 thẻ thuộc Inline element nên chúng sẽ nằm cùng một hàng với nhau khi kết thúc.

## Câu A4: (Nguồn tham chiếu: 05_tables_hyperlinks.md )

- `<thead>` Chứa các hàng tiêu đề , xác định tên gọi hoặc ý nghĩa cho các cột bên dưới nằm ở phần đầu.
- `<tbody>` Chứa nội dung dữ liệu chính của bảng. Đây là phần hiển thị các bản ghi chi tiết nằm ở phần giữa.
- `<tfoot>` Chứa các thông tin tổng kết, thống kê nằm ở cuối bảng.

**Lý do không dùng bảng để tạo bố cục trang web:**

- Bảng có cấu trúc cứng nhắc, rất khó để tự động co giãn hoặc nhảy dòng linh hoạt trên màn hình điện thoại so với CSS Grid/Flexbox.
- Thẻ `<table>` chỉ dành cho dữ liệu bảng (so sánh, thống kê). Dùng làm layout khiến Google Bot không hiểu được cấu trúc nội dung.
- Tốc độ load sẽ chậm vì trình duyệt phải đọc xong toàn bộ mã nguồn của thẻ bảng mới có thể tính toán và hiển thị giao diện

# PHẦN B - THỰC HÀNH CODE:

# GIẢI THÍCH LỖI DEBUG - BÀI B3

| STT        | Vị trí  | Mô tả lỗi                                                  | Cách sửa                                     |
| :--------- | :------ | :--------------------------------------------------------- | :------------------------------------------- |
| **Lỗi 1**  | Dòng 1  | Thiếu khai báo `html` trong DOCTYPE.                       | Sửa thành `<!DOCTYPE html>`.                 |
| **Lỗi 2**  | Dòng 2  | Thẻ `<title>` chưa có thẻ đóng `</title>`.                 | Thêm `</title>` sau "Trang web".             |
| **Lỗi 3**  | Dòng 3  | Giá trị charset sai định dạng (thiếu dấu gạch ngang).      | Sửa thành `utf-8`.                           |
| **Lỗi 4**  | Dòng 4  | Thẻ đóng của `<h1>` bị viết sai thành thẻ mở `<h1>`.       | Sửa thành `</h1>`.                           |
| **Lỗi 5**  | Dòng 8  | Thẻ `<a>` đóng sai cú pháp `<a>`.                          | Sửa thành `</a>`.                            |
| **Lỗi 6**  | Dòng 15 | Thuộc tính `src` thiếu dấu ngoặc kép và thiếu thẻ `alt`.   | Sửa thành `src="iphone.jpg" alt="..."`.      |
| **Lỗi 7**  | Dòng 17 | Thẻ `<b>` và `<p>` đóng sai thứ tự (lỗi lồng thẻ).         | Sửa thành `<b>25.990.000đ</b></p>`.          |
| **Lỗi 8**  | Dòng 22 | Bảng thiếu thẻ ngữ nghĩa `<thead>` và `<tbody>`.           | Thêm `<thead>` cho hàng tiêu đề.             |
| **Lỗi 9**  | Dòng 34 | Sử dụng 2 thẻ `<main>` trên cùng một trang (sai Semantic). | Chuyển thẻ `<main>` thứ hai thành `<aside>`. |
| **Lỗi 10** | Dòng 38 | Thẻ `<p>` trong footer chưa có thẻ đóng.                   | Thêm `</p>` sau "2026".                      |

---

## Câu B4:

## 1. Phân tích thẻ Semantic HTML5 (Tab Elements)

### 3 thẻ Semantic được sử dụng đúng:

- **Thẻ `<header>`**: Nằm ở đầu trang, bao bọc logo, ô tìm kiếm và các nút danh mục chính.
- **Thẻ `<nav>`**: Chứa các đường link điều hướng nhanh như "Lịch sử đơn hàng", "24h Công nghệ".
- **Thẻ `<section>`**: Dùng để bao bọc các khối nội dung lớn như "SĂN SALE ONLINE" hoặc "XU HƯỚNG MUA SẮM".

### 2 thẻ chưa dùng đúng Semantic:

- **Sử dụng `<h3>` hoặc `<h4>` cho icon**: Một số vị trí dùng thẻ tiêu đề chỉ để hiển thị biểu tượng thay vì dùng thẻ nội dòng như `<i>` hoặc `<span>`.
- **Lạm dụng `<div>` cho danh sách sản phẩm**: Thay vì dùng thẻ `<article>` cho mỗi chiếc điện thoại, trang web dùng rất nhiều lớp `div` lồng nhau, khiến máy tìm kiếm khó xác định thực thể sản phẩm độc lập.

---

# PHẦN C — SUY LUẬN
