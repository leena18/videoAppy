import express from "express";
import {  } from "../controllers/auth.js";
import { register,login } from "../controllers/auth.js";

const router = express.Router();

//create user
router.post("/register",register)

//login
router.post("/login", login)

//google auth
router.post("/google",)

export default router;