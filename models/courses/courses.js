const { DataTypes } = require("sequelize");
const db= require("../../database/db.js");

const Course = db.define("course",{
	id:{
		type: DataTypes.INTEGER,
		autoIncrement:true,
		allowNull:false,
		primaryKey: true,
	},
	title:{
		type: DataTypes.STRING,
		allowNull:false,
	},
	description:{
		type: DataTypes.STRING,
		allowNull:false,
	}
})

module.exports = Course