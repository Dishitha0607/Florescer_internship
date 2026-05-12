# KAIZEN 

KAIZEN is a web-based idea management platform that enables employees to submit innovative ideas and continuous improvement suggestions within an organization. Administrators can review, evaluate, rate, and approve these ideas, while employees can track progress and submit implementation details for approved KAIZEN initiatives.

---

# ✨ Features

## 👨‍💼 Employee Dashboard

* Submit new ideas and improvement suggestions
* Edit ideas before forwarding to Admin
* Track idea status in real time
* View accepted, pending, and forwarded ideas
* Receive ratings and feedback from Admin
* Submit KAIZEN implementation details
* Upload implementation proof images
* Track KAIZEN approval progress

### Dashboard Summary

* **Total Ideas**
* **Pending**
* **Accepted**
* **Forwarded**

---

## ⭐ Employee Ratings

Employees can view their accumulated star ratings based on idea evaluations provided by the Admin.

---

## 🛠️ Admin Dashboard

* Review forwarded employee ideas
* Accept or reject ideas
* Provide ratings and feedback
* Review KAIZEN implementation submissions
* Approve or reject KAIZEN implementations

### Dashboard Summary

* **Total Ideas**
* **Pending**
* **Accepted**
* **Rejected**

---

# 🧰 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* JavaScript

## Backend

* FastAPI
* Python

## Database

* MySQL

---

# 📂 Project Structure

```txt
KAIZEN/
│
├── backend/
│   ├── database/
│   │   └── db.py
│   │
│   ├── models/
│   │   └── schemas.py
│   │
│   ├── routes/
│   │   ├── admin_routes.py
│   │   ├── auth_routes.py
│   │   ├── idea_routes.py
│   │   └── kaizen_routes.py
│   │
│   ├── services/
│   │   ├── admin_services.py
│   │   ├── auth_service.py
│   │   ├── idea_services.py
│   │   └── kaizen_services.py
│   │
│   ├── uploads/
│   └── main.py
│
├── frontend/
│   └── src/
│       ├── assets/
│       │
│       ├── components/
│       │   ├── admin/
│       │   ├── employee/
│       │   ├── Button.jsx
│       │   ├── Logout.jsx
│       │   ├── Navbar.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── ThemeToggle.jsx
│       │
│       ├── pages/
│       |   ├── Admin.jsx
|       |   ├──Login.jsx
│       |   └── Employee.jsx
│       │
│       ├──App.css
|       ├──App.jsx
|       ├──index.css
|       └──main.jsx
│        
│
└── README.md
```

---

# ▶️ Running the Project

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Sample Login Credentials

## Employee

```txt
Email: emp@test.com
Password: 5678
```

## Admin

```txt
Email: admin@test.com
Password: 5678
```

---

# 🚀 Future Improvements

* JWT Authentication
* Email Notifications
* Analytics Dashboard
* Enhanced File Management

---

# 📖 About KAIZEN

The word **KAIZEN** means:

> *“Continuous Improvement”*

This platform encourages employees to contribute small but meaningful improvements that collectively enhance productivity, efficiency, and innovation within an organization.

---

# ✨ Author
Dishitha V


Developed using React, FastAPI, and MySQL as a KAIZEN Idea Management System.
