# 🚀 Blog Management System API

This is a full-stack backend project for a Blog Management System built with **Node.js, Express.js, and MongoDB**. It features secure user authentication and complete CRUD operations.

## ✨ Features
* **User Authentication:** Secure Login and Registration using JWT.
* **Blog Operations:** Users can Create, Read, Update, and Delete blogs.
* **Security:** Update and Delete operations are restricted only to the owner of the blog.
* **Input Validation:** Required fields and proper error handling.

## 🛠️ Technologies Used
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Auth:** JSON Web Token (JWT)
* **Tool:** Postman (for testing)

## 📡 API Endpoints

### Authentication
* `POST /api/auth/register` - Create a new user.
* `POST /api/auth/login` - Login and get token.

### Blogs
* `GET /api/blogs` - Fetch all blogs (Public).
* `POST /api/blogs/create` - Create a blog (Private).
* `PUT /api/blogs/:id` - Update own blog (Private).
* `DELETE /api/blogs/:id` - Delete own blog (Private).

## 🚀 How to Run Locally
1. Clone the repository.
2. Run `npm install`.
3. Set up your `.env` file with `MONGO_URI` and `JWT_SECRET`.
4. Run `npm run dev` to start the server.

---
Developed by **Farhana Khatun** 💻