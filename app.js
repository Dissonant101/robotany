const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

const Sequelize = require('sequelize-cockroachdb');

const fs = require('fs');

var sequelize = new Sequelize(process.env.DATABASE_URL)

const Plant = sequelize.define("plants", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    timestamp: {
        type: Sequelize.STRING
    },
    lightLevel: {
        type: Sequelize.DECIMAL
    },
    moistureLevel: {
        type: Sequelize.DECIMAL
    }
});

app.post('/api/plants', function (req, res) {
    Plant.sync({
        force: false,
    })
        .then(function () {
            return Plant.bulkCreate([
                {
                    timestamp: req.body.timestamp,
                    lightLevel: req.body.lightLevel,
                    moistureLevel: req.body.moistureLevel
                },
            ]);
        })

        .catch(function (err) {
            console.error("error: " + err.message);
        });
})

app.get('/api/plants', (req, res) => {
    Plant.sync({
        force: false,
    })
        .then(function () {
            return Plant.findAll();
        })
})

app.listen(port, host, () => {
    console.log(`Server started at ${host} port ${port}`);
});