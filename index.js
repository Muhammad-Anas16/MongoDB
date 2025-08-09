import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import taskRoute from './Routes/task.js';
import authRoute from './Routes/auth.js';
import userRouter from './Routes/user.js';
import cors from 'cors';

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use(cors({
    origin: `*`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongo DB Connected!"))
    .catch((e) => console.error('MongoDB connection error:', e));

app.use("/task", taskRoute);
app.use("/auth", authRoute);
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("Your Express API is working!");
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/:`);
    });
}

export default app;