import Course from "../models/courseSchema.js";
import AppError from "../utils/error.utils.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";

//******for getting all courses details*****************//
const getAllCourses = async function (req, res, next) {
  try {
    const courses = await Course.find({}).select("-lectures");
    
    res.status(200).json({
      success: true,
      message: "All courses are fetched",
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//*********for getting particular course's lectures *****************//
const getLecturesByCourseId = async function (req, res, next) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("course id not found", 400));
    }

    res.status(200).json({
      success: true,
      message: " course lectured are fetched successfully",
      lecture: course.lectures,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//*************creating a new course data by admin*******************//
const createCourse = async function (req, res, next) {
  try {
    const { title, description, createdBy, category } = req.body; //this information will be taken by the admin while creatin the course.

    if (!title || !description || !createdBy || !category) {
      return next(new AppError("All feilds are mandatory."), 400);
    }

    //creatin instance for saving into the database
    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "dummy",
        secure_url: "dummy",
      },
    });
    if (!course) {
      return next(
        new AppError("Course could not created, please try again."),
        400
      );
    }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);

      await course.save();

      res.status(200).json({
        success: true,
        message: "Course created successfully.",
        course,
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }
};

//*************updating course data by admin*******************//

const updateCourse = async function (req, res, next) {
  try {
    const { id } = req.params;
    //after getting id we use the findByIdAndUpdate method is contains three things first- id , second -update data , third- runvalidator check the data u are providing is correct or not
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body, //  things we want to update we write in req.body and $set function will update all that is given in req.body
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Course not found with this id", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//*************deleting course data by admin*******************//

const removeCourse = async function (req, res, next) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course not found with this id", 400));
    }
    //remove course after finding by id
    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//*************adding lectures in course by admin*******************//

const addLecturesToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new AppError("All fields are required.", 403));
    }
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("course not found related to this id", 403));
    }

    const lectureData = {
      title,
      description,
      lecture: {},
    };

    //for img/video upload

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });

        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        console.log(error);
        return next(new AppError("error.message", 403));
      }
    }

    course.lectures.push(lectureData);

    course.numbersOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "lectures added successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError("error.message", 403));
  }
};

//*************removing lectures in course by admin*******************//

const removeCourseLecture = async (req, res, next) => {
  try {
    const {id} = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("course not found related to this id", 403));
    }
    lectureId = await course.lectures.id;
    await Course.findByIdAndDelete(lectureId)

    await course.save()
    res.status(200).json({
      success: true,
      message: "lectures deleted successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError("error.message", 403));
  }
};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLecturesToCourseById,
  removeCourseLecture,
};
