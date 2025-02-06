const express = require("express");
const router = express.Router();
const coursesController = require("../../app/controllers/Courses/coursesController");

router.get("/", coursesController.index);

module.exports = router;
