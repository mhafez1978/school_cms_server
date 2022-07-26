const controllers = require('../controllers/index.js');

// this is not needed since we will be serving home from react client side
const home = (req,res) => {
	return controllers.homePageController(req,res);
}
// this is not needed since we will be serving about from react client side
const about = (req,res) => {
	return controllers.aboutPageController(req,res);
}

// this is a useful route to handle courses 
// this will send req,res to controller that will handle logic to what we need to do 

const setupSchool = (req,res) => {
	return controllers.setupSchoolController(req,res);
}

const configureSchool = (req,res) => {
	return controllers.configureSchoolController(req,res);
}

const getExistingSchoolInfo = (req,res) => {
	return controllers.getSchoolInfoController(req,res);
}

const updateExistingSchoolInfo = (req,res) => {
	return controllers.updateSchoolInfoController(req,res);
}

const getAllSchools = (req,res) =>{
	return controllers.getAllSchoolsController(req,res);
}

const courses = (req,res)=>{

	// this will only trigger when we call /courses route
	// we will check what http method is used in request
	// based on request type we will call our specific controller
	// controller will handle responding to client request.

	if(req.method === 'GET'){
		// this will call the controller getAllCourses to list available courses
		return controllers.getAllCourses(req,res)
	}
	else if(req.method === 'POST'){
		// this will call the controller addNewCourse to add a new course to our list
		return controllers.addNewCourse(req,res)
	}
	else if(req.method === 'PATCH'){
		// this will call on the controller updateExistingCourse to change course info
		return controllers.updateExistingCourse(req,res)
	}
	else if(req.method === 'DELETE'){
		// this will call on the controller deleteExistingCourse to delete a course from the list
		return controllers.deleteExistingCourse(req,res)
	}
}

const setupCourses = (req,res) => {
	return controllers.setupCoursesController(req,res);
}

module.exports = { home , about, courses, setupSchool, configureSchool, getExistingSchoolInfo,updateExistingSchoolInfo, getAllSchools, setupCourses }