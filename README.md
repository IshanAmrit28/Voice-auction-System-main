# 🗣️ Nexus Auctions – Voice-Based Auction Platform

> 🎙 Navigate, search, and manage auctions using just your **voice**.  
> 🧭 Press **`/`** for quick navigation and command search across the site.

🌐 **Live Site:** ([https://voice-auction.vercel.app](https://voice-auction-system.vercel.app/))

---

## 🚀 What is Nexus Auctions?

Nexus Auctions is a **voice-first auction platform** powered by **OmniDimension Voice AI**. It allows users to:

- 🔍 Discover auctions
- 🛠️ Create listings
- 📢 Get item details  
—all using just **spoken commands**.

This is the next generation of hands-free bidding platforms, blending modern web development with conversational AI.

---

## ✨ Features

- 🎤 Voice-controlled interface powered by **OmniDimension**
- 🧠 Trained AI that guides users through all flows using real-time prompts
- 📦 View auction items and details using voice
- 📝 Create new auction posts hands-free
- 🔐 Simple voice agent-based routing, flow control, and error handling
- 🔍 Use `/` command for instant navigation and auction search

> ⚠️ **Note:** Voice-based bid placement is **coming soon**! The command exists but the API is not yet live.

---

## 📦 API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/api/auctions`             | Get all auctions                   |
| GET    | `/api/auction/:id`          | Get single auction                 |
| POST   | `/api/auction`              | Create new auction                 |
| POST   | `/api/auction/:id/bid`      | ⚠️ *Coming Soon: Voice Bid Support*|

---

## 💻 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org)
- **Backend:** [Express.js](https://expressjs.com)
- **Cloud Deployment:**  
  - 🖥️ AWS EC2 – hosts and runs the backend server  
  - ☁️ AWS API Gateway – securely exposes all API endpoints  
- **Voice AI:**  
  - 🧠 OmniDimension AI Agent  
  - Integrated via widget  
  - Manages full site voice flows through training and custom instructions

---

## 🧠 Voice Flow Highlights

- The agent begins with a warm greeting
- Offers a voice menu:  
  1️⃣ View Available Auctions  
  2️⃣ Create a New Auction  
- Follows up by collecting auction details (title, description, starting bid, etc.)
- Gives real-time item updates:  
  _"The Rolex watch is golden in color with ₹7000 as the current bid..."_
- Handles "Thank you" gracefully:  
  _"You're welcome! Let me know if you'd like to do anything else."_

---

## 🖼 UI Preview

![image](https://github.com/user-attachments/assets/4d45ef69-7653-476d-8aec-6bb6a6a84f20)
  
![image](https://github.com/user-attachments/assets/594b2114-d865-4bef-979c-06486083764f)

![image](https://github.com/user-attachments/assets/b66aa028-167b-4f1f-b320-34374215795c)
  
![image](https://github.com/user-attachments/assets/50ea9dd0-c36a-42f8-8da2-9844cb903016)

![image](https://github.com/user-attachments/assets/93dba6ad-e7a8-458c-930e-e5fd6b15ad72)


## AWS Server and API 

![image](https://github.com/user-attachments/assets/1563de90-c365-47b2-9ced-a624912789fe)

## Demo Video

https://www.linkedin.com/posts/ishant-gupta-138726250_codeclashhackathon-voiceai-nextjs-activity-7343506697316884482-2XiZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4LHzwB3BLKom_VlIPDLrlBMbToQgOZ4_M


---

## 🗣 Example Voice Commands

> "Create a new auction"  
> "Show me all available items"  
> "Tell me about the Ferrari listing"  
> "Thank you"  
> "What is my highest bid?" ➝ _Coming Soon_

---

## 🧭 Quick Navigation

> Press **`/`** on the website to access the command center.  
> Use it to quickly search, navigate to sections, or trigger voice-based actions instantly.

---

## 📌 Coming Soon

- 🔊 Voice-based bid placement via `/api/auction/:id/bid`
- 🔐 Personalized voice profiles
- 🧾 Bid history & voice activity log

---

## 📎 Project Summary

Nexus Auctions is a futuristic voice-first web platform that transforms the way users interact with auctions. Powered by OmniDimension Voice AI, the platform offers a seamless, hands-free experience where users can search, create, and manage auctions using natural voice commands.

Designed with accessibility, speed, and modern UX in mind, Nexus Auctions eliminates the need for traditional navigation or typing—users simply speak to perform actions. Whether it's listing a new product, checking bids, or exploring live items, the system handles everything through an intelligent, conversational agent.

The project showcases full-stack integration with real-time voice workflows, RESTful API endpoints, and a visually engaging interface, making it a pioneer in voice-enabled e-commerce platforms.

---

## 🔗 Website Link

👉 [[https://voice-auction.vercel.app](https://voice-auction.vercel.app)](https://voice-auction-system.vercel.app/)

---
