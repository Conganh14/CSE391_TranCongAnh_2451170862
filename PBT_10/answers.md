# Phần A — Kiểm tra đọc hiểu

## Câu A1

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

# Phần C

## Câu C1

1. Network Errors (Mất mạng giữa chừng):

```javascript
// Kiểm tra online/offline
window.addEventListener("online", () => {
  console.log("Đã kết nối lại!");
  retryFailedRequests(); // Thử lại các request đã fail
});

window.addEventListener("offline", () => {
  showMessage("Mất kết nối mạng!");
});

// Kiểm tra trước khi fetch
async function safeFetch(url) {
  if (!navigator.onLine) {
    throw new Error("Không có kết nối mạng");
  }
  return await fetch(url);
}
```

2. API Errors (Server trả lỗi):

```javascript
async function handleAPIErrors(response) {
  if (response.ok) return response; // 200-299: OK

  // Xử lý từng loại lỗi
  switch (response.status) {
    case 400:
      throw new Error("Dữ liệu gửi lên không hợp lệ");
    case 401:
      // Redirect đến trang đăng nhập
      window.location.href = "/login";
      break;
    case 403:
      throw new Error("Bạn không có quyền truy cập");
    case 404:
      throw new Error("Không tìm thấy dữ liệu");
    case 429:
      // Too Many Requests - Đợi và thử lại
      const retryAfter = response.headers.get("Retry-After") || 60;
      throw new Error(`Quá nhiều request. Vui lòng đợi ${retryAfter} giây`);
    case 500:
      throw new Error("Lỗi server. Vui lòng thử lại sau");
    case 503:
      throw new Error("Server đang bảo trì");
    default:
      throw new Error(`Lỗi HTTP: ${response.status}`);
  }
}
```

3. Timeout (API chậm > 10 giây):

```javascript
/
 * Fetch với timeout - Hủy request nếu quá chậm
 * @param {string} url - URL cần gọi
 * @param {number} ms - Thời gian timeout (milli giây)
 */
async function fetchWithTimeout(url, ms = 10000) {
    // AbortController để hủy fetch
    const controller = new AbortController();

    // Hẹn giờ hủy request
    const timeoutId = setTimeout(() => {
        controller.abort();  // Hủy fetch
    }, ms);

    try {
        const response = await fetch(url, {
            signal: controller.signal  // Liên kết với controller
        });
        clearTimeout(timeoutId);  // Xóa timer nếu thành công
        return response;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error(`Request timeout sau ${ms/1000} giây`);
        }
        throw error;  // Ném lại các lỗi khác
    }
}

// Sử dụng:
try {
    const response = await fetchWithTimeout('https://api.example.com', 5000);
    const data = await response.json();
} catch (error) {
    console.error(error.message);  // "Request timeout sau 5 giây"
}
```

4. Retry Logic (Thử lại 3 lần nếu lỗi):

```javascript
/
 * Fetch với retry - Tự động thử lại khi lỗi
 * @param {string} url - URL cần gọi
 * @param {number} maxRetries - Số lần thử tối đa
 * @param {number} delay - Thời gian chờ giữa các lần (ms)
 */
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Thử lần ${attempt}/${maxRetries}...`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response;  // Thành công → trả về

        } catch (error) {
            lastError = error;
            console.warn(`Lần ${attempt} thất bại:`, error.message);

            // Nếu chưa hết lần retry → đợi rồi thử lại
            if (attempt < maxRetries) {
                console.log(`Đợi ${delay}ms rồi thử lại...`);
                await new Promise(r => setTimeout(r, delay));
                delay *= 2;  // Exponential backoff (1s → 2s → 4s)
            }
        }
    }

    // Hết lần retry mà vẫn lỗi
    throw new Error(`Thất bại sau ${maxRetries} lần thử: ${lastError.message}`);
}

