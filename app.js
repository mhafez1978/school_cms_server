dotenv = require('dotenv').config();
const express = require('express');
const myRouter = express.Router();
const app = express();
const router = require('./router/index.js');
const bp = require('body-parser')

// middleware
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(myRouter);

// testing routes can call controller 
myRouter.get('/', router.home)
myRouter.get('/about', router.about)


// setup routes for creating the School Table
myRouter.put('/setup/school', router.setupSchool);
// create route to add new school entity in the table above
myRouter.post('/setup/school', router.configureSchool);
// create route to get existing school info
myRouter.get('/setup/school/:id', router.getExistingSchoolInfo);
// create route to modify existing school info 
myRouter.patch('/setup/school/:id', router.updateExistingSchoolInfo);
// create a route to delete the school




// setup routes for Courses Table
myRouter.put('/setup/courses', router.setupCourses);

// list all available courses
myRouter.get('/courses', router.courses);
myRouter.get('/courses/:query', router.courses);
myRouter.post('/courses/add/:id', router.courses);
myRouter.patch('/courses/:id', router.courses);
myRouter.delete('/courses/:id', router.courses);





// brings server online
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
	console.log(`SchoolCMS Server >> Running on http://localhost:${PORT}`)
})

