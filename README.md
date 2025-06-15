# 📝 Notebook App

The **Notebook App** is a full-stack web application that allows users to register, log in, and manage their personal notebooks. Built using **Node.js**, **Express**, and **SQLite**, the app provides a simple and efficient interface for handling notebook data with secure authentication.

---

## 🔧 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** SQLite (lightweight relational database)
- **Authentication:** Basic username/password authentication (with hashing)
- **API Type:** RESTful JSON API

---

## 🔐 Authentication Features

- **User Registration**
  - Sign up with a unique username, full name, and password.
  - Passwords are securely hashed before storage.

- **User Login**
  - Authenticate with username and password.
  - Access is restricted to user-owned notebooks.

- **Protected Routes**
  - Middleware ensures only authenticated users can perform notebook operations.

---

## 📒 Notebook Features

- **Create Notebook**
  - Add a new notebook with a title, content, and creation date.

- **Edit Notebook**
  - Modify the title, content, or date of an existing notebook.

- **Delete Notebook**
  - Remove a notebook permanently.

- **Find Notebook by ID**
  - Retrieve details of a specific notebook.

- **Get All Notebooks**
  - View a list of all notebooks created by the logged-in user.

---
