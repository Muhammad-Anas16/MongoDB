import express from 'express'
const taskRoute = express.Router()
import Task from '../Models/Task.js';
import ResFunc from '../ResFunc/ResFunc.js';

taskRoute.post("/", async (req, res) => { // Add Data
    const { task } = req.body;
    let newTask = new Task({ task });
    newTask = await newTask.save()
    ResFunc(res, 201, false, newTask, "Task Added Successfully!")
})

taskRoute.get("/", async (req, res) => { // Get All Data
    let tasks = await Task.find()
    ResFunc(res, 200, false, tasks, "Task Fetched Successfully!")
})

// taskRoute.get("/:id", async (req, res) => { 
//     const task = await Task.findById(req.params.id);
//     if (!task) return ResFunc(res, 404, true, null, "Task Not Found!");
//     ResFunc(res, 200, false, task, "Task Fetched Successfully!");
// })

taskRoute.put("/:id", async (req, res) => { // Update Data
    const { task, completed } = req.body;
    const taskFromDb = await Task.findById(req.params.id);
    if (!taskFromDb) return ResFunc(res, 404, true, null, "Task Not Found For Update!");

    if (task) taskFromDb.task = task;
    if (completed) taskFromDb.completed = completed;
    await taskFromDb.save()
    ResFunc(res, 200, false, taskFromDb, "Task Update Successfully!");
})

taskRoute.delete("/:id", async (req, res) => { // Delete Data
    const taskFromDb = await Task.findById(req.params.id);
    if (!taskFromDb) return ResFunc(res, 404, true, null, "Task Not Found For Delete!");

    await Task.deleteOne({_id: req.params.id})
    ResFunc(res, 200, false, null, "Task Delete Successfully!");
})


export default taskRoute;