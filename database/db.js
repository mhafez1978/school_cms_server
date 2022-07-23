const Sequelize = require("sequelize"); //big Sequelize
const config= require("./config.js"); 

const db = new Sequelize("schoolcmstestdb", 'root', '123456789!!!', {
    host: "localhost",
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:1000,
    }

})

module.exports = db;
