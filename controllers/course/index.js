const { reset } = require('nodemon');
const { Op } = require('sequelize');
const db = require("../../database/db.js");
const Course = require("../../models/course/course.js");
const School = require('../../models/school/school.js');


// Setup courses controller
const setupCoursesController = (req, res) => {
	db.sync({force:true})
	.then(results => {
		res.send("courses table was dropped then re-synced");
	}).catch(err=>{
		console.log(err);
	})
}


// this is the courses controller index 
const getAllCourses = async(req,res)=>{
	if(Number(req.params.query) === Number(req.params.query)){
		const id = req.params.query;
		const myId = Number(id);
		const data = await Course.findOne({
			where:{
				courseId: myId
			}
		})
		.then(data=>{
			if(data){
				console.log('Found match to your query: ', data)
				res.send(data)
			}else{
				res.send("No course found with this id ...")
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}else if(req.params.query === undefined){
		const data = await Course.findAll()
		if(data.length === 0){
			res.send('No courses added yet, you should add a course first ...')
		}else{
			res.send(data)
		}
	}else{
		const slug = req.params.query;
		const data = await Course.findAll({
			where: {
				courseTitle:{
					[Op.like]:`%${slug}%`
				}
			}
		})
		.then(data=>{
			if(data.length > 0){
				console.log(data)
				res.send(data)
			}else{
				res.send('No course found matching your query ...')
			}
		})
		.catch(err=>{
			console.log(err)
		})

	}
}

const getCoursesBySchool = async(req,res) => {
	const schoolId = req.params.id;
	return allSchoolCourses = await Course.findAll({
		where:{
			schoolSchoolId: schoolId
		}
	})
	.then(allSchoolCourses=>{
		if(!allSchoolCourses){
			res.sed('School id not found ...')
		}else if(allSchoolCourses.length === 0){
			res.send('no courses found ...')
		}else{
			res.send(allSchoolCourses);
		}
	})
	.catch(err=>{
		res.send(err)
	})
}

const addNewCourse = async(req,res)=>{
	// expecting courseTitle, courseDescription, courseStartDate, courseEndDate from req.body
	const id = req.params.id;
	const title = req.body.courseTitle;
	const description = req.body.courseDescription;
	const start = req.body.courseStartDate
	const end = req.body.courseEndDate;

	const school = await School.findOne({
		where:{
			schoolId: id
		}
	})
	.then(async(school)=>{
		if(!school){
			res.send('Unable to find School matching this Id ...');
		}else{
			if(!title || !description || title === undefined || description === undefined || title.length === 0 || description.length === 0){
				res.send('Ops... \nCourse Title and Course Description are required and/or Cannot be left blank ...')
			}else{
				const course = await Course.create({
					courseTitle:title,
					courseDescription:description,
					courseStartDate: start,
					courseEndDate:end,
					schoolSchoolId:school.schoolId // this can be hard coded to the valueu of 1 if only 1 school
				})
				.then(course=>{
					res.send(course)
				})
				.catch(err=>{
					res.send(err)
				})
			}
			
		}
	})
}

const updateExistingCourse = async(req,res)=>{
	const sid = req.params.id; //school id from req.params
	let cid = req.body.cid; //this is the course id also provided by end user via req.body.cid
	let newTitle = req.body.courseTitle;
	let newDescription =  req.body.courseDescription;
	let newStartDate = req.body.courseStartDate;
	let newEndDate = req.body.courseEndDate;

	const course = await Course.findOne({
		where: {
			[Op.and]: [
				{ schoolSchoolId: `${sid}`},
				{ courseId: `${cid}`}
			  ],
		}
	})
	.then(async(course)=>{
		
		if(!newTitle || newTitle === undefined || newTitle.length === 0){
			// newTitle is not present or blank
			newTitle = course.courseTitle
		}

		if(!newDescription || newDescription === undefined || newDescription.length === 0){
			// newDescription is not present or blank
			newDescription = course.courseDescription
		}

		if(!newStartDate || newStartDate === undefined){
			// newDescription is not present or blank
			newStartDate = course.courseStartDate
		}

		if(!newEndDate || newEndDate === undefined){
			newEndDate = course.courseEndDate
		}
	
		course.courseTitle = newTitle;
		course.courseDescription = newDescription;
		course.courseStartDate = newStartDate;
		course.courseEndDate = newEndDate;
		return await course.save();
	})
	.then((course)=>{
		res.send(course);
	})
	.catch(err=>{
		console.log(err);
	})
}

const deleteExistingCourse = async(req,res)=>{
	const id = req.params.id
	const date = await Course.destroy({
		where:{
			courseId:id
		}
	})
	.then(data=>{
		if(data === 1){
			res.send('Course was deleted successfully ...');
		}else{
			res.send('Either this course was already deleted or, course not found in database that matches with the specified Course Id ...');
		}
		
	})
}



module.exports = { 
	getAllCourses, 
	addNewCourse, 
	updateExistingCourse, 
	deleteExistingCourse, 
	setupCoursesController,
	getCoursesBySchool
}