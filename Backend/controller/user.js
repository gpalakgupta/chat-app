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
            createTokenAndSaveCookie(newUser._id, res)
            res.status(201).json({ message: "User registered successfully", newUser })
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(404).json({ message: "invalid User or password" });
        }
        createTokenAndSaveCookie(user._id, res);
        res.status(201).json({
            message: "User logged in successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logout = async(req,res)=>{
    try{
        res.clearCookie('jwt');
        res.status(200).json({message:"User logged out successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
}