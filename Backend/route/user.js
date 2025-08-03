import express from "express";
import { signup } from "../controller/user.js";

const router = express.Router();

router.post("/signup",(res,req)=>{
    res.send("signup is working");
});

export default router;
