# TodoApp

Ứng dụng quản lý công việc (Todo) full-stack: Backend REST API (Node.js + MongoDB) và Frontend SPA (React + Vite).

---

## Tổng quan

TodoApp cho phép người dùng thêm, sửa, xóa và đánh dấu hoàn thành công việc. Giao diện hỗ trợ lọc theo trạng thái (All / Active / Completed), lọc theo thời gian (Today / This Week / This Month / All) và phân trang danh sách task.

---

## Công nghệ sử dụng

| Phần | Công nghệ |
|------|-----------|
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Frontend** | React 19, Vite 7, React Router 7 |
| **UI** | Tailwind CSS 4, Radix UI, Lucide Icons, Sonner (toast) |
| **HTTP** | Axios |

---

## Tính năng

- Thêm task mới (tiêu đề, tối đa 500 ký tự)
- Đánh dấu hoàn thành / chưa hoàn thành
- Sửa và xóa task
- Lọc theo trạng thái: **All**, **Active**, **Completed**
- Lọc theo thời gian tạo: **Today**, **This Week**, **This Month**, **All**
- Phân trang danh sách task
- Thống kê số task active và completed
- Giao diện responsive, thông báo toast khi thao tác thành công / lỗi

---

## Cấu trúc dự án

```
todoApp/
├── be/                    # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/        # Cấu hình DB
│   │   ├── controller/    # Xử lý logic API
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # Định tuyến API
│   │   └── server.js      # Entry point
│   └── package.json
│
├── fe/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Component giao diện
│   │   ├── lib/           # Axios, utils, constants
│   │   ├── pages/         # Trang (Home, NotFound)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Yêu cầu hệ thống

- **Node.js** (khuyến nghị v18+)
- **MongoDB** (chạy local hoặc MongoDB Atlas)
- **npm** hoặc **pnpm**

---

## Cài đặt và chạy

### 1. Clone và vào thư mục dự án

```bash
git clone <repository-url>
cd todoApp
```

### 2. Backend

```bash
cd be
npm install
```

Tạo file `.env` trong thư mục `be/`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/todoapp
CORS_ORIGIN=http://localhost:5173
```

Chạy server (chế độ dev với nodemon):

```bash
npm run dev
```

Server chạy tại: **http://localhost:5001**

### 3. Frontend

Mở terminal mới:

```bash
cd fe
npm install
```

Chạy ứng dụng (chế độ dev):

```bash
npm run dev
```

Mở trình duyệt tại: **http://localhost:5173**

---

## Biến môi trường

| Biến | Thư mục | Mô tả | Mặc định |
|------|---------|-------|----------|
| `PORT` | be | Cổng chạy server | `5001` |
| `MONGODB_URI` | be | Chuỗi kết nối MongoDB | — |
| `CORS_ORIGIN` | be | Origin cho phép CORS | `http://localhost:5173` |
| `VITE_API_URL` | fe | Base URL của API | `http://localhost:5001/api` |

---

## API

Base URL: `http://localhost:5001/api` (hoặc theo `VITE_API_URL`)

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/tasks` | Lấy danh sách task + số lượng active/completed |
| `POST` | `/tasks` | Tạo task mới (body: `{ "title": "..." }`) |
| `PUT` | `/tasks/:id` | Cập nhật task (body: `title`, `status`, `completedAt`) |
| `DELETE` | `/tasks/:id` | Xóa task |
