const config  = {
    host:`${process.env.HOST}`,
    user: `${process.env.USER}`,
    password:`${process.env.PASSWORD}`,
    db: `${process.env.DB}`,
    dialect:`${process.env.DIALECT}` ,
    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:1000
    }
}

module.exports = config;