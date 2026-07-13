# 🧠 Nervous System Simulator API

A Full Stack REST API project developed using **Node.js**, **Express.js**, **HTML**, **CSS**, and **JavaScript** as part of the **DecodeLabs Industrial Training Program (Project 2)**.

This project simulates how the human nervous system processes different sensory inputs through a backend API and displays the results on a responsive web interface.

---

## 🚀 Features

- ✅ REST API using Express.js
- ✅ GET & POST Endpoints
- ✅ User Input Validation
- ✅ Human Nervous System Simulation
- ✅ JSON Response Viewer
- ✅ Responsive User Interface
- ✅ API Testing Dashboard
- ✅ Error Handling
- ✅ Server-side Processing

---

## 📂 Project Structure

```
nervous-system-api/
│
├── data/
│   └── nervous-data.json
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

---

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Node.js
- Express.js
- CORS
- Morgan
- Dotenv

---

## 📡 API Endpoints

### GET Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/overview` | Returns the overview of the nervous system |
| GET | `/api/brain` | Returns brain information |
| GET | `/api/neurons` | Returns neuron details |
| GET | `/api/logs` | Returns previous simulation history |

### POST Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stimulate` | Simulates a nervous system response |

### Sample Request

```json
{
    "stimulus": "Fire",
    "location": "hand",
    "intensity": 9
}
```

### Sample Response

```json
{
    "success": true,
    "message": "Simulation Completed Successfully"
}
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Aaabis00/nervous-system-api.git
```

Go to the project folder

```bash
cd nervous-system-api
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

Open in your browser

```
http://localhost:5000
```

---

## 📷 Preview

The project includes:

- Interactive Dashboard
- API Response Viewer
- Nervous System Simulation
- Responsive Layout

---

## 🎯 Learning Outcomes

This project helped in understanding:

- Backend API Development
- REST Architecture
- Express.js
- JSON Data Handling
- Input Validation
- Client-Server Communication
- Node.js Fundamentals

---

## 👨‍💻 Author

**Abhishek Raut**

GitHub: https://github.com/Aaabis00

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to fork it for learning purposes.
