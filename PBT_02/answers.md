## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

# Câu A1: (nguồn tham chiếu:07_forms_interactive.md)

Liệt kê 10 input types khác nhau trong HTML5, cho mỗi type:

1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký tài khoản
2. type="password" → Ô nhập ẩn ký tự (••••) → Dùng cho nhập mật khẩu thanh toán
3. type="number" → Ô nhập số có nút tăng/giảm → Dùng chọn số lượng sản phẩm
4. type="tel" → Ô nhập văn bản kèm bàn phím số di động → Dùng nhập số điện thoại giao hàng
5. type="date" → Ô hiển thị bảng chọn lịch (Calendar) → Dùng chọn ngày nhận hàng mong muốn
6. type="range" → Thanh trượt chọn giá trị trong khoảng → Dùng cho bộ lọc (filter) giá sản phẩm
7. type="color" → Ô chọn màu sắc từ bảng màu → Dùng chọn màu sắc mẫu mã (ví dụ: màu áo)
8. type="file" → Nút bấm chọn tệp tin từ máy tính → Dùng để tải ảnh feedback sản phẩm
9. type="search" → Ô nhập có nút "x" xóa nhanh nội dung → Dùng cho thanh tìm kiếm sản phẩm
10. type="checkbox" → Ô tích chọn hình vuông → Dùng để chấp nhận điều khoản mua hàng

# Câu A2: (nguồn tham chiếu:07_forms_interactive.md)

1. Trường hợp 1: <input type="text" required value="">
   → Dự đoán: Xuất hiện thông báo lỗi "Please fill out this field".
   → Giải thích: Do có thuộc tính 'required' nên trình duyệt sẽ chặn submit nếu ô nhập bị trống.

2. Trường hợp 2: <input type="email" value="abc">
   → Dự đoán: Xuất hiện thông báo lỗi yêu cầu thêm dấu '@'.
   → Giải thích: 'type="email"' yêu cầu giá trị phải đúng định dạng email (ví dụ: name@domain.com). "abc" không hợp lệ.

3. Trường hợp 3: <input type="number" min="1" max="10" value="15">
   → Dự đoán: Xuất hiện thông báo lỗi "Value must be less than or equal to 10".
   → Giải thích: Thuộc tính 'max="10"' giới hạn giá trị lớn nhất là 10. Số 15 vượt quá giới hạn cho phép.

4. Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123">
   → Dự đoán: Xuất hiện thông báo lỗi "Please match the requested format".
   → Giải thích: 'pattern="[0-9]{10}"' yêu cầu nhập đúng 10 chữ số. Chuỗi "abc123" chứa ký tự chữ và sai độ dài.

5. Trường hợp 5: <input type="password" minlength="8" value="123">
   → Dự đoán: Xuất hiện thông báo lỗi yêu cầu nhập tối thiểu 8 ký tự.
   → Giải thích: Thuộc tính 'minlength="8"' bắt buộc độ dài chuỗi từ 8 trở lên. "123" chỉ có 3 ký tự.

# Câu A3: (nguồn tham chiếu: Accessibility trong chương 07 )

1. Tầm quan trọng của <label for="email"> với Screen Reader:
   - Kết nối trực tiếp: Thuộc tính 'for' của <label> liên kết với 'id' của <input>. Khi người
     khiếm thị dùng Screen Reader (trình đọc màn hình) tab vào ô nhập liệu, máy sẽ đọc
     nhãn "Email" lên để họ biết cần nhập gì.
   - Mở rộng vùng tương tác: Giúp người dùng (đặc biệt là người run tay hoặc dùng mobile)
     có thể click vào chữ "Email" để trỏ chuột vào ô nhập liệu nhanh hơn.

2. Khi nào dùng <fieldset> và <legend>:
   - Khi dùng: Để nhóm các ô nhập liệu có cùng liên quan logic với nhau trong một form lớn.
   - Ví dụ cụ thể: Trong trang E-commerce, dùng để nhóm "Thông tin thanh toán" riêng với
     "Thông tin giao hàng".
   - Ví dụ code:
     <fieldset>
        <legend>Thông tin giao hàng</legend>
        <input type="text" placeholder="Địa chỉ...">
        <input type="tel" placeholder="Số điện thoại...">
     </fieldset>

3. Cách dùng aria-label:
   - Khi nào dùng: Dùng khi giao diện không có chữ (nhãn) hiển thị trên màn hình nhưng vẫn
     cần giải thích cho máy đọc. Ví dụ: Nút "X" để đóng form (chỉ có icon, không có chữ).
   - Tại sao KHÔNG dùng kèm với <label>:
     - Gây dư thừa: Screen Reader sẽ đọc cả hai, khiến người dùng nghe lặp đi lặp lại.
     - Quy tắc ưu tiên: aria-label sẽ ghi đè nội dung của <label>, có thể làm mất đi
       các thông tin hữu ích mà bạn đã dày công thiết lập trong nhãn tiêu chuẩn.

