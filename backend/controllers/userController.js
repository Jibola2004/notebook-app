import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { hashPassword, verifyPassword } from '../utilts.js';

const getDB = () =>
  open({
    filename: './db/notebooks.db',
    driver: sqlite3.Database,
  });

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const db = await getDB(); 
    const { username, fullname, password } = req.body; 

    if (!username || !fullname || !password) {
      return res.status(400).json({
        error: true,
        message: 'Invalid username, fullname or password',
      });
    }

    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);

    if (user) {
      return res
        .status(400)
        .json({ error: true, message: 'Username already taken, try another one.' });
    }

    const hashedPassword = await hashPassword(password); 

    await db.run(
      `INSERT INTO users (username, fullname, password) VALUES (?, ?, ?)`,
      [username, fullname, hashedPassword]
    );
    
    const newUser = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);

    const data = {
      id: newUser.id,
      fullname: newUser.fullname,
      username: newUser.username,
    };

    res.status(200).json({ success: true, message: 'User successfully registered.', data });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Registration failed', details: error.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const db = await getDB();
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: true, message: 'Invalid username or password' });
    }

    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);

    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    const confirmPassword = await verifyPassword(password, user.password);

    if (!confirmPassword) {
      return res.status(401).json({ error: true, message: 'Wrong password' });
    }

    const data = {
      id: user.id,
      fullname: user.fullname,
      username: user.username
    };

    res.status(200).json({ success: true, message: 'User logged in successfully', data });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Login failed', details: error.message });
  }
};
