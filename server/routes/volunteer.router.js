const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// GETS all users
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('getting all users');
    // Send back user object from the session (previously queried from the database)
    // ¡¡ MODIFY TO SELECT EVERYTING BUT PASSWORD !!
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
    const queryText = `SELECT * FROM "affiliation" WHERE "inactive"=FALSE;`
    pool.query(queryText)
        .then(result => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error getting affiliations, ${err}`);
            res.sendStatus(500);
        })
});


// PUT to make an affiliation inactive(archived)
router.put('/affiliation/:id', (req, res) => {
    const queryText = `UPDATE "affiliation" SET "inactive"=TRUE WHERE "id"=$1;`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error archiving affiliation, ${err}`);
            res.sendStatus(500);
        })
});


// Selects All Users Who are in the affiliaton with the id
// that is passed into the params
router.get('/affiliation/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    const queryText = `SELECT "user"."id", "category", "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "dob", "involved_w_sond_since", "college_id", "access_level", "college_name", "archived", "group_id"
    FROM "user"
    JOIN "user_group" ON "user"."id" = "user_group"."user_id"
	JOIN "affiliation" ON "user_group"."group_id" = "affiliation"."id"
    WHERE "group_id" = ${id};`;
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
router.delete('/:id', rejectUnauthenticated, (req, res) => {
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

//GET everything in user_group
router.get('/usergroup', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user_group";`
    pool.query(queryText)
    .then(result => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.log(`Error getting user_group, ${err}`);
        res.sendStatus(500);
    })
});

//create new entry in user_group
router.put('/usergroup/:userid/:groupid', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "user_group" ("user_id", "group_id")
    VALUES ($1, $2);`;
    pool.query(queryText, [req.params.userid, req.params.groupid])
    .then (result => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

//remove entry from user_group
router.delete('/usergroup/:userid/:groupid', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "user_group" WHERE "user_id" = $1 AND "group_id" = $2;`
    pool.query(queryText, [req.params.userid, req.params.groupid])
    .then (result => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500)
    })
})


module.exports = router;
