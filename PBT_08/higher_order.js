function pipe(...fns) {
  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

const process = pipe(
  (x) => x * 2,
  (x) => x + 10,
  (x) => x.toString(),
  (x) => "Kết quả: " + x,
);
console.log("--- Test pipe ---");
console.log(process(5));

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});

console.log("\n--- Test memoize ---");
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

console.log("\n--- Test debounce (chờ 500ms) ---");
search("a");
search("ap");
search("apple");

async function retry(fn, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Lần thử ${attempt} thất bại...`);
      lastError = error;
      if (attempt === maxAttempts) break;
    }
  }
  throw lastError;
}

const unstableFn = (() => {
  let count = 0;
  return async () => {
    count++;
    if (count < 3) throw new Error("Lỗi kết nối Server");
    return "Thành công!";
  };
})();

console.log("\n--- Test retry ---");
retry(unstableFn, 5)
  .then((res) => console.log(res))
  .catch((err) => console.error("Kết quả cuối cùng:", err.message));
