const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET route for retrieving all events
router.get('/', (req, res) => {
    console.log('getting all events');
    const queryText = `SELECT * FROM "event";`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
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
// reqs: id, name, description, special_inst, location, date, pic_url
router.put('/', (req, res) => {
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

//PUT route to insert timestamp into check_in for a user
//reqs: user_id, event_id
router.put('/checkin', (req, res) => {
    const userId = req.body.user_id;
    const eventId = req.body.event_id;
    const queryText = `
    UPDATE "user_event"
    SET "check_in" = CURRENT_TIMESTAMP
    WHERE "user_id" = $1 AND "event_id" = $2;`
    pool.query(queryText, [userId, eventId])
        .then((result) => {
            console.log(`user with id: ${userId} has been checked into event with id: ${eventId}`);
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

//PUT route to insert timestamp into check_out for a user and update total time
//reqs: user_id, event_id
router.put('/checkout', (req, res) => {
    const userId = req.body.user_id;
    const eventId = req.body.event_id;
    const queryText = `
    UPDATE "user_event"
    SET "check_out" = CURRENT_TIMESTAMP
    WHERE "user_id" = $1 AND "event_id" = $2;`
    const differenceQuery = `
    UPDATE "user_event"
    SET "total_time" = ("total_time" + age("check_out", "check_in"))
    WHERE "user_id" = $1 AND "event_id" = $2;`
    pool.query(queryText, [userId, eventId])
        //After a checkout has been submitted, a second query is sent to update the total time for that user
        .then(pool.query(differenceQuery, [userId, eventId]))
        .then((result) => {
            console.log(`user with id: ${userId} has been checked out of event with id ${eventId}`);
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

//Post Request For Adding User To Event
//To be used with "join" button on event cards
//Posts To user_event Table

router.post('/attending', (req, res) => {
    const userId = req.body.userId
    const eventId = req.body.eventId
    const queryText = `
    INSERT INTO "user_event" ("user_id" , "event_id") 
    VALUES ($1 , $2)`;
    pool.query(queryText, [userId, eventId])
        .then((result) => {
            console.log(`Added user with id: ${userId} to event with id: ${eventId}`);
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

// Delete Request For Removing User From Event
// To be used with "cant make it" button on event cards
//Deletes from "user_event Table"

router.delete('/attending', (req, res) => {
    const userId = req.body.userId
    const eventId = req.body.eventId
    const queryText = ` 
    DELETE FROM "user_event" 
    WHERE "user_id" = $1 
    AND "event_id" = $2;`
    pool.query(queryText, [userId, eventId])
        .then((result) => {
            console.log(`Removed user with id: ${userId} from event with id: ${eventId}`);
            res.sendStatus(204);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

// Get Request for Selection All users from Specified Event
// To be used on Event Details Page
// Event Id Will Need to be passed in the params
router.get('/details/:id', (req, res) => {
    const eventId = req.params.id
    const queryText = `SELECT u."id","category" , "first_name" , "last_name" , "email" , "phone_number" , "address" , "city" , "state" , "zip" , "dob" , "involved_w_sond_since" , "college_id" , "access_level" , "check_in" , "check_out" , "total_time"
    FROM "user" as u
    JOIN "user_event" AS ue ON u."id" = ue."user_id"
    WHERE ue."event_id" = ${eventId};`
    pool.query(queryText)
        .then((result) => {
            console.log(`getting info on event with id ${eventId}`);
            res.send(result.rows)
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

// DELETE route deletes event
// Used on Event Details page
router.delete(`/details/:id`, rejectUnauthenticated, (req, res) => {
    console.log('Deleting event with an id of:', req.params.id);
    const queryText = `DELETE FROM "event" WHERE "id"=$1;`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(204)
        }).catch((err) => {
            console.log('Error deleting event', err);
        })
}); // END DELETE EVENT ROUTER




module.exports = router;
