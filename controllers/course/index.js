const { Op } = require('sequelize');
const db = require("../../database/db.js");
const Course = require("../../models/course/course.js");


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

const addNewCourse = async(req,res)=>{
	// expecting courseTitle, courseDescription, courseStartDate, courseEndDate from req.body
	const newCourse = req.body;
	const publishedCourse = await Course.create(newCourse)
	.then(publishedCourse=>{
		res.send(publishedCourse)
	}).catch(err=>{
		console.log(err)
	})
	
}

const updateExistingCourse = async(req,res)=>{
	const id = req.params.id;
	const title = req.body.courseTitle;
	const description =  req.body.courseDescription;
	const startDate = req.body.courseStartDate;
	const endDate = req.body.courseEndDate;

	const course = await Course.findOne({
		where: {
			courseId: `${id}`
		}
	})
	.then(course=>{
		if(title === undefined || description === undefined || startDate === undefined || endDate === undefined ){
			res.send("Ops, to update this post you need to enter all the required values to update ...")
		}else{
			course.courseTitle = `${title}`;
			course.courseDescription = `${description}`;
			course.courseStartDate = `${startDate}`;
			course.courseEndDate = `${endDate}`;
			return savedCourse = course.save();
		}
	})
	.then(savedCourse=>{
		res.send(savedCourse);
	})
	.catch(err=>{
		console.log(err)
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
			res.send('Either this course was already deleted or, course not found with the specified Id ...');
		}
		
	})
}

module.exports = { 
	getAllCourses, 
	addNewCourse, 
	updateExistingCourse, 
	deleteExistingCourse, 
	setupCoursesController
}