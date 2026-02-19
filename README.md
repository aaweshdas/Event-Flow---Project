# EventFlow - University Event Management Portal

EventFlow is a modern, responsive web application designed to help university students and faculty discover, manage, and register for campus events. Built with React and Vite, it features a fluid user interface with smooth animations and intuitive navigation.

## 🚀 Features

- **Event Discovery**: Browse events by category (Academic, Technology, Sports, Cultural, etc.).
- **Smart Filtering**: Filter events by category or search by keywords.
- **Detailed Views**: Comprehensive event details pages with images, descriptions, and venue information.
- **Interactive UI**: Smooth transitions and animations using Framer Motion and GSAP.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (assumed based on class usage) & Custom CSS
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/eventflow.git
    cd eventflow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🔐 Mock Backend & Data

This project currently uses a **Mock API Service** (`src/services/api.js`) to simulate backend interactions. No actual backend server is required to run the frontend.

### 🔑 Test Credentials

To test the authentication features, use the following hardcoded credentials:

| Role | Email |
| :--- | :--- |
| **Student** | `student@aditya.edu` (or any email containing 'student') |
| **Admin** | `admin@aditya.edu` (or any email containing 'admin') |

*Note: The password field in the login form accepts any value.*

### 📂 specific "Backend" Data Structure

The application simulates a database using the `MOCK_SAMPLES` array in `api.js`.

**Event Object Structure:**
```json
{
  "id": "evt-sample-1",
  "title": "Annual Research Symposium",
  "date": "2024-03-15",
  "time": "9:00 AM",
  "venue": "Main Auditorium",
  "category": "Academic",
  "description": "Join us for the Annual Research Symposium...",
  "image": "https://images.unsplash.com/...",
  "capacity": 100,
  "registered": 45
}
```

The `generateEvents` function dynamically creates additional events to populate the UI for testing pagination and scrolling.

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
