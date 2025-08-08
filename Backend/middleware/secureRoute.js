import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const verified = jwt.verify(token, process.env.JWTTOKEN);
        if (!verified) {
            return res.status(403).json({ message: "Invalid token" });
        }
        // logged in user
        const user = await User.findById(verified.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;  
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default secureRoute;
