import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notebookRoutes from './routes/notebookRoute.js';
import userRoutes from './routes/userRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use routes

app.use('/api/notebooks', notebookRoutes);
app.use('/api/users',userRoutes)



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
