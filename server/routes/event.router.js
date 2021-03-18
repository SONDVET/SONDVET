const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET route for retrieving all events
router.get('/', (req, res) => {
    console.log('getting all events');
    const queryText = `SELECT * FROM "event";`;
    pool.query(queryText)
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

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

//PUT route for editing a specific event 
// reqs: name, description, special_inst, location, date, pic_url
router.put('/', (req,res) => {
    const eventEdit = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        special_inst: req.body.special_inst,
        location: req.body.location,
        date: req.body.date,
        image: req.body.pic_url,
    }
    const queryText = `
    UPDATE "event"
    SET "name" = $1, "description" = $2, "special_inst" = $3, location = $4, "date" = $5, "pic_url" = $6
    WHERE "id" = $7`;
    pool.query(queryText, [eventEdit.name, eventEdit.description, eventEdit.special_inst, eventEdit.location, eventEdit.date, eventEdit.image, eventEdit.id])
    .then((result) => {
        console.log(`Updated information for event with id: ${eventEdit.id}`);
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

//Post Request For Adding User To Event
//Posts To user_event Table

router.post('/attending',(req , res) => {
    const userId = req.body.userId
    const eventId = req.body.eventId
    const queryText = `
    INSERT INTO "user_event" ("user_id" , "event_id") 
    VALUES ($1 , $2)`;
    pool.query(queryText, [userId , eventId])
    .then((result) => {
        console.log(`Added user with id: ${userId} to event with id: ${eventId}`);
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router;
