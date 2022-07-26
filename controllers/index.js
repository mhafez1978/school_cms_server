const homePageController = require('./home/index.js');
const aboutPageController = require('./about/index.js');
const {setupSchoolController, configureSchoolController, getSchoolInfoController, updateSchoolInfoController, getAllSchoolsController} = require("./school/index.js");

const {getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse, setupCoursesController, getCoursesBySchool} = require('./course/index.js');

module.exports = { homePageController,aboutPageController, getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse, setupSchoolController, configureSchoolController, getSchoolInfoController, updateSchoolInfoController, getAllSchoolsController, setupCoursesController, getCoursesBySchool }