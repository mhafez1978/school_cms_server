require('dotenv').config();
const express = require('express');
const router = express.Router();
const app = express();
const router1 = require('./router1/index.js')

// middleware
app.use(router)
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// testing routes can call controller 
// general flow here is client calls router
// routers redirects to appropriate controller
// controller may communicate with models and return data to client

router.get('/', router1.home)
router.get('/about', router1.about)


// brings server online
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
	console.log(`SchoolCMS Server >> Running on http://localhost:${PORT}`)
})

