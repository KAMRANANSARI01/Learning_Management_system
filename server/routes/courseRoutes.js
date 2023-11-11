import {Router} from 'express'
import { getAllCourses, getLecturesByCourseId } from '../controller/course.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = Router()

router.get("/", getAllCourses);
router.get("/:id" ,isLoggedIn, getLecturesByCourseId);

export default router;