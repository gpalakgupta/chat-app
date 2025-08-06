import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { Fullname, email, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hshing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            name: Fullname,
            email,
            password: hashedPassword,
        });


        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id,res)
            res.status(201).json({ message: "User registered successfully",newUser })
        }


        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
