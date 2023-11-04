import  {Router}  from "express";
import {register,getProfile,login, logout} from "../controller/userController.js"
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router =Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/me",isLoggedIn,getProfile)

export default router;