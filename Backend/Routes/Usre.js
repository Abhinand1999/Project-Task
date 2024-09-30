import express from "express";
import {UserLogin,UserRegister} from '../Controllers/UserCtroller.js'
const router = express.Router();
router.post("/signup", UserRegister);
router.post("/login", UserLogin);



export default router;