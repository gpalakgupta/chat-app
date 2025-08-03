import e from "express";
import User from "../models/user_model.js";

export const signup = (res, req) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        if (password != confirmpassword) {
            return res.status(400).json({ message: "Password do not match" });
        }
        const user = User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const newUser = new User({
            name,
            email,
            password,
        })
        newUser.save().then(() => {
            res.status(201).json({ message: "user registered successfully" })
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:"Sserver error"})
    }
}