// Sử dụng:
try {
    const response = await fetchWithRetry('https://api.example.com', 3);
    const data = await response.json();
} catch (error) {
    console.error('Không thể kết nối:', error.message);
}
```

---

Câu C2

| Method                 | Khi nào resolve?                                  | Khi nào reject?             | Use case                                                               |
| ---------------------- | ------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------- |
| `Promise.all()`        | Khi TẤT CẢ promises fulfill                       | Khi BẤT KỲ promise reject   | Load nhiều dữ liệu cần ĐỦ (trang sản phẩm cần cả info + giá + ảnh)     |
| `Promise.allSettled()` | Luôn resolve (sau khi tất cả xong)                | KHÔNG BAO GIỜ reject        | Dashboard hiện nhiều widget - 1 widget lỗi không ảnh hưởng widget khác |
| `Promise.race()`       | Khi promise ĐẦU TIÊN settle (fulfill hoặc reject) | Khi promise đầu tiên reject | Implement timeout, đua giữa fetch và timer                             |
| `Promise.any()`        | Khi BẤT KỲ promise fulfill                        | Khi TẤT CẢ promises reject  | Load từ nhiều server, lấy server nhanh nhất                            |

Ví dụ code thực tế:

1. Promise.all() - Trang chi tiết sản phẩm:

```javascript
// Trang sản phẩm CẦN TẤT CẢ thông tin để hiển thị
async function loadProductPage(productId) {
  try {
    // Gọi song song 3 API - tất cả phải thành công
    const [product, reviews, relatedItems] = await Promise.all([
      fetch(`/api/products/${productId}`).then((r) => r.json()),
      fetch(`/api/products/${productId}/reviews`).then((r) => r.json()),
      fetch(`/api/products/${productId}/related`).then((r) => r.json()),
    ]);

    // Chỉ render khi có ĐỦ data
    renderProductPage(product, reviews, relatedItems);
  } catch (error) {
    // NẾU 1 API LỖI → toàn bộ fail
    showError("Không thể tải trang sản phẩm");
  }
}
```

2. Promise.allSettled() - Dashboard với nhiều widget:

```javascript
// Dashboard có nhiều widget - 1 widget lỗi không ảnh hưởng các widget khác
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/weather").then((r) => r.json()),
    fetch("/api/news").then((r) => r.json()),
    fetch("/api/stocks").then((r) => r.json()), // API này có thể lỗi
    fetch("/api/emails").then((r) => r.json()),
  ]);

  // Xử lý từng kết quả riêng biệt
  results.forEach((result, index) => {
    const widgets = ["weather", "news", "stocks", "emails"];
    const widgetName = widgets[index];

    if (result.status === "fulfilled") {
      renderWidget(widgetName, result.value);
    } else {
      renderWidgetError(widgetName, "Không thể tải dữ liệu");
    }
  });
}
```

3. Promise.race() - Timeout cho API chậm:

```javascript
// Đua giữa fetch và timer - ai về trước thắng
async function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout!"));
    }, timeout);
  });

  // Promise nào xong trước sẽ quyết định kết quả
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Sử dụng:
try {
  const response = await fetchWithTimeout("/api/slow-endpoint", 3000);
  const data = await response.json();
} catch (error) {
  console.error(error.message); // "Request timeout!" nếu quá 3 giây
}
```

4. Promise.any() - Load từ nhiều CDN:

```javascript
// Load ảnh từ nhiều CDN - lấy CDN nào nhanh nhất
async function loadImageFromFastestCDN(imagePath) {
  const cdns = [
    "https://cdn1.example.com",
    "https://cdn2.example.com",
    "https://cdn3.example.com",
  ];

  try {
    // Chỉ cần 1 CDN thành công là đủ
    const response = await Promise.any(
      cdns.map((cdn) => fetch(`${cdn}/${imagePath}`)),
    );

    return await response.blob();
  } catch (error) {
    // Chỉ vào đây khi TẤT CẢ CDN đều lỗi
    throw new Error("Tất cả CDN đều không khả dụng");
  }
}
```
