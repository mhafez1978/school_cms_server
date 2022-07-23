const { Op } = require('sequelize');
const db = require("../../database/db.js");
const Course = require("../../models/courses/courses.js");


// Setup courses controller

const setupCoursesController = (req, res) => {
	db.sync({force:true})
	.then(results => {
		console.log(results);
		res.send("courses table was dropped then re-synced");
	}).catch(err=>{
		console.log(err);
	})
}


// this is the courses controller index 
// this file will house all logic that handles courses
// 
const getAllCourses = async(req,res)=>{
	if(Number(req.params.query) === Number(req.params.query)){
		
		const id = req.params.query;
		const myId = Number(id);
		const data = await Course.findOne({
			where:{
				id: myId
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
		res.send(data);
	}else{
		const slug = req.params.query;
		const data = await Course.findAll({
			where: {
				title:{
					[Op.like]:`%${slug}%`
				}
			}
		})
		.then(data=>{
			if(data){
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
	const title = req.body.title;
	const description =  req.body.description;

	const course = await Course.findOne({
		where: {
			id: `${id}`
		}
	})
	.then(course=>{
		if(title === undefined || description === undefined ){
			res.send("Ops, to update this post you need to enter the values you wish to update")
		}else{
			course.title = `${title}`
			course.description = `${description}`
			return savedCourse = course.save()
		}
	})
	.then(savedCourse=>{
		res.send(savedCourse);
	})
	.catch(err=>{
		console.log(err)
	})
}

const deleteExistingCourse = (req,res)=>{
	console.log(req.params.id)
	res.send('Deleting Existing course...')
}

module.exports = { getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse, setupCoursesController }