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


// setup routes for School Table
myRouter.put('/setup/school', router.setupSchool);




// setup routes for Courses Table
myRouter.put('/setup/courses', router.setupCourses);

// list all available courses
myRouter.get('/courses', router.courses);
myRouter.get('/courses/:query', router.courses);
myRouter.post('/courses/add', router.courses);
myRouter.patch('/courses/:id', router.courses);
myRouter.delete('/courses/:id', router.courses);





// brings server online
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
	console.log(`SchoolCMS Server >> Running on http://localhost:${PORT}`)
})

