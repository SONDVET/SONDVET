const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// POST route for adding new event.
// reqs: name, description, special_inst, location, date, pic_url
// SERVER SIDE DONE, but untested.
router.post('/', (req, res) => {
console.log('router posting new event');
    const newEvent = req.body.name;
    const newDesc = req.body.description;
    const newSpec = req.body.special_inst;
    const newLoc = req.body.location;
    const newDate = req.body.date;
    const newPic = req.body.pic_url;
    const queryText = `INSERT INTO "event" ("name", "description", "special_inst", "location", "date", "pic_url")
     VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [newEvent, newDesc, newSpec, newLoc, newDate, newPic])
    .then(async result => {
        console.log('new event made', result);
        res.sendStatus(201);
    }).catch(err => {
        // catch 
        console.log(err);
        res.sendStatus(500)
    })
});

module.exports = router;
