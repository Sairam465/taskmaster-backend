const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
// Create
router.post('/', async (req,res)=>{
  try{ const task = new Task(req.body); await task.save(); res.status(201).json(task); }
  catch(e){ res.status(400).json({error: e.message}); }
});
// Read all
router.get('/', async (req,res)=>{
  try{
    const q = req.query.q;
    const filter = q ? { $or:[{title:{$regex:q,$options:'i'}},{description:{$regex:q,$options:'i'}}]} : {};
    const tasks = await Task.find(filter).sort({createdAt:-1});
    res.json(tasks);
  } catch(e){ res.status(500).json({error:e.message}); }
});
// Get one
router.get('/:id', async (req,res)=>{
  try{ const t = await Task.findById(req.params.id); if(!t) return res.status(404).json({error:'Not found'}); res.json(t); }
  catch(e){ res.status(500).json({error:e.message}); }
});
// Update
router.put('/:id', async (req,res)=>{
  try{ const u = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json(u); }
  catch(e){ res.status(400).json({error:e.message}); }
});
// Delete
router.delete('/:id', async (req,res)=>{
  try{ await Task.findByIdAndDelete(req.params.id); res.json({success:true}); }
  catch(e){ res.status(500).json({error:e.message}); }
});
module.exports = router;
