function createCart() {
  let items = [];
  let discount = 0;
  let discountType = "none";

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return {
    addItem(product, quantity = 1) {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      const item = items.find((item) => item.id === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    },

    getTotal() {
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      if (discountType === "percent") {
        return subtotal * (1 - discount);
      } else if (discountType === "fixed") {
        return Math.max(0, subtotal - discount);
      }
      return subtotal;
    },

    applyDiscount(code) {
      switch (code) {
        case "SALE10":
          discount = 0.1;
          discountType = "percent";
          break;
        case "SALE20":
          discount = 0.2;
          discountType = "percent";
          break;
        case "FREESHIP":
          discount = 30000;
          discountType = "fixed";
          break;
        default:
          console.log("Mã giảm giá không hợp lệ");
      }
    },

    printCart() {
      const width = 46;
      console.log("┌" + "─".repeat(width) + "┐");
      console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");

      items.forEach((item, index) => {
        const total = item.price * item.quantity;
        const no = (index + 1).toString().padEnd(1);
        const name = item.name.padEnd(13);
        const qty = item.quantity.toString().padStart(2);
        const price = formatCurrency(item.price).padStart(10);
        const lineTotal = formatCurrency(total).padStart(11);
        console.log(`│ ${no} │ ${name} │ ${qty} │ ${price} │ ${lineTotal} │`);
      });

      console.log("├" + "─".repeat(width) + "┤");
      const finalTotal = this.getTotal();
      const totalStr = formatCurrency(finalTotal) + "đ";
      console.log(`│ Tổng cộng: ${totalStr.padStart(34)} │`);
      console.log("└" + "─".repeat(width) + "┘");
    },

    getItemCount() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    clearCart() {
      items = [];
      discount = 0;
      discountType = "none";
    },
  };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());
