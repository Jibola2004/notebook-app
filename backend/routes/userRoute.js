import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js'; // Make sure to include `.js` for ES modules

const userRoutes = express.Router();

userRoutes.post('/register', registerUser); // ✅ fixed
userRoutes.post('/login', loginUser);       // ✅ fixed

export default userRoutes; // Don't forget this if you plan to import it in app.js
