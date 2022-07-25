const { DataTypes } = require("sequelize");
const db= require("../../database/db.js");

const Course = db.define("course",{
	courseId:{
		type: DataTypes.INTEGER,
		autoIncrement:true,
		allowNull:false,
		primaryKey: true,
	},
	courseTitle:{
		type: DataTypes.STRING,
		allowNull:false,
	},
	courseDescription:{
		type: DataTypes.STRING,
		allowNull:false,
	},
	courseStartDate:{
		type: DataTypes.DATEONLY,
		allowNull:true,
	},
	courseEndDate:{
		type: DataTypes.DATEONLY,
		allowNull:true,
	}
},{
	onDelete: 'cascade'
})

module.exports = Course