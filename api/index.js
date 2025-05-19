import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("mongo db connected")
}
).catch((err) => {
    console.log(err);
});


const app = express();
app.use(express.json()); // middleware to parse json data from the request body
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
// just runnug the server


app.use('/api/user', userRouter); // use the user router for the api/user route
app.use('/api/auth', authRouter);