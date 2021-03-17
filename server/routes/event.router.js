const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// POST route for adding new event.
// reqs: name, description, special_inst, location, date, pic_url
router.post('/', (req, res) => {
console.log('router posting new event');
    const newEvent = req.body.payload.name;
    const newDesc = req.body.payload.description;
    const newSpec = req.body.payload.special_inst;
    const newLoc = req.body.payload.location;
    const newDate = req.body.payload.date;
    const newPic = req.body.payload.pic_url;
    const queryText = `INSERT INTO "event" ("name", "description", "special_inst", "location", "date", "pic_url")
     VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText[newEvent, newDesc, newSpec, newLoc, newDate, newPic])
    .then(async result => {
        console.log('new event made', result.row[0]);
        res.sendStatus(201);
    }).catch(err => {
        // catch 
        console.log(err);
        res.sendStatus(500)
    })
});

module.exports = router;
