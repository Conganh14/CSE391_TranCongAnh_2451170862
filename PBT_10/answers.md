Câu A1

1. Thứ tự output:

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

- Giải thích Event Loop:

1. Call Stack (Ngăn xếp): Nơi thực thi code đồng bộ (sync)
2. Microtask Queue (Hàng đợi vi nhiệm vụ):
   - Chứa các callback của Promise (.then, .catch, .finally)
   - Được ưu tiên thực thi TRƯỚC Macrotask
3. Macrotask Queue (Hàng đợi nhiệm vụ):
   - Chứa callback của setTimeout, setInterval, I/O
   - Chỉ được thực thi SAU KHI Microtask Queue rỗng

Quá trình thực thi:

| Bước | Code thực thi              | Call Stack              | Microtask Queue              | Macrotask Queue                            |
| ---- | -------------------------- | ----------------------- | ---------------------------- | ------------------------------------------ |
| 1    | `console.log("1 - Start")` | In "1 - Start"          | -                            | -                                          |
| 2    | `setTimeout(..., 0)`       | -                       | -                            | [callback "2"]                             |
| 3    | `Promise.resolve().then()` | -                       | [callback "3"]               | [callback "2"]                             |
| 4    | `console.log("4 - End")`   | In "4 - End"            | [callback "3"]               | [callback "2"]                             |
| 5    | `setTimeout(..., 100)`     | -                       | [callback "3"]               | [callback "2", callback "5"]               |
| 6    | `Promise.resolve().then()` | -                       | [callback "3", callback "6"] | [callback "2", callback "5"]               |
| 7    | Microtask "3"              | In "3 - Promise"        | [callback "6"]               | [callback "2", callback "5"]               |
| 8    | Microtask "6"              | In "6 - Promise 2"      | -                            | [callback "2", callback "5", callback "7"] |
| 9    | Macrotask "2"              | In "2 - Timeout 0ms"    | -                            | [callback "5", callback "7"]               |
| 10   | Macrotask "7"              | In "7 - Nested timeout" | -                            | [callback "5"]                             |
| 11   | Macrotask "5" (sau 100ms)  | In "5 - Timeout 100ms"  | -                            | -                                          |

Câu A2

```javascript
async function getData() {
  // [1] Khai báo hàm bất đồng bộ
  try {
    // [2] Bắt đầu khối try-catch
    const response = await fetch("..."); // [3] Gọi API và ĐỢI response

    if (!response.ok) {
      // [4] Kiểm tra status code
      throw new Error(`HTTP ${response.status}`); // [5] Ném lỗi nếu không OK
    }

    const data = await response.json(); // [6] Parse JSON và ĐỢI kết quả
    return data; // [7] Trả về dữ liệu
  } catch (error) {
    // [8] Bắt lỗi
    console.error("Failed:", error.message); // [9] Log lỗi
    return null; // [10] Trả về null nếu lỗi
  }
}
```

1. `await fetch(...)` — fetch trả về gì? Tại sao cần await?

- `fetch()` trả về một Promise chứa Response object
- Cần `await` vì:
  - Fetch là bất đồng bộ (async) - không block chương trình
  - `await` sẽ "tạm dừng" function cho đến khi Promise resolve
  - Nếu không await: sẽ nhận được Promise object thay vì Response

```javascript
// Không có await:
const response = fetch("..."); // response = Promise<Response>

// Có await:
const response = await fetch("..."); // response = Response object
```

2. `response.ok` — Khi nào false? 3 status codes:

- `response.ok` = `true` khi status code từ 200-299
- `response.ok` = `false` khi:

| Status Code | Tên                   | Ý nghĩa                 |
| ----------- | --------------------- | ----------------------- |
| 404         | Not Found             | Resource không tồn tại  |
| 500         | Internal Server Error | Lỗi server              |
| 403         | Forbidden             | Không có quyền truy cập |
| 401         | Unauthorized          | Chưa đăng nhập/xác thực |
| 429         | Too Many Requests     | Gọi API quá nhiều       |

