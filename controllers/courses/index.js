// this is the courses controller index 
// this file will house all logic that handles courses
// 

const getAllCourses = (req,res)=>{
	if(Number(req.params.query) === Number(req.params.query)){
		res.send(req.params)
	}else if(req.params.query === undefined){
		res.send('All courses')
	}else{
		res.send('searching by slug maybe...')
	}
}

const addNewCourse = (req,res)=>{
	res.send('Adding new course...')
}

const updateExistingCourse = (req,res)=>{
	console.log(req.params.id)
	res.send('Updating existing course...')
}

const deleteExistingCourse = (req,res)=>{
	console.log(req.params.id)
	res.send('Deleting Existing course...')
}

module.exports = { getAllCourses, addNewCourse, updateExistingCourse, deleteExistingCourse }