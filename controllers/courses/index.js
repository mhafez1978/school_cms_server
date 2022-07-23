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
		const data = await Course.findOne({
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
		console.log("Added Course: ", publishedCourse)
	}).catch(err=>{
		console.log(err)
	})
	res.send('Finished adding new course... from AddNewCourse Controller');
}

const updateExistingCourse = async(req,res)=>{
	let myId = req.params.id;
	myId = Number(myId)
	const data = await Course.findOne({
		where:{
			id: myId
		}
	})
	res.send('data')
}

const deleteExistingCourse = (req,res)=>{
	console.log(req.params.id)
	res.send('Deleting Existing course...')
}

module.exports = { getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse, setupCoursesController }