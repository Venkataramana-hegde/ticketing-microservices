# 🎟️ Ticketing Microservices App

A full-featured ticketing platform built with a microservices architecture.  
Users can create, purchase, and manage tickets seamlessly across services.

---

## 🚀 Tech Stack

- 🖥️ Node.js (Express)
- 🐳 Docker
- ☸️ Kubernetes
- 🌐 Nginx Ingress Controller
- 🐘 MongoDB
- 🔥 NATS Streaming Server
- 🛡️ JWT Authentication
- ⚛️ React (Client App)
- 📦 Skaffold (for local Kubernetes dev)

---

## ✨ Core Features

- 🔐 Secure, scalable authentication service
- 🎫 Ticket creation, updating, listing, and deletion
- 🛒 Order creation and expiration handling
- 📢 Real-time event-based communication with NATS
- 🗓️ Expiration service for auto-canceling orders
- 📈 Modular services communicating asynchronously
- 📦 Easy local development with Skaffold and Kubernetes
- 🧹 Graceful shutdowns to avoid message/data loss

---

## 🛠️ Local Setup

Clone the repository:

```bash
git clone https://github.com/your-username/ticketing.git
cd ticketing
# Example for auth service
cd auth
npm install

# Example for client
cd client
npm install

Start your Kubernetes cluster (with Skaffold):
skaffold dev

```
