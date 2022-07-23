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
			res.send(data)
		})
		.catch(err=>{
			console.log(err)
		})
	}else if(req.params.query === undefined){
		res.send('All courses should be listed here , this is from the getAllCourses controller');
	}else{
		res.send('searching by slug maybe...')
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