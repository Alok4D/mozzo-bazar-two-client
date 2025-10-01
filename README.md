# 🍽️ Mozzo Bazar

Mozzo Bazar is a modern and responsive **restaurant web application frontend** built with React and Tailwind CSS.  
The design is inspired by **Figma**, featuring an elegant UI for browsing menus, placing orders, and managing reservations.  

---

## 🚀 Features
- 🏠 **Responsive UI** – Mobile-first, works across all devices  
- 📋 **Menu Display** – Browse categorized food items with images, prices, and details  
- 🛒 **Cart System** – Add/remove items and manage cart in real time  
- 📅 **Reservation UI** – User-friendly reservation form  
- ⭐ **Wishlist** – Save favorite items for later (UI only)  
- 🌗 **Dark/Light Mode** – Smooth theme toggle with persistence  
- 🔐 **Authentication** – Login/Register pages integrated with Firebase (optional)  
- 👥 **Role Management** – Separate dashboards for **User** and **Admin**  

---

## 👥 Role Management

Mozzo Bazar has **two types of roles** in the web application:

### 🔹 1. User Role
- Browse menu & add items to cart  
- View and manage personal cart  
- View payment history  
- Post reviews  
- Access **User Dashboard**  

👉 **Demo Login (User):**  
Email: `mozzouser@gmail.com`  
Password: `@MozzoUser1`  

---

### 🔹 2. Admin Role
- Full access to **Admin Dashboard**  
- Add new items  
- Manage/edit/delete menu items  
- View all users and manage their roles  
- Track orders and system overview  

👉 **Demo Login (Admin):**  
Email: `mozzoadmin@gmail.com`  
Password: `@MozzoAdmin1`  

---

## 🛠️ Tech Stack
- **Framework:** React (Vite)  
- **Styling:** Tailwind CSS, DaisyUI  
- **Routing:** React Router DOM  
- **State Management:** React Context / useState  
- **Animations:** Framer Motion (optional)  
- **Deployment:** Vercel / Netlify  

---

## 📂 Project Structure
```
mozzo-bazar/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons
│   ├── components/      # Reusable components
│   ├── layouts/         # Main layouts (Navbar, Footer, etc.)
│   ├── pages/           # Page components (Home, Menu, Cart, Login)
│   ├── routes/          # Router setup
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── .env.example         # Example environment file
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind config
├── vite.config.js       # Vite config
└── README.md            # Documentation
```

---

## ⚡ Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/Alok4D/mozzo-bazar-two-client
   cd mozzo-bazar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root folder:
   ```env
   VITE_API_URL=https://your-api-endpoint.com
   VITE_FIREBASE_API_KEY=yourFirebaseKey
   ```

4. **Run the project**
   ```bash
   npm run dev
   ```

---

## 🌍 Live Demo
🔗 [Visit Website](https://mozzo-bazar.vercel.app/)

---

## 👨‍💻 Author
- **Alok**  
  📧 alokroy602701@gmail.com  
  🔗 [Portfolio](https://alok-roy-portfolio.vercel.app/)  
  🐙 [GitHub](https://github.com/Alok4D)