<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<h1 align="center">
  🎉 EventFlow
</h1>

<p align="center">
  <b>University Event Management Portal</b>
</p>

<p align="center">
  <i>A modern, responsive web application for discovering, managing, and registering for campus events. Built with React, Vite, and Framer Motion.</i>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-mock-backend--data">Backend Data</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a>
</p>

---

## 📖 About

**EventFlow** is a comprehensive event management solution designed to bridge the gap between campus organizers and students. It provides a sleek, animated interface for browsing events, filtering by categories, and managing registrations.

> 💡 This project uses a **Mock API Service** to simulate backend interactions, making it easy to run and test without a server setup.

---

## ✨ Features

### 👨🎓 Student Features
| Feature | Description |
|---------|-------------|
| 📅 **Event Discovery** | Browse campus events with rich details and images |
| 🔍 **Smart Search** | filter events by category (Academic, Sports, Cultural) or keywords |
| 📝 **Registration** | One-click registration for workshops and seminars |
| 📱 **Responsive UI** | Seamless experience across mobile, tablet, and desktop |

### 🔐 Application Features
| Feature | Description |
|---------|-------------|
| 🎨 **Modern Design** | Glassmorphism effects and smooth transitions |
| ⚡ **Performance** | Blazing fast load times powered by Vite |
| 🎬 **Animations** | Interactive elements using Framer Motion & GSAP |
| 🛡️ **Mock Auth** | Simulated login for Student and Admin roles |

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Animation** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide_React-F05032?style=flat-square&logo=lucide&logoColor=white) |

---

## 🏗️ Project Structure

```
EventFlow/
│
├── 📂 public/               # Static assets
├── 📂 src/
│   ├── 📂 assets/           # Images and icons
│   ├── 📂 components/       # Reusable UI components
│   │   ├── 📂 ui/           # Generic UI elements (Card, Button)
│   ├── 📂 context/          # React Context (EventContext)
│   ├── 📂 pages/            # Page components (Events, EventDetails)
│   ├── 📂 services/         # Mock API logic (api.js)
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Entry point
│
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── vite.config.js           # Vite configuration
```

---

## 🔐 Mock Backend & Data

The application simulates a backend using `src/services/api.js`. This file contains the logic for data retrieval, filtering, and authentication.

### 🔑 specific "Backend" Data Structure

The database is simulated using an array of objects (`MOCK_SAMPLES`), which are manipulated in memory.

**Event Object Model:**
```json
{
  "id": "evt-sample-1",
  "title": "Annual Research Symposium",
  "date": "2024-03-15",
  "time": "9:00 AM",
  "venue": "Main Auditorium",
  "category": "Academic",
  "description": "Event detailed description...",
  "image": "https://images.unsplash.com/photo-...",
  "capacity": 100,
  "registered": 45
}
```

> The `generateEvents` function in `api.js` creates additional mock events to simulate a populated database for testing pagination.

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | 16+ |
| **npm** | 8+ |

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/aaweshdas/Event-Flow---Project.git
cd Event-Flow---Project/Frontend/EventFlow
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the development server**
```bash
npm run dev
```

**4. Build for production**
```bash
npm run build
```

---

## 🔑 Usage

To verify different roles and permissions, use the following test credentials:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| 👨🎓 **Student** | `student@aditya.edu` | *Any* | Browse, Filter, Register |
| 🛡️ **Admin** | `admin@aditya.edu` | *Any* | User Management (Simulated) |

> **Note**: The login system accepts any password for demonstration purposes.

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨💻 Author

**EventFlow Team**

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Made with React">
  <img src="https://img.shields.io/badge/Built%20with-❤️%20-red?style=for-the-badge" alt="Built with Love">
</p>
