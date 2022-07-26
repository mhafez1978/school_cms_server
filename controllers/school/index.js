// this is the everything school entity controller

const { Op } = require('sequelize');
const db = require("../../database/db.js");
const School = require("../../models/school/school.js");
const Course = require("../../models/course/course.js");

//creates the table and the associations
const setupSchoolController = (req,res) =>{
	School.hasMany(Course);
	Course.belongsTo(School);

	db.sync({force:true})
	.then(results => {
		res.send("School table was dropped if existed then re-created or if it didn't exist was created OK ...");
	}).catch(err=>{
		console.log(err);
	})
}

// adds your first school to the schools table
const configureSchoolController = async(req,res)=>{
	let schoolName = req.body.schoolName;
	let schoolDescription = req.body.schoolDescription;
	let newCourseTitle = req.body.newCourseTitle;
	let newCourseDescription = req.body.newCourseDescription;
	let newCourseStartDate = req.body.newCourseStartDate;
	let newCourseEndDate = req.body.newCourseEndDate;

	if(schoolName === undefined || schoolName.length === 3){
		res.send('School Name is required ...')
	}
	if(schoolDescription === undefined || schoolDescription.length === 0){
		schoolDescription = ''
	}

	if(newCourseTitle === undefined || newCourseTitle === ""){
		newCourseTitle = '';
	}
	if(newCourseDescription === undefined || newCourseDescription === ""){
		newCourseDescription = '';
	}
	if(newCourseStartDate === undefined || newCourseStartDate === ""){
		newCourseStartDate = Date.now();
	}
	if(newCourseEndDate === undefined || newCourseEndDate === ""){
		newCourseEndDate = Date.now();
	}

	if(schoolName.length > 3 && newCourseTitle.length === 0 ){
		//create school only
		return myschool = await School.create({
			schoolName: schoolName,
			schoolDescription: schoolDescription
		})
		.then(myschool=>{
			res.send({'Created school only': myschool})
		})
		.catch(err=>{
			res.send(err)
		})
	}

	if(schoolName.length > 3 && newCourseTitle.length > 0){
		// create school and course via school
		const mySchool = await School.create({
			schoolName: schoolName,
			schoolDescription:schoolDescription
		})
		.then(async(mySchool)=>{
			const idx = mySchool.dataValues.schoolId
			let mySchoolCourse = await Course.create({
				courseTitle: newCourseTitle,
				courseDescription: newCourseDescription,
				courseStartDate: newCourseStartDate,
				courseEndDate: newCourseEndDate,
				schoolSchoolId: idx
			})
			.then(async(mySchoolCourse)=>{
				await mySchoolCourse.save();
				console.log(mySchool)
				console.log(mySchoolCourse)
				res.send({"School We Created: ": mySchool, "Courses created for this school: ": mySchoolCourse})
			})
			.catch(err=>{
				res.send(err)
			})
		})
		

	}

	// lets see how the info look like coming in 
	
	
	// if you only provide school info and no course 
	// school should be created
	

	//if you provide school and course info 
	// school should be created
	// course with association to school should be created
}

// gets the school info in the school table
const getSchoolInfoController = async(req,res) => {
	const id = req.params.id;
	const mySchool = await School.findOne({
		where:{
			// notice I hard coded 1 here for schoolId since I want only one school setup
			// I dont want to make the software managing more than one school by default.
			schoolId:id
		}
	})
	.then(mySchool=>{
		if(mySchool === null){
			res.send('No school with this Id, or you have not created a School yet. ');
		}else{
			res.send(mySchool);
		}
	})
	.catch(err=>{
		res.send(err);
	})
}

const updateSchoolInfoController = async(req,res) => {
	const id = req.params.id;
	const schoolName = req.body.schoolName;
	const schoolDescription = req.body.schoolDescription;

	if(schoolName !== undefined || schoolDescription !== undefined){
		const data = await School.findOne({
			where: {
				schoolId:id
			}
		})
		.then(data=>{
			if(data !== null){
				data.schoolName = schoolName;
				data.schoolDescription = schoolDescription;
				return data
			}else{
				res.send('No School Found with the given Id ...')
			}
		})
		.then(data=>{
			return newSchool =  data.save();
		})
		.then(newSchool => {
			res.send(newSchool);
		})
		.catch(err=>{
			console.log(err);
			res.send(err);
		})
	}else{
		res.send('Please enter the new info to update ...');
	}

}

// what should we allow admin/principal user to do in School
// 1) they should be able to create, edit or delete a school
// 2) create, edit or delete school a legal name
// 3) create edit or delete school description
// 4) add, modify, delete school address, phone, email for support
// 5) create, edit, delete courses
// 6) create, edit, delete subjects
// 7) add, delete subject from a course
// 8) create classroom
// 9) add classroom to course or assign course to a classsroom
// 10) review student completed registeration and approve student into school
// 11) review teacher application and approve teacher into school as faculty
// 12) assign or remove a teacher from a subject
// 13) assign a student to a course
// 14) a course is a collection of subjects
// 15) each subject needs to validate = 1) student marks from exams + 2) attendance (registered hours student attended per each subject if conditions met student passes subject, when student passes all subjects then they graduate score card will keep track of all subject grades = exam mark + attendance = final grade)

// 16) each classroom has option for remote using zoom integration or on the road classroom like in case of driving school or physical room in building or office 
// 17) each school will have many physical classes , many zoom classes, many road classes (how many ? what are the limits ? )
// 18) lets say a course duration is 4 months and consists of 4 subjects then each subject will take 1 month to complete ... or we should have the duration on the subject then tally the total time needed from all course subjects which then dedctates the entire course duration, meaning if subject is 1 day and we have 4 1 day subjects in one course this means that 1+1+1+1 = 4 days for course to complete ? ....






module.exports = {setupSchoolController, configureSchoolController, getSchoolInfoController, updateSchoolInfoController}