const express = require('express');
const { restart } = require('nodemon');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Updates user data at http://localhost:5000/api/user/
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body)
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
    password: encryptLib.encryptPassword(req.body.password),
    access_level: req.body.access_level,
    archived: req.body.archived
  }
  const query = `
  UPDATE "user"
  SET "category" = $1, "first_name" = $2, "last_name" = $3, "email" = $4, 
  "phone_number" = $5, "address" = $6, "city" = $7, "state" = $8, 
  "zip" = $9, "dob" = $10, "involved_w_sond_since" = $11,
  "college_id" = $12, "password" = $13, "access_level" = $14, "archived" = $15
  WHERE "id" = $16`;
  pool.query(query, [userEdit.category, userEdit.first_name, userEdit.last_name,
  userEdit.email, userEdit.phone_number, userEdit.address, userEdit.city,
  userEdit.state, userEdit.zip, userEdit.dob, userEdit.involved_w_sond_since,
  userEdit.college_id, userEdit.password, userEdit.access_level, userEdit.archived, userEdit.id ])
    .then((result) => {
      console.log(`Updated user information for ${userEdit.email}`);
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
});

// ADMIN PUT sets user to archived 
// available at /api/user/:id
router.put('/:id', rejectUnauthenticated, (req, res) =>  {
  console.log('Archiving user id', req.params.id);
  const id = req.params.id;
  const query = `
  UPDATE "user"
  SET "archived" = 'TRUE'
  WHERE "id" = $1;`
  pool.query(query, [id])
  .then((result) => {
      res.sendStatus(204)
  }).catch((err) => {
      console.log(`Error archiving user with an id of ${id}`)
      res.sendStatus(500);
  });
});

// ADMIN PUT sets user to unarchived 
// available at /api/user/:id
router.put('/:id/archived', rejectUnauthenticated, (req, res) =>  {
  console.log('Unarchiving user id', req.params.id);
  const id = req.params.id;
  const query = `
  UPDATE "user"
  SET "archived" = 'FALSE'
  WHERE "id" = $1;`
  pool.query(query, [id])
  .then((result) => {
      res.sendStatus(204)
  }).catch((err) => {
      console.log(`Error unarchiving user with an id of ${id}`)
      res.sendStatus(500);
  });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const client = await pool.connect();
  try{

  const queryText = await client.query(`INSERT INTO "user" ( first_name, last_name, email,
    phone_number, address, city, state, zip, dob, involved_w_sond_since, college_id,
    password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`, [ req.body.first_name, req.body.last_name, username,
    req.body.phone_number, req.body.address, req.body.city, req.body.state, req.body.zip,
    req.body.dob, req.body.involved_w_sond_since,
    req.body.college_id, password]);
    const newUserId = queryText.rows[0].id;

    const insertUserGroupText = `INSERT INTO "user_group" ("user_id", "group_id")
    VALUES ($1,$2)`;
    await client.query(insertUserGroupText, [newUserId, req.body.college_id]);
    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (err) {
      await client.query('ROLLBACK')
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    } finally {
      client.release()
    }
  console.log(`User ${req.body.college_id} created`);
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
