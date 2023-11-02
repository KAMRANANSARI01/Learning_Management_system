import  {Router}  from "express";
import {register,getProfile,login, logout} from "../controller/userController.js"
const router =Router()

router.post("/register",register)
router.post("/login",login)
// router.post("/logout",logout)
// router.get("/me",getProfile)

export default router;