# Câu A4: (nguồn tham chiếu:06_graphics_multimedia.md)

1. Thuộc tính loading="lazy" trên thẻ <img>:
   - Ý nghĩa: Trình duyệt sẽ chỉ tải ảnh khi người dùng cuộn trang đến gần vị trí của ảnh đó.
   - Cải thiện: Tăng tốc độ tải trang ban đầu (Initial Load Time), tiết kiệm băng thông
     cho người dùng và giảm tải cho Server.
   - Khi nào KHÔNG nên dùng: Không dùng cho các ảnh ở đầu trang (Above the fold) - những
     ảnh người dùng thấy ngay khi vừa mở web, vì sẽ gây cảm giác ảnh hiện ra chậm.

2. Cung cấp nhiều <source> trong thẻ <video>:
   - Lý do: Mỗi trình duyệt hỗ trợ các định dạng (codec) khác nhau. Cung cấp nhiều source
     giúp trình duyệt tự chọn định dạng tốt nhất mà nó có thể đọc được.
   - 3 Format video phổ biến: .mp4 (H.264), .webm, .ogg.

3. Thuộc tính alt trên <img>:
   - Công dụng: Mô tả nội dung ảnh bằng văn bản. Hiển thị khi ảnh bị lỗi tải và giúp
     máy đọc màn hình (Screen Reader) đọc cho người khiếm thị.
   - Viết alt tốt cho 3 trường hợp:
     - Ảnh sản phẩm iPhone 16: alt="Điện thoại iPhone 16 màu Titan Sa mạc góc nhìn chính diện"
     - Ảnh trang trí (decorative): alt="" (Để trống để máy đọc bỏ qua, không gây nhiễu)
     - Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột thể hiện doanh thu Quý 1 năm 2026
       tăng trưởng 15% so với cùng kỳ năm ngoái"

# Câu A5: (nguồn tham chiếu:06_graphics_multimedia.md)

1. Cách 1: Chỉ sử dụng thẻ <img>
   - Khi nào dùng: Dùng cho các hình ảnh mang tính chất minh họa bổ trợ, icon, hoặc ảnh
     trang trí mà nội dung của nó đã được giải thích rõ bằng văn bản xung quanh.
     Ảnh này thường không cần chú thích đi kèm bên dưới.
   - 2 Ví dụ thực tế:
     - Ảnh Avatar của người dùng trên thanh Menu.
     - Banner quảng cáo khuyến mãi ở giữa trang chủ.

2. Cách 2: Sử dụng bộ thẻ <figure> và <figcaption>
   - Khi nào dùng: Dùng cho một khối nội dung độc lập (ảnh, biểu đồ, sơ đồ) cần có
     chú thích rõ ràng. <figure> giúp trình duyệt và máy đọc hiểu rằng ảnh và dòng
     chữ chú thích là một thực thể thống nhất. Nếu tách khối này ra khỏi bài viết,
     ý nghĩa của nó vẫn được giữ nguyên.
   - 2 Ví dụ thực tế:
     - Ảnh sản phẩm chi tiết trong trang mô tả (kèm tên và giá như mẫu).
     - Biểu đồ so sánh cấu hình giữa iPhone 16 và iPhone 15 trong bài viết đánh giá.

3. Điểm khác biệt cốt lõi:
   - Cách 1 thiên về hiển thị hình ảnh đơn thuần.
   - Cách 2 thiên về cấu trúc ngữ nghĩa (Semantic HTML), giúp tốt cho SEO và hỗ trợ
     tối đa cho các thiết bị hỗ trợ người khiếm thị.

## Phần C

# Câu C1:

```
- **Lỗi 1:** Dòng 2 — Input "Tên" không có `<label for="...">`, vi phạm accessibility.
  - **Sửa:** `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`

- **Lỗi 2:** Dòng 4 — Input "Email" thiếu thẻ `<label>` và thuộc tính `id`.
  - **Sửa:** `<label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn">`

- **Lỗi 3:** Dòng 6 & 7 — Các ô Password thiếu thuộc tính `name`.
  - **Sửa:** Thêm `name="password"` và `name="re-password"` để gửi dữ liệu lên server.

- **Lỗi 4:** Dòng 9 — Phone đang dùng `type="text"`.
  - **Sửa:** Chuyển thành `type="tel"` để hỗ trợ bàn phím số trên thiết bị di động.

- **Lỗi 5:** Dòng 11 — Thẻ `<select>` thiếu thuộc tính `name`.
  - **Sửa:** Thêm `name="city"` để xác định dữ liệu khi submit form.

