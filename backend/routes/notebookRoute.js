import express from 'express';
import {
  addnotebook,
  deletenotebook,
  getnotebook,
  getnotebooks,
  updatenotebook,
} from '../controllers/notebookController.js'; // ✅ Add .js if using ES Modules

const notebookRoutes = express.Router();

// ✅ Use route params when needed
notebookRoutes.get('/getNotebooks/:id', getnotebooks);
notebookRoutes.get('/getNotebook/:id', getnotebook); // 🔧 Add :id
notebookRoutes.post('/createNotebook', addnotebook);
notebookRoutes.put('/updateNotebook/:notebook_id', updatenotebook); // 🔧 Match with controller param
notebookRoutes.delete('/deleteNotebook/:notebook_id', deletenotebook); // 🔧 Match with controller param

export default notebookRoutes; // ✅ Add this to use in app.js
