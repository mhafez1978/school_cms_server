// this is the everything school entity controller

const { Op } = require('sequelize');
const db = require("../../database/db.js");
const School = require("../../models/school/school.js");
const Course = require("../../models/course/course.js");

const setupSchoolController = (req,res) =>{

	School.hasMany(Course);

	db.sync({force:true})
	.then(results => {
		res.send("School table was dropped if existed then re-created or if it didn't exist was created OK ...");
	}).catch(err=>{
		console.log(err);
	})
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






module.exports = setupSchoolController;