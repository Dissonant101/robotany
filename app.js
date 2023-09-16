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
    name: {
        type: Sequelize.STRING,
    },
    isWatering: {
        type: Sequelize.BOOLEAN,
    },
})

const PlantData = sequelize.define("plant-data", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    lightLevel: {
        type: Sequelize.DECIMAL
    },
    moistureLevel: {
        type: Sequelize.DECIMAL
    }
});

app.put('/api/plants', bodyParser.json(), (req, res) => {
    Plant.sync({
        force: false,
    })
        .then(async () => {
            res.send(await Plant.update(
                { isWatering: req.body.isWatering }, {
                where: {
                    name: req.body.name
                }
            }))
        })
})

app.post('/api/plants', bodyParser.json(), (req, res) => {
    Plant.sync({
        force: false,
    })
        .then(async () => {
            res.send(await Plant.bulkCreate([
                {
                    name: req.body.name,
                    isWatering: req.body.isWatering,
                },
            ]));
        })

        .catch((err) => {
            console.error("error: " + err.message);
        });
})

app.get('/api/plants', (req, res) => {
    Plant.sync({
        force: false,
    })
        .then(async () => {
            plants = await Plant.findAll();
            console.log(plants);
            res.send(plants);
        })
})

app.delete('/api/plants', async (req, res) => {
    res.send(await Plant.drop());
});

app.post('/api/plantdata', bodyParser.json(), (req, res) => {
    PlantData.sync({
        force: false,
    })
        .then(async () => {
            res.send(await PlantData.bulkCreate([
                {
                    name: req.body.name,
                    lightLevel: req.body.lightLevel,
                    moistureLevel: req.body.moistureLevel
                },
            ]));
        })

        .catch((err) => {
            console.error("error: " + err.message);
        });
})

app.get('/api/plantdata', (req, res) => {
    PlantData.sync({
        force: false,
    })
        .then(async () => {
            plantData = await PlantData.findAll();
            console.log(plantData);
            res.send(plantData);
        })
})

app.delete('/api/plantdata', async (req, res) => {
    res.send(await PlantData.drop());
});

app.listen(port, host, () => {
    console.log(`Server started at ${host} port ${port}`);
});