import {login, logout, signUp} from "../controllers/user.controller.js"
import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();


//Signup
router.post("/signup", signUp)
router.post("/login/:id", login)
router.get("/logout", isLoggedIn, logout);

export default router;

