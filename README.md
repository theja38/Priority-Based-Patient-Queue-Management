PRIORITY-BASED PATIENT QUEUE MANAGEMENT SYSTEM
=============================================

1. INTRODUCTION

Hospitals often face long waiting times due to inefficient queue handling.
This project provides a real-time, priority-based patient queue management
system that improves hospital workflow and patient experience.

The system uses token-based registration, emergency prioritization, and real-time updates to manage patient flow effectively.

---------------

2. FEATURES

- Token-based patient registration
- Priority handling for emergency cases
- Role-based login (Doctor, Staff)
- Real-time queue updates using Socket.IO
- Current and next patient display
- Live patient display screen
- Average waiting time calculation
- Secure authentication using JWT
- Clean and responsive UI using Tailwind CSS

-----------

3. USER ROLES

Staff:
- Register patients
- Assign emergency priority

Doctor:
- View current and next patient
- Complete consultations
- View average waiting time

Patient Display:
- Shows current and next token
- Displays waiting count and average waiting time

-------------

4. TECHNOLOGY STACK

Frontend:
- React.js
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Real-Time Communication:
- Socket.IO

Authentication:
- JSON Web Token (JWT)
  
-------------------

5. SYSTEM ARCHITECTURE

- Frontend communicates with backend via REST APIs
- Backend stores data in MongoDB
- Socket.IO provides real-time updates to all clients
- JWT ensures secure role-based access

----------------------

6. SOFTWARE REQUIREMENTS

- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- npm (Node Package Manager)
- Web Browser (Chrome / Edge)
- Visual Studio Code (recommended)

------------------------

7. HARDWARE REQUIREMENTS

- Processor: Intel i3 or higher
- RAM: Minimum 4 GB (8 GB recommended)
- Storage: 10 GB free disk space
- Internet connection

------------------------

8. HOW TO RUN THE PROJECT

Backend:
1. Open terminal
2. Navigate to backend folder
3. Run:
   npm install
   
   npm start

Frontend:
1. Open terminal
2. Navigate to frontend folder
3. Run:
   npm install
   
   npm run dev

Access URLs:
- Frontend: http://localhost:5173
- Patient Display: http://localhost:5173/display
- Backend API: http://localhost:5000

-------------------------

9. FUTURE ENHANCEMENTS

- Appointment scheduling
- SMS / Email notifications
- Multi-doctor support
- Analytics dashboard
- Hospital admin panel

----------------------

10. CONCLUSION

This Priority-Based Patient Queue Management System improves efficiency,
reduces waiting time, and enhances patient satisfaction by using real-time
and priority-based queue handling.

------------------

11. 📜 License

This project is licensed under the MIT License — free to use, modify, and distribute with attribution.

