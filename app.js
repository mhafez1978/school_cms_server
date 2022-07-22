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



// brings server online
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
	console.log(`SchoolCMS Server >> Running on http://localhost:${PORT}`)
})

