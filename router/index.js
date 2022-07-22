const controllers = require('../controllers/index.js')

const home = (req,res) => {
	return controllers.homePageController(req,res)
}

const about = (req,res) => {
	return controllers.aboutPageController(req,res)
}

module.exports = { home , about }