const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
// router.get('/', rejectUnauthenticated, (req, res) => {
//   // Send back user object from the session (previously queried from the database)
//   res.send(req.user);
// });


// GET all users from DB ordered by last name alphabetically
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

// Updates user data 
router.put('/:id', rejectUnauthenticated, (req, res) => {
  // console.log(req.body, req.params)
  const userEdit = {
    id: req.body.id,
    category: req.body.category,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    dob: req.body.dob,
    involved_w_sond_since: req.body.involved_w_sond_since,
    college_id: req.body.college_id,
    password: req.body.password,
    access_level: req.body.access_level,
  }
  const query = `
  UPDATE "user
  SET "category" = $1, "first_name" = $2, "last_name" = $3, "email" = $4, 
  "phone_number" = $5, "address" = $6, "city" = $7, "state" = $8, 
  "zip" = $9, "dob" = $10, "involved_w_sond_since" = $11,
  "college_id" = $12, "password" = $13, "access_level" = $14`;
  
})





// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (category, first_name, last_name, email,
    phone_number, address, city, state, zip, dob, involved_w_sond_since, college_id,
    password, access_level)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`;
  pool
    .query(queryText, [req.body.category, req.body.first_name, req.body.last_name, email,
    req.body.phone_number, req.body.address, req.body.city, req.body.state, req.body.zip,
    req.body.dob, req.body.involved_w_sond_since,
    req.body.college_id, password, req.body.access_level])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
  console.log(`User ${email} created`);
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
