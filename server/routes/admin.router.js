const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/archivedusers', (req, res) => {
    if(req.query.search === 0){
    queryText = `SELECT "user"."id", "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "dob", "involved_w_sond_since"
    FROM "user"
    WHERE "archived" = True
    ORDER BY "last_name" ASC;`;}
    else{
        queryText = `SELECT "user"."id", "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "dob", "involved_w_sond_since"
        FROM "user"
        WHERE "last_name" ILIKE '${req.query.search}%'
        AND "archived" = True
        ORDER BY "last_name" ASC;`;
    }
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error getting all users`, err);
            res.sendStatus(500)
        })
});

module.exports = router