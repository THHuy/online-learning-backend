const express = require("express");

const router = express.Router();
const homeController = require("../../app/controllers/home/homeController");
const coursesController = require("../../app/controllers/Courses/coursesController");
const registerController = require("../../app/controllers/Register/registerController");
const loginController = require("../../app/controllers/Login/loginController");
const newPostController = require("../../app/controllers/NewPost/newPostController");
const joinCourseController = require("../../app/controllers/Courses/joinCourseController");
const adminController = require("../../app/controllers/Login/AdminController");
const getAllUserController = require("../../app/controllers/Login/getUserController");
const blogController = require("../../app/controllers/Blog/blogController");
router.get("/", homeController.index);
router.get("/courses", coursesController.index);
router.get("/courses/:id", coursesController.select_id_courses);
router.delete("/deletecourse/:id", coursesController.deleteCourses);
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/post-blog", newPostController.newPost);
router.post("/post-save", newPostController.postSave);
router.post("/join-course", joinCourseController.index);
router.get("/user-join-course", joinCourseController.checkuser);
router.post("/checkUserAdmin", adminController.checkUserAdmin);
router.get("/getAllUser", getAllUserController.getUser);
router.get("/getUser/:id", getAllUserController.getUserId);
router.delete("/deleteUser/:idUser", getAllUserController.deleteUser);
router.put("/updateUser/:idUser", getAllUserController.updateUser);
router.get("/getAllBlogs", blogController.getAllBlog);
router.delete("/deleteBlog/:id", blogController.deleteBlog);
router.get("/getCoursesWithSections", coursesController.getCoursesWithSections);
router.post("/uploadImg", coursesController.uploadimg);
router.post("/addcourse", coursesController.addcourse);
router.put("/editcourse/:id", coursesController.editCourse);
router.get("/UserJoinCourse/:id", joinCourseController.UserJoinCourse);
router.get("/sections", coursesController.sections);
router.post("/Addlessons", coursesController.Addlessons);
router.post("/addSection", coursesController.addSection);
router.get("/getLessonPlay", coursesController.getLessonPlay);
router.get("/search", coursesController.search);
router.get("/getBlogUser/:id", coursesController.getBlogUser);
router.get("/allLesson", coursesController.allLesson);
router.delete("/deleteLesson/:id", coursesController.deleteLesson);
router.delete("/sections/:id", coursesController.deletesections);
module.exports = router;
