const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    const query = `SELECT * FROM "user" ORDER BY "last_name" ASC`;
    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error getting all users`, err);
            res.sendStatus(500)
        })
});

// GETS all affiliations
router.get('/affiliation', (req, res) => {
    const queryText = `SELECT * FROM "affiliation"`
    pool.query(queryText)
        .then(result => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error getting affiliations, ${err}`);
            res.sendStatus(500);
        })
});

// Selects All Users Who are in the affiliaton with the id
// that is passed into the params
router.get('/affiliation/:id', (req, res) => {
    const id = req.params.id
    const queryText = `SELECT "user"."id", "category", "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "dob", "involved_w_sond_since", "college_id", "access_level",
        "college_name"
    FROM "user"
    FUll JOIN "affiliation" ON "user"."college_id" = "affiliation"."id"
    WHERE "college_id" = ${id};`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error getting all users`, err);
            res.sendStatus(500)
        })
});

// ADMIN PUT request to modify user access level
// available at /api/volunteer/access_level/:id
router.put('/access_level/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    const query = `
    UPDATE "user" 
    SET "access_level" = ${req.body.access_level} 
    WHERE "id"= $1;`
    pool.query(query, [id]).then(() => {
        console.log(`User ${req.params.id} access level set to ${req.body.access_level}`);
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating user access level', error);
        res.sendStatus(500);
    });
});


//  GET a specific affiliation by id
router.get('/organization/:id', (req, res) => {
    const id = req.params.id
    const queryText = `SELECT "college_name" FROM "affiliation" WHERE "id" = ${id}`
    pool.query(queryText)
        .then(result => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error getting affiliations, ${err}`);
            res.sendStatus(500);
        })
});


module.exports = router;
