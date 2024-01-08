import { Router } from "express";
import { contactUs } from "../controller/miscellenious.controller.js";


const router = Router();

router.route('/contact').post(contactUs);

export default router;