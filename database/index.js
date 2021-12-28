var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    DB = "postgres",
    USER = "postgres",
    PASSWORD = "MTX$2021",
    {
        host : "localhost",
        dialect : "postgres",
    },
    pool = {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
);

sequelize.sync();
(async() => {
    try{
        //checking if connection is okay
        await sequelize.authenticate();
        console.log("Database connection established successfully!!!")
    }catch(error){
        console.log("Unable to connect to database due to " + error.message);
    }
})();

module.exports = sequelize;