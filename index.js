import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config'
import taskRoute from './Routes/task.js';
import authRoute from './Routes/auth.js';
import userRouter from './Routes/user.js';

const app = express();
const PORT = 4000;

app.use(morgan("tiny"))
app.use(express.json())

mongoose.connect(process.env.MONGOBD_URL).then(() => {
    console.log("Mongo DB Connected!")
}).catch((e) => {
    console.error('error in mongodb connection!:', e)
})

app.use("/task", taskRoute);
app.use("/auth", authRoute);
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("Your Express API is working!");
});


app.listen(PORT, () => {
    console.log("Server is Rinning on PORT :" + PORT )
})