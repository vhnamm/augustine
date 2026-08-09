
# Augustine – Website Bán Đồ Thời Trang

## Giới thiệu

**Augustine** là website bán đồ thời trang được xây dựng trong khuôn khổ **bài tập nhóm môn Thiết kế Web Cơ Bản**.
Dự án tập trung vào việc áp dụng các kiến thức nền tảng về **HTML, CSS (SCSS), JavaScript và React** để xây dựng một website bán hàng hiện đại, có cấu trúc rõ ràng, dễ mở rộng và thân thiện với người dùng.

Website mô phỏng các chức năng cơ bản của một trang thương mại điện tử thời trang như:

* Hiển thị danh sách sản phẩm
* Điều hướng nhiều trang
* Giao diện responsive
* Quản lý dữ liệu sản phẩm thông qua server giả lập
---

## Mục tiêu dự án
* Vận dụng kiến thức môn **Thiết kế Web Cơ Bản**
* Làm quen với React và mô hình SPA (Single Page Application)
* Tổ chức mã nguồn rõ ràng, dễ bảo trì
* Phân công và phối hợp làm việc nhóm hiệu quả
---

## Công nghệ sử dụng

### Frontend
* **React**: Thư viện xây dựng giao diện người dùng
* **React DOM**: Kết nối React với DOM
* **React Router / React Router DOM**: Điều hướng và quản lý route trong ứng dụng
* **SASS (SCSS)**: Tiền xử lý CSS, giúp code gọn gàng và dễ quản lý
* **clsx**: Hỗ trợ xử lý className linh hoạt trong React

### Backend (giả lập)
* **json-server**: Tạo REST API giả để phục vụ dữ liệu sản phẩm


## Thành viên nhóm
* **Hoài Nam**
* **Thi**
* **Mạnh**
* **Khánh**
> Dự án là kết quả của quá trình làm việc nhóm, mỗi thành viên đều có đóng góp vào quá trình xây dựng giao diện, logic và hoàn thiện sản phẩm.
---

## Cách sử dụng mã nguồn

### Bước 1: Clone project về máy & cài các thư viện cần thiết
* Mở VSCode
```bash
git clone https://github.com/vhnamm/augustine_tkeweb
cd augustine_tkeweb
npm install
```

### Bước 2: Chạy server giả lập dữ liệu
```bash
node server.cjs
```

### Bước 3: Chạy dự án React
```bash
npm run dev
```

Sau đó truy cập đường dẫn hiển thị trên terminal (thường là `http://localhost:5173`) để xem website.
---

## Ghi chú

* Project phục vụ mục đích **học tập**, không dùng cho thương mại
* Có thể mở rộng thêm các chức năng như giỏ hàng, đăng nhập, thanh toán trong tương lai
* Dữ liệu hiện tại được quản lý bằng **json-server**
---

## Kết luận

Dự án **Augustine** giúp nhóm sinh viên làm quen với quy trình xây dựng một website bán hàng cơ bản, từ giao diện đến logic điều hướng và quản lý dữ liệu. Đây là nền tảng quan trọng cho các môn học và dự án web nâng cao sau này.
---


