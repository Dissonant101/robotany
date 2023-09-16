const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

const Sequelize = require('sequelize-cockroachdb');

const fs = require('fs');

var sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: "plants",
    dialectOptions: {
        ssl: {

            //For secure connection:
            ca: fs.readFileSync('certs/root.crt')
                .toString()
        },
    },
    logging: false,
});

const Plant = sequelize.define("plants", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
});

app.listen(port, host, () => {
    console.log(`Server started at ${host} port ${port}`);
});