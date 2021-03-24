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
router.get('/affiliation', rejectUnauthenticated, (req, res) => {
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
router.get('/affiliation/:id', rejectUnauthenticated, (req, res) => {
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
// available at /api/volunteer/:id/access_level
router.put('/:id/access_level', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    const query = `
    UPDATE "user" 
    SET "access_level" = ${req.body.access_level} 
    WHERE "id"= $1;`
    pool.query(query, [id]).then(() => {
        console.log(`User ${req.params.id} access level set to ${req.body.access_level}`);
        res.sendStatus(200);
    }).catch(err => {
        console.log('Error updating user access level', err);
        res.sendStatus(500);
    });
});

// ADMIN DELETE user 
// available at /api/volunteer/:id 
router.delete('/:id', rejectUnauthenticated, (req, res) =>  {
    console.log('Deleting user id', req.params.id);
    const id = req.params.id;
    const query = `DELETE FROM "user" WHERE "id" = $1;`
    pool.query(query, [id])
    .then((result) => {
        res.sendStatus(204)
    }).catch((err) => {
        console.log(`Error deleting user with an id of ${id}`)
        res.sendStatus(500);
    });
});

//  GET a specific affiliation by id
router.get('/organization/:id', rejectUnauthenticated, (req, res) => {
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
