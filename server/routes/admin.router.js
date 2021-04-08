const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');


router.get('/archivedusers', rejectUnauthenticated, (req, res) => {
    if (req.query.search.length === 0) {
        queryText = `
        SELECT "user"."id", "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "dob", "involved_w_sond_since"
        FROM "user"
        WHERE "archived" = True
        ORDER BY "last_name" ASC;`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(err => {
                console.log(`Error getting all users1`, err);
                res.sendStatus(500)
            })
    }
    else {
        queryText = `SELECT "user"."id", "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "dob", "involved_w_sond_since"
        FROM "user"
        WHERE "last_name" ILIKE $1
        AND "archived" = True
        ORDER BY "last_name" ASC;`;

        pool.query(queryText, [`${req.query.search}%`])
            .then(result => {
                res.send(result.rows);
            })

            .catch(err => {
                console.log(`Error getting all users2`, err);
                res.sendStatus(500)
            })
    }
});


// UPDATE password
router.put('/else', rejectUnauthenticated, (req, res) => {
    const userEdit = {
        id: req.body.id,
        password: encryptLib.encryptPassword(req.body.password)
    }
    const query = `UPDATE "user" SET "password" = $1 WHERE "id" = $2;`;
    pool.query(query, [userEdit.password, userEdit.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});


router.get('/archivedevents', rejectUnauthenticated, (req, res) => {
    if (req.query.search.length === 0) {
        query = `
    SELECT * FROM "event"
    WHERE "archived" = True`;
    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error getting all users3`, err);
            res.sendStatus(500)
        })
    }
    else {
        query = `
        SELECT * FROM "event"
        WHERE "name" ILIKE $1
        AND "archived" = True`
    
    pool.query(query, [`%${req.query.search}%`])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error getting all users4`, err);
            res.sendStatus(500)
        })}
})
module.exports = router