# 🔗 LinkSpin - Micro-SaaS Link Analytics Dashboard

A full-stack mini Bitly clone that allows users to shorten URLs and track their performance through analytics — including total clicks, devices, browsers, and timestamps. Built with React, Node.js, Express, and MongoDB.

---

## 🧩 Project Brief

This Micro-SaaS project allows users to:
- Shorten URLs (with optional custom alias & expiration date)
- Track performance of links
- View analytics with charts and tables
- Generate QR codes for links

---

## 🚀 Live Demo

- 🌐 **Frontend**: [https://linkspin.vercel.app](https://linkspin.vercel.app)  
- 🔗 **Shortened URL Format**: `https://linkspin.onrender.com/<shortcode>`

---

## 🔐 Test Login

- Email: intern@dacoid.com
- Password: Test123


---

## ✅ Features

### Core

- **Authentication** using JWT (email/password)
- **Create short links** with:
  - Optional custom alias
  - Optional expiration date
- **Analytics Dashboard**:
  - Original & short URLs
  - Total clicks
  - Created & expiration date
  - Click chart over time
  - Device and browser breakdown
- **Redirection & Async Logging**:
  - Logs IP, device, browser, and timestamp

### Bonus

- ✅ **QR Code** for every link  
- ✅ **Pagination & Search** in the dashboard

---

## 🛠️ Tech Stack

### Frontend (Client)
- React.js
- Redux Toolkit
- Tailwind CSS
- Recharts

### Backend (Server)
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for auth
- NanoID for short codes
- UserAgent & Request-IP for analytics


---

## ⚙️ Environment Variables

Create two `.env` files:

### `server/.env`

### `client/.env`

- refer .env.example

---

## 🧪 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/sahilwarkhade/shortURL-service.git
cd shortURL-service

### 2. Install Dependencies
cd server && npm install
cd ../client && npm install


### 4. Start Development Servers
# In one terminal
cd server
npm start

# In another terminal
cd client
npm run dev





