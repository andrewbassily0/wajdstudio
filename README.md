# 🏛️ WAJD Studio - Luxury Interior Design & E-commerce

WAJD Studio is a premium, full-stack web application designed for high-end interior design firms. It seamlessly integrates a sophisticated design portfolio with a fully functional furniture and decor e-commerce platform.

![WAJD Studio Banner](https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

### 🖼️ Design Portfolio
Showcase high-resolution projects with category filtering (Classic, Modern, Minimalist).

### 🛒 E-commerce Store
- **Product Gallery**: Browse artisanal furniture with detailed descriptions and variations.
- **Shopping Cart**: Real-time cart management using Zustand state management.
- **Order Tracking**: Customers can track their orders using a unique tracking ID.

### 🔐 Admin Dashboard
A secure portal for studio managers to:
- Add/Edit/Delete projects and products.
- View and manage customer orders.
- Handle customer inquiries.
- Native JSON handling for modern data management.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start (Docker)

Ensure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/andrewbassily0/wajdstudio.git
   cd wajdstudio
   ```

2. **Set up environment variables:**
   The project comes with a pre-configured `.env` file for Docker, but you can customize it:
   ```bash
   # .env
   DATABASE_URL=postgresql://user:password@db:5432/wajdstudio?schema=public
   JWT_SECRET=your_secret_key
   ```

3. **Launch the application:**
   ```bash
   docker compose up --build -d
   ```

4. **Seed the database (Optional):**
   Populate the store with sample luxury items:
   ```bash
   docker compose exec app npx tsx prisma/seed.ts
   ```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## 🛂 Admin Access

Access the dashboard at `/admin`.

- **Default Email**: `admin@wajdstudio.com`
- **Default Password**: `admin123`

---

## 📦 Project Structure

```text
├── prisma/               # Database schema and seed scripts
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Logic for individual routes
│   ├── store/           # Zustand state management
│   ├── types.ts         # TypeScript definitions
├── server.ts            # Express backend & Vite middleware
├── Dockerfile           # Production-ready container config
└── docker-compose.yml   # Multi-container orchestration
```

## 📄 License

This project is licensed under the Apache-2.0 License.

---
Built with ❤️ by [Andrew Bassily](https://github.com/andrewbassily0)
