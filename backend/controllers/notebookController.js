import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const getDB = () =>
  open({
    filename: './db/notebooks.db',
    driver: sqlite3.Database,
  });

// GET all notebooks
export const getnotebooks = async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;
    const notebooks = await db.all(`SELECT * FROM notebooks WHERE user_id=?`,id);
    res.json(notebooks);
  } catch (error) {
    res.status(500).json({ error: true, message: 'Failed to retrieve notebooks', details: error.message });
  }
};

// GET a single notebook
export const getnotebook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: true, message: 'id not found.' });
    }

    const db = await getDB();
    const notebook = await db.get(`SELECT * FROM notebooks WHERE id = ?`, id);

    if (!notebook) {
      return res
        .status(404)
        .json({ error: true, message: `Notebook with ID ${id} does not exist.` });
    }

    res.json({ success: true, data: notebook });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Failed to retrieve notebook', details: error.message });
  }
};

// ADD a new notebook
export const addnotebook = async (req, res) => {
  try {
    const { notebook } = req.body;

    if (!notebook) {
      return res
        .status(400)
        .json({ message: 'Request body is empty, no notebook.' });
    }

    const { title, content, date, user_id } = notebook;

    if (!title || !content || !date || !user_id) {
      return res.status(400).json({
        message: 'Invalid input: title, content, date, or user_id is missing.',
      });
    }

    const db = await getDB();
    const existingUser = await db.get(`SELECT * FROM users WHERE id = ?`, [
      user_id,
    ]);

    if (!existingUser) {
      return res.status(404).json({ error: true, message: 'User does not exist.' });
    }

    await db.run(
      `INSERT INTO notebooks (title, content, date, user_id) VALUES (?, ?, ?, ?)`,
      [title, content, date, user_id]
    );

    res.status(200).json({ success: true, message: 'Notebook added successfully.' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Failed to add notebook', details: error.message });
  }
};

// UPDATE notebook (only title and content)
export const updatenotebook = async (req, res) => {
  const db = await getDB();
  try {
    let { notebook_id } = req.params;
    
    const { editedNotebook } = req.body;

    if (!editedNotebook) {
      return res
        .status(400)
        .json({ message: 'Request body is empty, no editedNotebook.' });
    }

    const { title, content } = editedNotebook;


    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Invalid input: title or content is empty.' });
    }
    
    const existingNotebook=await db.get(`SELECT * FROM notebooks WHERE id = ?`,notebook_id);
   
    if(!existingNotebook){
         return res
        .status(400)
        .json({ message: 'Invalid notebook id, it does not exist.' });
    }
    
     
    
    await db.run(
      `UPDATE notebooks SET title = ?, content = ? WHERE id = ?`,
      [title, content, notebook_id]
    );
    const updatedNotebook=await db.get(`SELECT * FROM notebooks WHERE id = ?`,[notebook_id]);

    res.status(200).json({ success: true, message: 'Notebook updated successfully.',updatedNotebook });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Failed to update notebook', details: error.message });
  }
};

// DELETE notebook
export const deletenotebook = async (req, res) => {
  try {
    const { notebook_id } = req.params;

    const db = await getDB();
    await db.run(`DELETE FROM notebooks WHERE id = ?`, [notebook_id]);

    res.status(200).json({ success: true, message: 'Notebook deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Failed to delete notebook', details: error.message });
  }
};
