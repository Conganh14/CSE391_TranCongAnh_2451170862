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

# Câu A4: (nguồn tham chiếu:06_graphics_multimedia.md)

# Câu A5: (nguồn tham chiếu:06_graphics_multimedia.md)
