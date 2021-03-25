import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormControl, InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core"
import "./RegisterForm.css"
function RegisterForm() {

  const [user, setUser] = useState({
    category: "",
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    dob: "",
    involved_w_sond_since: "",
    college_id: "",
    password: "",
    access_level: ""
  })

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const affiliates = useSelector((store) => store.affiliate);

  const registerUser = (event) => {
    event.preventDefault();
    console.log(user)
    dispatch({ type: 'REGISTER', payload: user });
  }; // end registerUser


  useEffect(() => {
    dispatch({ type: 'FETCH_AFFILIATE' });
  }, [])
  const useStyles = makeStyles({ // set stying for card and paper
    input: {
      width: 200,
      padding: 10

    },
  });
  const classes = useStyles();
  return (
    <form className="registerBox" onSubmit={registerUser}>
      <h2>REGISTER USER</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <TextField variant="filled" className={classes.input} label="First Name" onChange={(e) => setUser({ ...user, first_name: e.target.value })} required />
      <TextField variant="filled" className={classes.input} label="Last Name" onChange={(e) => setUser({ ...user, last_name: e.target.value })} required />
      <TextField variant="filled" className={classes.input} label="Email" onChange={(e) => setUser({ ...user, username: e.target.value })} type="email" required />
      <TextField variant="filled" className={classes.input} label="Phone Number" onChange={(e) => setUser({ ...user, phone_number: e.target.value })} type="number" required />
      <TextField variant="filled" className={classes.input} label="Street Address" onChange={(e) => setUser({ ...user, address: e.target.value })} required />
      <TextField variant="filled" className={classes.input} label="City" onChange={(e) => setUser({ ...user, city: e.target.value })} required />
      <TextField variant="filled" className={classes.input} label="State" onChange={(e) => setUser({ ...user, state: e.target.value })} required />
      <TextField variant="filled" className={classes.input} label="Zip Code" onChange={(e) => setUser({ ...user, zip: e.target.value })} type="number" required />
      <TextField variant="filled" className={classes.input} label="Date Of Birth" InputLabelProps={{ shrink: true }} onChange={(e) => setUser({ ...user, dob: e.target.value })} type="date" required />
      <TextField variant="filled" className={classes.input} label="Involved With SOND Since" InputLabelProps={{ shrink: true }} onChange={(e) => setUser({ ...user, involved_w_sond_since: e.target.value })} type="date" required />
      <FormControl variant="filled" className={classes.input} >
        <InputLabel>School</InputLabel>
        <Select value={user.college_id} onChange={(e) => setUser({ ...user, college_id: e.target.value })} >
          {(affiliates[0]) && affiliates.map((school) =>
            <MenuItem key={school.id} value={school.id}>{school.college_name}</MenuItem>
          )}
        </Select>
      </FormControl>
      {/* <select defaultValue="none" onChange={(e) => setUser({ ...user, college_id: e.target.value })}>
      <option value="none" disabled hidden>Select Your School</option>
        {(affiliates[0]) && affiliates.map((school) => 
        <option key={school.id} value={school.id}>{school.college_name}</option>
        )}
      </select> */}
      <TextField variant="filled" className={classes.input} label="New Password" onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" />
      {/* <input placeholder="Access_Level" onChange={(e) => setUser({ ...user, access_level: e.target.value })} />
      <input placeholder="Category" onChange={(e) => setUser({ ...user, category: e.target.value })} required /> */}

      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
