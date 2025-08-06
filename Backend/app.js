import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import user from "./route/user.js";

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

//  Middleware
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      dbName: 'chat-baat'
    });
    console.log("MongoDB connected locally");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
};

connectDB();

// Routes
// http://localhost:3000/user/signup
// http://localhost:3000/user/login
// http://localhost:3000/user/loout

// 
app.use("/user", user);

app.get('/', (req, res) => {
  res.send("munni badman ho rhi hai");
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
