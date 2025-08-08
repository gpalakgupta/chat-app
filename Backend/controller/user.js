import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
        });


        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res)
            res.status(201).json({
                message: "User registered successfully", user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            })
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

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}



export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id; // ✅ lowercase "user"
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json({ filteredUser });
    } catch (err) {
        console.log("err in all users controller: " + err);
        res.status(500).json({ message: "Server error" });
    }
};
