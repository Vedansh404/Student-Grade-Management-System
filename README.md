# 🎓 Student Grade Management System

A **MERN Stack** based web application to manage student grades efficiently.  
This project allows users to upload **CSV/Excel files** of student marks, process them, and view structured results in a clean UI.

---

## 🌐 Live Demo

- **Frontend:** [Student Grade Management System](https://student-grade-management-system.vercel.app)
- **Backend API:** [Railway Deployment](https://student-grade-management-system-production-ab81.up.railway.app/)

---

## ✨ Features

- 📤 Upload **CSV/Excel files** of student grades.
- 📊 Parse and display data in a structured table.
- 🕒 Stores file upload time (with formatted date & 12-hour time).
- 🗂 Maintains records in MongoDB with schema for filename, columns, and rows.
- ⚡ Fast and responsive frontend with **React + TailwindCSS**.
- 🌍 Backend powered by **Node.js + Express + MongoDB**.
- 🚀 Deployed on **Vercel (Frontend)** and **Railway (Backend)**.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- TailwindCSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose

### Deployment

- Vercel (Frontend)
- Railway (Backend)

---

## 📂 Project Structure

```
Student-Grade-Management-System/
├── backend/     # Express + MongoDB API
├── frontend/    # React + Tailwind frontend
└── .gitignore
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (>=16.x)
- MongoDB (local or Atlas)
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Vedansh404/Student-Grade-Management-System.git
cd Student-Grade-Management-System
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Update backend URL in frontend API calls if running locally:

```js
const API_URL = "http://localhost:5000";
```

Run frontend:

```bash
npm start
```

---

## 🚀 Deployment

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Railway](https://railway.app/)

---

## 📸 Screenshots

(Add screenshots here for better visualization)

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature-xyz`)
3. Commit changes
4. Push and create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

### 👨‍💻 Author

**Vedansh Rashinkar**  
🔗 [GitHub](https://github.com/Vedansh404)  
 [LinkedIn](www.linkedin.com/in/vedansh-rashinkar)

### Demo Video


https://github.com/user-attachments/assets/4de39d57-c533-4bfa-99fa-0e055066ec5d



