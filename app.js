const dotenv = require('dotenv');
const express = require('express');
const myRouter = express.Router();
const app = express();
const router = require('./router/index.js')

dotenv.config();

// middleware
app.use(myRouter);
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// testing routes can call controller 
// general flow here is client calls router
// routers redirects to appropriate controller
// controller may communicate with models and return data to client

myRouter.get('/', router.home)
myRouter.get('/about', router.about)


// let the fun begin
// create a route to add a school 
// each school will have classes
// classes will be taught by teachers
// teachers will teach class subjects to students
// students will register to classes
// teachers will create exams 
// exams will be graded and results or score added to student score card

// list all available courses
myRouter.get('/courses', router.courses)
// this will handle both get by id and get by slug 
// i check query if its a empty then we list all courses
// if query is number I check for course by id
// if query is not empty and not a number then I use as slug
myRouter.get('/courses/:query', router.courses)

myRouter.post('/courses/add', router.courses)
myRouter.patch('/courses/:id', router.courses)
myRouter.delete('/courses/:id', router.courses)

// brings server online
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
	console.log(`SchoolCMS Server >> Running on http://localhost:${PORT}`)
})

