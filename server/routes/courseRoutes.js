import { Router } from "express";
import {
  addLecturesToCourseById,
  createCourse,
  getAllCourses,
  getLecturesByCourseId,
  removeCourse,
  updateCourse,
} from "../controller/course.controller.js";
import { authorizedRole, isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses) //for user to get course
  .post(
    isLoggedIn,
    authorizedRole("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  ); //for admin to create course

router
  .route("/:id")
  .get(isLoggedIn, getLecturesByCourseId) //for user to after login fetch course lecture
  .put(isLoggedIn, authorizedRole("ADMIN"), updateCourse) //for admin to update course
  .delete(isLoggedIn, authorizedRole("ADMIN"), removeCourse) //for admin to delete course
  .post(
    isLoggedIn,
    authorizedRole("ADMIN"),
    upload.single("lecture"),
    addLecturesToCourseById
  ); //for adding lectures in course by admin

export default router;
