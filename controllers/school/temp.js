const School = require("../../models/school/school");

// adds your first school to the schools table
const configureSchoolController = async(req,res)=>{
	const {
		schoolName,
		schoolDescription,
		newCourseTitle,
		newCourseDescription
	} = req.body;

	let newCourse = {}

	if(newCourseTitle === '' || newCourseTitle === undefined || newCourseDescription === '' || newCourseDescription === undefined){
		newCourse = { courseTitle:"default", courseDescription:"default description ... " };
	}else{
		newCourse = { courseTitle:newCourseTitle, courseDescription: newCourseDescription};
	}

	const mySchool = await School.create({
		schoolName: schoolName,
		schoolDescription: schoolDescription
	})
	.then(mySchool=>{
		const myCourse = mySchool.create({courseTitle: newCourseTitle, courseDescription: newCourseDescription})
		res.send(myCourse)
	})
	.catch(err=>{
		res.send(err)
	})
}