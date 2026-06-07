// Biến toàn cục để lưu trữ trạng thái của ứng dụng (Client-side state)
let state = {
    users: [],
    filteredUsers: []
};

// ==========================================
// 1. API LAYER
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không thể tải danh sách người dùng.");
        return await response.json();
    },
    
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error("Không thể lấy thông tin chi tiết người dùng.");
        return await response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi thêm người dùng mới.");
        return await response.json();
    },
    
    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi cập nhật thông tin.");
        return await response.json();
    },
    
    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Lỗi khi xóa người dùng.");
        return true;
    }
};

// ==========================================
// 2. UI LAYER
// ==========================================
const ui = {
    renderUsers(users) {
        const grid = document.getElementById("users-grid");
        if (users.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Không tìm thấy người dùng nào phù hợp.</p>`;
            return;
        }
        
        grid.innerHTML = users.map(user => `
            <div class="user-card" data-id="${user.id}">
                <div>
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                </div>
                <div>
                    <button class="btn btn-edit" onclick="handleEdit(${user.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="handleDelete(${user.id})">Xóa</button>
                </div>
            </div>
        `).join('');
    },
    
    showLoading() {
        const grid = document.getElementById("users-grid");
        grid.innerHTML = Array(6).fill(0).map(() => `
            <div class="skeleton-card">
                <div class="skeleton-line title"></div>
                <div class="skeleton-line text"></div>
                <div class="skeleton-line btn"></div>
            </div>
        `).join('');
    },
    
    hideLoading() {
        // Hàm này sẽ tự động chạy đè khi renderUsers được gọi
    },
    
    showError(message) {
        this.createToast(message, 'error');
    },
    
    showSuccess(message) {
        this.createToast(message, 'success');
    },
    
    createToast(message, type) {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerText = message;
        
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000); // Tự động xóa sau 3s
    }
};

// ==========================================
// 3. EVENT HANDLERS & APP LOGIC
// ==========================================

// Khởi chạy khi load trang
document.addEventListener("DOMContentLoaded", async () => {
    ui.showLoading();
    try {
        state.users = await api.getUsers();
        state.filteredUsers = [...state.users];
        ui.renderUsers(state.filteredUsers);
    } catch (error) {
        ui.showError(error.message);
    }
});

// Chức năng Tìm kiếm (Client-side filter)
document.getElementById("search-input").addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    state.filteredUsers = state.users.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(state.filteredUsers);
});

// Chức năng Xử lý Submit Form (Cả Tạo mới & Cập nhật)
document.getElementById("user-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = document.getElementById("user-id").value;
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const userData = { name, email };
    
    try {
        if (id) {
            // Trường hợp: UPDATE
            const updatedUser = await api.updateUser(id, userData);
            // Cập nhật mảng Local State mà không reload trang
            state.users = state.users.map(u => u.id == id ? { ...u, ...updatedUser } : u);
            ui.showSuccess("Cập nhật thông tin thành công!");
        } else {
            // Trường hợp: CREATE
            const newUser = await api.createUser(userData);
            // API JSONPlaceholder luôn trả về id: 11 cố định, ta tạo id ngẫu nhiên độc nhất ở Client tránh trùng lặp
            newUser.id = Date.now(); 
            state.users.unshift(newUser); // Thêm lên đầu danh sách
            ui.showSuccess("Thêm người dùng thành công!");
        }
        
        // Đồng bộ lại UI sau thay đổi
        resetForm();
        triggerCurrentSearch();
    } catch (error) {
        ui.showError(error.message);
    }
});

// Trình kích hoạt điền form khi bấm nút "Sửa"
async function handleEdit(id) {
    try {
        // Tìm trực tiếp từ Local state hoặc fetch API theo yêu cầu đề bài
        const user = state.users.find(u => u.id == id) || await api.getUser(id);
        
        document.getElementById("form-title").innerText = "Cập nhật thông tin";
        document.getElementById("user-id").value = user.id;
        document.getElementById("user-name").value = user.name;
        document.getElementById("user-email").value = user.email;
        document.getElementById("btn-cancel").style.display = "inline-block";
        
        // Cuộn màn hình lên chỗ form để người dùng dễ thao tác
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        ui.showError(error.message);
    }
}

// Chức năng Xóa User
async function handleDelete(id) {
    if (confirm("Bạn có chắc chắn muốn xóa thành viên này không?")) {
        try {
            await api.deleteUser(id);
            // Xóa phần tử khỏi Local State mà không reload trang
            state.users = state.users.filter(u => u.id != id);
            ui.showSuccess("Xóa thành viên thành công!");
            triggerCurrentSearch();
        } catch (error) {
            ui.showError(error.message);
        }
    }
}

// Bấm nút Hủy trên Form Edit
document.getElementById("btn-cancel").addEventListener("click", resetForm);

// Reset form về trạng thái ban đầu
function resetForm() {
    document.getElementById("user-form").reset();
    document.getElementById("user-id").value = "";
    document.getElementById("form-title").innerText = "Thêm thành viên mới";
    document.getElementById("btn-cancel").style.display = "none";
}

// Giúp giữ bộ lọc Tìm kiếm hiện tại sau khi CRUD (không bị nhảy về full list)
function triggerCurrentSearch() {
    const keyword = document.getElementById("search-input").value.toLowerCase().trim();
    state.filteredUsers = state.users.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(state.filteredUsers);
}