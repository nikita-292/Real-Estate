import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("mongo db connected")
}
).catch((err) => {
    console.log(err);
});

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
// just runnug the server


app.use('/api/user', userRouter); // use the user router for the api/user route