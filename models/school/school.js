const { DataTypes } = require("sequelize");
const db= require("../../database/db.js");

const School = db.define("school",{
	schoolId:{
		type: DataTypes.INTEGER,
		autoIncrement:true,
		allowNull:false,
		primaryKey: true,
	},
	schoolName:{
		type: DataTypes.STRING,
		allowNull:false,
	},
	schoolDescription:{
		type: DataTypes.STRING,
		allowNull:false,
	}
},{
	onDelete: 'cascade'
})

module.exports = School