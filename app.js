const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
const host = 'localhost';

const Sequelize = require('sequelize-cockroachdb');

const fs = require('fs');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Plant = sequelize.define("plants", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lightLevel: {
        type: Sequelize.DECIMAL
    },
    moistureLevel: {
        type: Sequelize.DECIMAL
    }
});

app.post('/api/plants', bodyParser.json(), function (req, res) {
    Plant.sync({
        force: false,
    })
        .then(async function () {
            res.send(await Plant.bulkCreate([
                {
                    timestamp: req.body.timestamp,
                    lightLevel: req.body.lightLevel,
                    moistureLevel: req.body.moistureLevel
                },
            ]));
        })

        .catch(function (err) {
            console.error("error: " + err.message);
        });
})

app.get('/api/plants', (req, res) => {
    Plant.sync({
        force: false,
    })
        .then(async function () {
            plantData = await Plant.findAll();
            console.log(plantData);
            res.send(plantData);
        })
})

app.delete('/api/plants', async (req, res) => {
    res.send(Plant.drop());
});

app.listen(port, host, () => {
    console.log(`Server started at ${host} port ${port}`);
});