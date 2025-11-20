const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err=> console.error('MongoDB connection error:', err));
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);
app.get('/', (req,res)=> res.status(200).send('TaskMaster API'));
app.listen(PORT, ()=> console.log('Server started on', PORT));
