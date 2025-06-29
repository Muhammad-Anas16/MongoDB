import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        task: String,
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Task = mongoose.model("Tasks", TaskSchema);

export default Task;