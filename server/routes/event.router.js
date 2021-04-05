const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET route for retrieving all events
router.get('/', rejectUnauthenticated, (req, res) => {
    // if the search query isnt there, all events are selected
    if (req.query.search.length === 0) {
        queryText = `
        SELECT * FROM "event" 
        WHERE "archived"='FALSE'
        ORDER BY "date";`;
    }
    //if there is a search query, only search matches are selected
    else {
        queryText = `SELECT * FROM "event"
        WHERE "name" ILIKE '%${req.query.search}%' AND "archived"='FALSE' ORDER BY "date";`
    }
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

//GET rout for retrieving all user_events
router.get('/aue', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user_event" 
    JOIN "event" ON "user_event"."event_id"="event"."id" 
    JOIN "affiliation" ON "affiliation"."id" = "user_event"."group_id"
    WHERE "archived"='FALSE';`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

//GET rout for retrieving one user_events
router.get('/oneuserevent/:id', (req, res) => {
    const queryText = `SELECT * FROM "user_event"
    JOIN "event" ON "user_event"."event_id" = "event"."id"
    WHERE "user_event"."user_id" = $1 AND "archived"='FALSE';`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

//GET route for one user
//Used on /userdetails for admins to edit user info
router.get('/oneuser/:id', (req, res) => {
    const queryText = `
    SELECT "user"."id", "category", "first_name", "last_name", "email",
    "phone_number", "address", "city", "state", "zip", "dob",
    "involved_w_sond_since", "college_id", "access_level", "archived"
    FROM "user"
    WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
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
router.post('/', rejectUnauthenticated, (req, res) => {
    const newEvent = req.body.name;
    const newDesc = req.body.description;
    const newSpec = req.body.special_inst;
    const newLoc = req.body.location;
    const newDate = req.body.date;
    const newPic = req.body.pic_url;
    const newTime = req.body.time
    const queryText = `INSERT INTO "event" ("name", "description", "special_inst", "location", "date", "pic_url", "time")
     VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [newEvent, newDesc, newSpec, newLoc, newDate, newPic, newTime])
        .then(async result => {
            res.sendStatus(201);
        }).catch(err => {
            // catch 
            console.log(err);
            res.sendStatus(500)
        })
});

//PUT route for editing a specific event 
// reqs: id, name, description, special_inst, location, date, pic_url
router.put('/', rejectUnauthenticated, (req, res) => {
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
    pool.query(queryText, [eventEdit.name, eventEdit.description, eventEdit.special_inst, eventEdit.location, 
        eventEdit.date, eventEdit.image, eventEdit.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

//PUT route to insert timestamp into check_in for a user
//reqs: user_id, event_id
router.put('/checkin', rejectUnauthenticated, (req, res) => {
    const userId = req.body.user_id;
    const eventId = req.body.event_id;
    const queryText = `
    UPDATE "user_event"
    SET "check_in" = CURRENT_TIMESTAMP
    WHERE "user_id" = $1 AND "event_id" = $2;`
    pool.query(queryText, [userId, eventId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

//PUT route to insert timestamp into check_out for a user and update total time
//reqs: user_id, event_id
router.put('/checkout', rejectUnauthenticated, (req, res) => {
    const userId = req.body.user_id;
    const eventId = req.body.event_id;
    const queryText = `
    UPDATE "user_event"
    SET "check_out" = CURRENT_TIMESTAMP
    WHERE "user_id" = $1 AND "event_id" = $2;`
    pool.query(queryText, [userId, eventId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

// updtates the total time column by calculating the difference
// bewtween the check in and check out columns
router.put('/addtotal', rejectUnauthenticated, (req, res) => {
    const userId = req.body.user_id;
    const eventId = req.body.event_id;
    const differenceQuery = `
    UPDATE "user_event"
    SET "total_time" = ("total_time" + age("check_out", "check_in"))
    WHERE "user_id" = $1 AND "event_id" = $2;`
    //After a checkout has been submitted, a second query is sent to update the total time for that user
    pool.query(differenceQuery, [userId, eventId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

//Post Request For Adding User To Event
//To be used with "join" button on event cards
//Posts To user_event Table
router.post('/attending', rejectUnauthenticated, (req, res) => {
    const userId = req.body.userId
    const eventId = req.body.eventId
    const groupId = req.body.groupId
    const queryText = `
    INSERT INTO "user_event" ("user_id" , "event_id", "group_id") 
    VALUES ($1 , $2, $3)`;
    pool.query(queryText, [userId, eventId, groupId])
        .then((result) => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

// Delete Request For Removing User From Event
// To be used with "cant make it" button on event cards
//Deletes from "user_event Table"

router.delete('/attending/:userId/:eventId', rejectUnauthenticated, (req, res) => {
    const userId = req.params.userId
    const eventId = req.params.eventId
    const queryText = ` 
    DELETE FROM "user_event" 
    WHERE "user_id" = $1 
    AND "event_id" = $2;`
    pool.query(queryText, [userId, eventId])
        .then((result) => {
            res.sendStatus(204);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})


// PUT route archives event
// Used on Event Details page
router.put(`/details/:id`, rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "event" SET "archived" = 'TRUE' WHERE "id"=$1;`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(204)
        }).catch((err) => {
            console.log('Error deleting event', err);
        })
}); // END ARCHIVE EVENT ROUTER


// PUT route unarchives event
// Used on Event Details page
router.put(`/details/:id/archived`, rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "event" SET "archived" = 'FALSE' WHERE "id"=$1;`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(204)
        }).catch((err) => {
            console.log('Error unarchiving event', err);
        })
}); // END UNARCHIVE EVENT ROUTER


// GET request to select single event 
// used for event details page
router.get('/eventdetails/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "event" WHERE "id" = ${req.params.id};`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});


// Get Request for Selection All users from Specified Event
// To be used on Event Details Page
// Event Id Will Need to be passed in the params
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    if(req.query.search.length === 0){
    queryText = 
    `SELECT u."id", "category", "first_name", "last_name", "email", 
    "phone_number", "college_name", ue."check_in", ue."check_out", 
    ue."total_time", ue."event_id"  FROM "user_event" as ue
    JOIN "user" AS u ON ue."user_id" = u."id"
    JOIN "affiliation" as a ON ue."group_id" = a."id"
    WHERE ue."event_id" = ${req.params.id}
    ORDER BY "last_name"`;
    }else{
    queryText = 
    `SELECT u."id", "category", "first_name", "last_name", "email", 
    "phone_number", "college_name", ue."check_in", ue."check_out", 
    ue."total_time", ue."event_id"  FROM "user_event" as ue
    JOIN "user" AS u ON ue."user_id" = u."id"
    JOIN "affiliation" as a ON ue."group_id" = a."id"
    WHERE ue."event_id" = ${req.params.id}
    AND "last_name" ILIKE '${req.query.search}%' `;
    }
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});
module.exports = router;
