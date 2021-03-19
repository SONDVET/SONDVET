import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [user, setUser] = useState ({
    category: "",
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    address:"",
    city:"",
    state:"",
    zip:"",
    dob:"",
    involved_w_sond_since:"",
    college_id:"",
    password:"",
    access_level:""
  })
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    console.log(user)
    dispatch({type: 'REGISTER', payload: user });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <input placeholder = "Category" onChange={(e) => setUser({ ...user, category: e.target.value })} required/>
      <input placeholder = "First Name" onChange={(e) => setUser({ ...user, first_name: e.target.value })} required/>
      <input placeholder = "Last Name" onChange={(e) => setUser({ ...user, last_name: e.target.value })} required/>
      <input placeholder = "Email" onChange={(e) => setUser({ ...user, username: e.target.value })} type="email" required/>
      <input placeholder = "Phone Number" onChange={(e) => setUser({ ...user, phone_number: e.target.value })} type="number" required/>
      <input placeholder = "Street Address" onChange={(e) => setUser({ ...user, address: e.target.value })} required/>
      <input placeholder = "City" onChange={(e) => setUser({ ...user, city: e.target.value })} required/>
      <input placeholder = "State" onChange={(e) => setUser({ ...user, state: e.target.value })} required/>
      <input placeholder = "Zip Code" onChange={(e) => setUser({ ...user, zip: e.target.value })} type = "number" required/>
      <input placeholder = "Date Of Birth"onChange={(e) => setUser({ ...user, dob: e.target.value })} type = "date" required />
      <input placeholder = "Involved With SOND Since" onChange={(e) => setUser({ ...user, involved_w_sond_since: e.target.value })} type= "date" required/>
      <select defaultValue="none" onChange={(e) => setUser({ ...user, college_id: e.target.value })}>
        <option value="none" disabled hidden>Select Your School</option>
        <option value="1">NDSU</option>
        <option value="2">MSU</option>
        <option value="3">U Mary</option>
        <option value="4">UND</option>
        <option value="5">VCSU</option>
      </select>
      <input placeholder = "New Password" onChange={(e) => setUser({ ...user, password: e.target.value })} type = "password"/>
      <input placeholder = "Access_Level" onChange={(e) => setUser({ ...user, access_level: e.target.value })} />
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
