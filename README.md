**🏥 Priority-Based Patient Queue Management System**
**===========================================================**

A real-time, priority-based hospital queue management system that reduces waiting time and improves patient flow using token-based registration and emergency prioritization.

**📌 Overview**

Hospitals often struggle with long waiting times due to inefficient queue handling. This system provides a smart, real-time queue management solution that prioritizes emergency patients and keeps staff, doctors, and patients updated instantly.

The system uses React, Node.js, MongoDB, and Socket.IO to deliver a smooth and responsive experience.

**✨ Features**

    🎟️ Token-based patient registration

    🚨 Emergency priority handling

    👨‍⚕️ Role-based login (Doctor / Staff)

    ⚡ Real-time queue updates using Socket.IO

    🔄 Current and next patient display

    📺 Live patient display screen

    ⏱️ Average waiting time calculation

    🔐 Secure authentication with JWT

    🎨 Clean and responsive UI (Tailwind CSS)

**👥 User Roles**

  🧑‍💼 Staff
  
      Register patients
      
      Assign emergency priority
      
  <img width="840" height="497" alt="image" src="https://github.com/user-attachments/assets/bf415d1d-3b74-487f-a568-ebd4ae8765b8" />

   
  👨‍⚕️ Doctor
  
      View current and next patient
      
      Complete consultations
      
      View average waiting time


  <img width="838" height="601" alt="image" src="https://github.com/user-attachments/assets/1936785b-c246-4f46-9ad8-84df8804dcec" />


  🧑 Patient Display

      Shows current and next token

      Displays waiting count

       Shows average waiting time
       

  <img width="1374" height="708" alt="image" src="https://github.com/user-attachments/assets/837d7576-6d03-477f-834a-4212cfff821c" />


**🛠️ Technology Stack**

  Frontend
  
    React.js
    Tailwaind CSS

  Backend

      Node.js
      Express.js

  Database

      Mongo DB

  Real-Time Communication

      Socket.IO

  Authentication

      JSON Web Token (JWT)


**🏗️ System Architecture**

              Frontend (React)
                   ↓ REST API
          Backend (Node.js + Express)
                    ↓
              MongoDB Database
                    ↑
    Socket.IO (Real-time updates to all clients)


  •  Frontend communicates with backend using REST APIs

  •  Backend manages data in MongoDB

  •  Socket.IO pushes real-time queue updates

  •  JWT ensures secure role-based access


**💻 Software Requirements**

   •  Node.js (v18+ recommended)

   •  MongoDB (local or cloud)

   •  npm (Node Package Manager)

   •  Web Browser (Chrome / Edge)

  • Visual Studio Code (recommended)


**🚀 Installation & Setup**

  1️⃣ Clone the Repository
  
      git clone https://github.com/your-username/patient-queue-system.git
      
      cd patient-queue-system
      
  2️⃣ Backend Setup

      cd backend
      
      npm install
      
      npm start

   • Backend runs at

      http://localhost:5000

  3️⃣ Frontend Setup

      cd frontend
      
      npm install
      
      npm run dev

   • Frontend runs at

      http://localhost:5173

   • Patient display screen

     http://localhost:5173/display


**🔑 Demo Login Credentials**

  🧑‍💼 Staff

      Username: staff1
      
      Password: staff123

  👨‍⚕️ Doctor

      Username: doctor1
      
      Password: doctor123

  🧑 Patient Display

      👉 Patients can access the display directly without login.
    

**📂 Project Structure**

      patient-queue-system/
      │
      ├── backend/
      │   ├── routes/
      │   ├── models/
      │   ├── controllers/
      │   └── server.js
      │
      ├── frontend/
      │   ├── src/
      │   ├── components/
      │   └── pages/
      │
      └── README.md


**🧪 Testing**

  Basic API and real-time event testing were performed to ensure smooth queue updates and role-based functionality.

**🤝 Contributing**

  Contributions are welcome!

  1. Fork the repository

  2. Create a new branch

  3. Commit your changes

  4. Open a pull request


**⭐ Acknowledgements**

  Built to improve hospital workflow and patient experience through smart queue management.

**📜 License**

  This project is licensed under the MIT License — free to use, modify, and distribute with attribution.
