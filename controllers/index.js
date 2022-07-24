const homePageController = require('./home/index.js');
const aboutPageController = require('./about/index.js');
const setupSchoolController = require("./school/index.js");

const {getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse, setupCoursesController} = require('./course/index.js');

module.exports = { homePageController,aboutPageController, getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse, setupSchoolController, setupCoursesController }