3. `response.json()` — Tại sao cần await lần nữa?

- `response.json()` CŨNG trả về Promise
- Vì việc đọc + parse JSON từ body stream là bất đồng bộ
- Body stream chỉ đọc được 1 lần (one-time read)

```javascript
// response.json() = Promise<Object>
const data = await response.json(); // data = JavaScript Object

// Tương tự với:
// response.text() → Promise<string>
// response.blob() → Promise<Blob>
```

4. `try...catch` — Catch bắt lỗi gì?

| Loại lỗi         | Có bắt được?  | Ví dụ                                        |
| ---------------- | ------------- | -------------------------------------------- |
| Network Error    | CÓ            | Mất mạng, DNS fail, CORS                     |
| JSON Parse Error | CÓ            | Server trả HTML thay vì JSON                 |
| Throw thủ công   | CÓ            | `throw new Error(...)` khi `!response.ok`    |
| HTTP 404/500     | KHÔNG tự động | Cần kiểm tra `response.ok` và throw thủ công |

Quan trọng: Fetch KHÔNG tự động throw lỗi với HTTP error status (404, 500...). Phải tự kiểm tra `response.ok`!

Câu A3

- Sơ đồ 3 trạng thái Promise:

```
                    ┌─────────────────────────────────────┐
                    │                                     │
                    │            PROMISE                  │
                    │                                     │
                    └──────────────┬──────────────────────┘
                                   │
                                   │ (Khởi tạo)
                                   ▼
                    ┌─────────────────────────────────────┐
                    │           PENDING                   │
                    │      (Đang chờ xử lý)               │
                    │    Trạng thái ban đầu               │
                    └──────────────┬──────────────────────┘
                                   │
               ┌───────────────────┼───────────────────┐
               │                                       │
               │ resolve(value)              reject(error)
               │                                       │
               ▼                                       ▼
┌─────────────────────────┐         ┌─────────────────────────┐
│      FULFILLED          │         │        REJECTED         │
│   (Thành công)          │         │      (Thất bại)         │
│                         │         │                         │
│   .then(callback)       │         │   .catch(callback)      │
│   nhận được value       │         │   nhận được error       │
└─────────────────────────┘         └─────────────────────────┘
```

Callback Hell là gì?

- Callback Hell (hay "Pyramid of Doom") là tình trạng code bị lồng nhau nhiều tầng khi xử lý các tác vụ bất đồng bộ liên tiếp, làm code khó đọc và khó bảo trì.

Ví dụ Callback Hell 4 cấp:

```javascript
// CALLBACK HELL - Khó đọc, khó bảo trì
function loadUserData(userId) {
  getUser(
    userId,
    function (user) {
      // Cấp 1
      getPosts(
        user.id,
        function (posts) {
          // Cấp 2
          getComments(
            posts[0].id,
            function (comments) {
              // Cấp 3
              getLikes(
                comments[0].id,
                function (likes) {
                  // Cấp 4
                  console.log("Likes:", likes);
                  // Thêm callback nữa? Kim tự tháp tiếp tục...
                },
                function (err) {
                  console.error("Lỗi lấy likes:", err);
                },
              );
            },
            function (err) {
              console.error("Lỗi lấy comments:", err);
            },
          );
        },
        function (err) {
          console.error("Lỗi lấy posts:", err);
        },
      );
    },
    function (err) {
      console.error("Lỗi lấy user:", err);
    },
  );
}
```

- Refactor thành async/await:

```javascript
async function loadUserData(userId) {
  try {
    // Các bước thực hiện TUẦN TỰ, code phẳng
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    const likes = await getLikes(comments[0].id);

    console.log("Likes:", likes);
    return likes;
  } catch (err) {
    // Một chỗ xử lý TẤT CẢ lỗi
    console.error("Có lỗi xảy ra:", err.message);
    return null;
  }
}

// Sử dụng:
loadUserData(123);
```
