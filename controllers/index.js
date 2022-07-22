const homePageController = require('./home/index.js')
const aboutPageController = require('./about/index.js')
const {getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse} = require('./courses/index.js')

module.exports = { homePageController,aboutPageController, getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse }