import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import user from "./route/user.js";




const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI

try {
    mongoose.connect(URI)
    console.log("Mongo db connected");
}
catch (err) {
    console.log(err);
}

app.use("/user",user);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})