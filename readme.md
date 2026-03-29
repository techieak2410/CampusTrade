# 🛒 CampusTrade

A full-stack MERN marketplace application that lets students buy, sell, and trade items within their campus community.

---

## 📁 Project Structure

```
CampusTrade/
├── backend/          # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── uploads/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env          # Environment variables (see below)
│   └── package.json
└── frontend/         # React + Vite SPA
    ├── src/
    ├── index.html
    └── package.json
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- [Cloudinary](https://cloudinary.com/) account (for image uploads)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory with the following keys:

```env
# Server
PORT=3001

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/CampusTrade

# Cloudinary (Image Hosting)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_super_secret_jwt_key
```

> ⚠️ **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

---

## 🚀 Running Locally (Without Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CampusTrade.git
cd CampusTrade
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file (see above), then start the dev server:

```bash
npm run dev
```

> The backend will start at **http://localhost:3001**

### 3. Frontend Setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

> The frontend will start at **http://localhost:5173**

---

## 🐳 Running with Docker

### Prerequisites

Make sure [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) are installed.

### Build & Run

From the **root** of the project:

```bash
docker compose up --build
```

This will:
- Build the **backend** Node.js image
- Build and serve the **frontend** React app via Nginx
- Start both services

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:80      |
| Backend  | http://localhost:3001    |

### Stop Containers

```bash
docker compose down
```

---

## 📜 Available Scripts

### Backend (`/backend`)

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start backend with nodemon (hot reload) |
| `npm start`     | Start backend with nodemon           |

### Frontend (`/frontend`)

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start Vite dev server (hot reload)   |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build locally     |
| `npm run lint`    | Run ESLint                           |

---

## 🔌 API Endpoints

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/`                    | Health check             |
| POST   | `/users/register`      | Register a new user      |
| POST   | `/users/login`         | Login and receive JWT    |
| GET    | `/Listings`            | Get all listings         |
| POST   | `/Listings`            | Create a new listing     |
| PATCH  | `/Listings/:id`        | Update a listing         |
| DELETE | `/Listings/:id`        | Delete a listing         |

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, Vanilla CSS         |
| Backend   | Node.js, Express 5                  |
| Database  | MongoDB (Mongoose)                  |
| Auth      | JWT + bcrypt                        |
| Images    | Cloudinary + Multer                 |
| Container | Docker + Nginx                      |

---

## 📄 License

MIT © CampusTrade