- **Lỗi 6:** Dòng 12 & 13 — Các thẻ `<option>` thiếu thuộc tính `value`.
  - **Sửa:** Thêm `value="hn"` và `value="hcm"` cho từng lựa chọn.

- **Lỗi 7:** Dòng 16 — Thẻ `<label>` bị trống và thiếu ô Checkbox thực tế.
  - **Sửa:** `<input type="checkbox" id="terms" name="terms"> <label for="terms">Tôi đồng ý điều khoản</label>`

- **Lỗi 8:** Toàn bộ Form — Thiếu thuộc tính `method="POST"`.
  - **Sửa:** Thêm `method="POST"` vì form có chứa mật khẩu (bảo mật).
```

# Câu C2:

**Form đăng ký cho ngân hàng số:**

```html
<form>
  <label>CMND/CCCD:</label><br />
  <input
    type="text"
    name="cccd"
    required
    pattern="^\d{12}$"
    title="Vui lòng nhập đúng 12 chữ số CCCD"
    placeholder="Nhập 12 chữ số"
  />
  <br /><br />
  <label>Số tài khoản:</label><br />
  <input
    type="text"
    name="stk"
    required
    pattern="^\d{10,15}$"
    title="Số tài khoản phải từ 10 đến 15 chữ số"
    placeholder="Nhập từ 10 đến 15 chữ số"
  />
  <br /><br />

  <label>Email:</label><br />
  <input type="email" name="email" required placeholder="Nhập địa chỉ email" />
  <br /><br />

  <label>Mã PIN:</label><br />
  <input
    type="password"
    name="pin"
    required
    pattern="^\d{6}$"
    title="Mã PIN phải gồm đúng 6 chữ số"
    placeholder="Nhập 6 chữ số"
  />
  <br /><br />

  <button type="submit">Đăng ký</button>
</form>
```

**Câu hỏi**

1. Viết pattern regex cho CMND/CCCD và Số tài khoản:

- **CMND/CCCD** (đúng 12 chữ số):
  ```html
  <input type="text" pattern="[0-9]{12}" placeholder="Nhập 12 chữ số" />
  ```
- **Số tài khoản** (đúng 10-15 chữ số):

```html
<input type="text" pattern="[0-9]{10,15}" placeholder="Nhập 10-15 chữ số" />
```

2. HTML5 validation có đủ an toàn cho ứng dụng ngân hàng không? Tại sao?

- KHÔNG đủ an toàn! Lý do:
- HTML5 validation chỉ kiểm tra định dạng dữ liệu (format), không kiểm tra logic nghiệp vụ (business logic)
- Ví dụ: Pattern [0-9]{12} chỉ kiểm tra "12 chữ số", nhưng không kiểm tra CMND có thật hay không
- Người dùng có thể vô hiệu hóa HTML5 validation bằng DevTools → gửi dữ liệu sai lên server
- Ngân hàng phải validate bắt buộc ở Backend để đảm bảo an toàn

3. Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript):

- Validation 1: So sánh giữa 2 ô input
  - Ví dụ: Kiểm tra "Mật khẩu" và "Nhập lại mật khẩu" có khớp không?
  - HTML5 không thể → Phải dùng JavaScript để so sánh giá trị

- Validation 2: Kiểm tra logic nghiệp vụ (Business Logic)
  - Ví dụ: Kiểm tra CMND có hợp lệ theo thuật toán checksum, hoặc CMND chưa bị khóa
  - HTML5 chỉ kiểm tra format → Phải dùng JavaScript gọi API backend

- Validation 3: Kiểm tra dữ liệu trùng lặp (Duplicate Check)
  - Ví dụ: Kiểm tra email/số tài khoản có bị trùng trong database không?
  - HTML5 không có quyền truy cập database → Phải dùng JavaScript/AJAX để gửi lên server

4. Nêu 2 rủi ro bảo mật nếu chỉ validate Frontend mà không validate Backend:

- Dữ liệu rác/độc hại làm hỏng Database: Kẻ tấn công có thể dùng các công cụ như Postman để gửi thẳng dữ liệu "xấu" (ví dụ: chứa mã độc SQL Injection) lên Server mà không cần qua giao diện Web. Nếu Backend không kiểm tra lại, hệ thống có thể bị sập hoặc lộ dữ liệu.

- Gian lận và sai lệch logic nghiệp vụ: Nếu chỉ kiểm tra số tiền rút ở Frontend, một lập trình viên có thể sửa code F12 để gửi yêu cầu rút 1 tỷ đồng dù trong tài khoản chỉ có 1 triệu. Nếu Backend không xác thực lại quyền hạn và số dư, ngân hàng sẽ bị thất thoát tài sản.
