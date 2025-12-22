# 📰 Dân Trí News - Fullstack Application

Ứng dụng web đọc báo Dân Trí được xây dựng với Spring Boot (Backend) và React + TypeScript (Frontend)

## 📁 Cấu trúc Project

```
dantri-ltfe/
├── be/          # Backend - Spring Boot API
│   └── README   # (Có thể thêm sau)
└── fe/          # Frontend - React + TypeScript + Vite
    └── README.md    # Hướng dẫn chi tiết Frontend
```

## 🚀 Quick Start

### Backend (Spring Boot)
```bash
cd be
./mvnw spring-boot:run
```
Backend sẽ chạy tại: `http://localhost:8080`

### Frontend (React + Vite)
```bash
cd fe
npm install
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:5173`

📖 **Xem hướng dẫn chi tiết Frontend tại:** [fe/README.md](fe/README.md)

## 🔧 Tech Stack

### Backend
- **Framework:** Spring Boot
- **Build Tool:** Maven
- **Web Scraping:** JSoup (hoặc tương tự)

### Frontend  
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS
- **HTTP Client:** Axios
- **Authentication:** Supabase
- **Routing:** React Router v6

## 📋 Prerequisites

- **Java:** JDK 17+ (cho Backend)
- **Node.js:** 16+ (cho Frontend)
- **npm** hoặc **yarn**

## ⚙️ Environment Setup

Cả Frontend và Backend đều sử dụng environment variables:

- **Frontend:** Xem chi tiết tại [fe/README.md](fe/README.md#cấu-hình-environment-variables)
- **Backend:** Config trong `be/src/main/resources/application.properties`

## 🌐 Deploy

- **Frontend:** Vercel, Netlify (xem hướng dẫn trong [fe/README.md](fe/README.md#deploy-lên-production))
- **Backend:** Heroku, Railway, hoặc VPS

## 👨‍💻 Development

### 1. Clone repository
```bash
git clone <repository-url>
cd dantri-ltfe
```

### 2. Setup Frontend Environment Variables

**Bước 1:** Copy file `.env.example` thành `.env.development`
```bash
cd fe

# Windows (PowerShell)
Copy-Item .env.example .env.development

# macOS/Linux
cp .env.example .env.development
```

**Bước 2:** Mở file `.env.development` và cập nhật giá trị
```env
# API URL cho môi trường development (local)
VITE_API_BASE_URL=http://localhost:8080

# Supabase Configuration (lấy từ Supabase dashboard)
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Start Backend
```bash
cd be
./mvnw spring-boot:run
```

### 4. Start Frontend (terminal khác)
```bash
cd fe
npm install
npm run dev
```

💡 **Lưu ý:** File `.env.development` sẽ không được commit lên Git (đã có trong `.gitignore`)

## 📝 Tác giả

Đồ án LTFE - Dân Trí News Reader
