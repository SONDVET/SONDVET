import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UserPage.css";

//  This page is for users to view all events they subscribed to and edit their profile info.
function UserPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_AFFILIATE' });
    // setPerson(person);
  }, [])

  const user = useSelector((store) => store.user);

  const [edit, setEdit] = useState(true);
  const [person, setPerson] = useState({
    id: user.id,
    category: user.category,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    dob: user.dob,
    involved_w_sond_since: user.involved_w_sond_since,
    college_id: user.college_id,
    password: user.password,
    access_level: user.access_level
  })

  const setEditMode = () => {
    console.log('clicked edit mode', edit);
    if (edit === true) {
      return setEdit(false);
    }
    else if (!edit === true) {
      return setEdit(true);
    }
  };


  const updateInfo = () => {
    dispatch({ type: 'RE_REGISTER', payload: person })
    dispatch({ type: 'FETCH_USER' });
    setEditMode();
  }


  return (
    <>
      <h1>User Page</h1>
      <div className="container">
        <h2>{user.last_name}, {user.first_name}</h2>
        <p>{user.email}</p>
      </div>

      <h3>Personal Information:</h3>
      <div className='personalInfoContainer'>
        <div className="personInfoItem">Category</div>                 <div className="personInfoItem">{edit ? <div>{user.category}</div> : <input defaultValue={user.category} onChange={(e) => setPerson({ ...person, category: e.target.value })} />}</div>
        <div className="personInfoItem">First Name</div>               <div className="personInfoItem">{edit ? <div>{user.first_name}</div> : <input defaultValue={user.first_name} onChange={(e) => setPerson({ ...person, first_name: e.target.value })} />}</div>
        <div className="personInfoItem">Last Name</div>                <div className="personInfoItem">{edit ? <div>{user.last_name}</div> : <input defaultValue={user.last_name} onChange={(e) => setPerson({ ...person, last_name: e.target.value })} />}</div>
        <div className="personInfoItem">Email</div>                    <div className="personInfoItem">{edit ? <div>{user.email}</div> : <input defaultValue={user.email} onChange={(e) => setPerson({ ...person, username: e.target.value })} type="email" />}</div>
        <div className="personInfoItem">Phone</div>                    <div className="personInfoItem">{edit ? <div>{user.phone_number}</div> : <input defaultValue={user.phone_number.split('-').join('')} onChange={(e) => setPerson({ ...person, phone_number: e.target.value })} type="number" />}</div>
        <div className="personInfoItem">Address</div>                  <div className="personInfoItem">{edit ? <div>{user.address}</div> : <input defaultValue={user.address} onChange={(e) => setPerson({ ...person, address: e.target.value })} />}</div>
        <div className="personInfoItem">City</div>                     <div className="personInfoItem">{edit ? <div>{user.city}</div> : <input defaultValue={user.city} onChange={(e) => setPerson({ ...person, city: e.target.value })} />}</div>
        <div className="personInfoItem">State</div>                    <div className="personInfoItem">{edit ? <div>{user.state}</div> : <input defaultValue={user.state} onChange={(e) => setPerson({ ...person, state: e.target.value })} />}</div>
        <div className="personInfoItem">Zip</div>                      <div className="personInfoItem">{edit ? <div>{user.zip}</div> : <input defaultValue={user.zip} onChange={(e) => setPerson({ ...person, zip: e.target.value })} type="number" />}</div>
        <div className="personInfoItem">Date of Birth</div>            <div className="personInfoItem">{edit ? <div>{user.dob.substring(0, 10)}</div> : <input defaultValue={user.dob.substring(0,10)} onChange={(e) => setPerson({ ...person, dob: e.target.value })} type="date" />}</div>
        <div className="personInfoItem">Involved with SOND Since</div> <div className="personInfoItem">{edit ? <div>{user.involved_w_sond_since.substring(0, 10)}</div> : <input defaultValue={user.involved_w_sond_since.substring(0,10)} onChange={(e) => setPerson({ ...person, involved_w_sond_since: e.target.value })} type="date" />}</div>
        <div className="personInfoItem">Affiliation/College</div>      <div className="personInfoItem">{edit ? <div>{user.college_id}</div> : <input defaultValue={user.college_id} onChange={(e) => setPerson({ ...person, college_id: e.target.value })} type="number" />}</div>
        {/* edit button will conidtionally render the divs into inputs, Save will dispatch the new data */}
        <button onClick={() => setEditMode()} >Edit Info</button> <button onClick={() => updateInfo()} >save</button>
      </div>

    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


/*
changing defaultValue to value prevents editing the inputs.
placeholder={user.category}
placeholder={user.first_name}
placeholder={user.last_name}
placeholder={user.email}
placeholder={user.phone_number}
placeholder={user.address}
placeholder={user.city}
placeholder={user.state}
placeholder={user.zip}
placeholder={user.dob}
placeholder={user.involved_w_sond_since}
placeholder={user.college_id}
*/