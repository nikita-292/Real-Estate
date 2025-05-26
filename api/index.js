import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';  
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log("mongo db connected")
}
).catch((err) => {
    console.log(err);
});


const app = express();
app.use(express.json()); // middleware to parse json data from the request body

app.use(cookieParser()); //tpget the info from the cookies that we have stored

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
// just runnug the server


app.use('/api/user', userRouter); // use the user router for the api/user route
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter); // use the listing router for the api/listing route

//middleware error from ip  next call for the next middleware
// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;  // Use logical OR for fallback
  const message = err.message || 'Internal Server Error';  // Fallback message
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

 