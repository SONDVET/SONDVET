import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UserPage.css";
import { useHistory } from 'react-router-dom'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


//  This page is for users to view all events they subscribed to and edit their profile info.
function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(store => store);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_AFFILIATE' });
    dispatch({ type: 'FETCH_ONE_USER_EVENT', payload: user.id });
  }, [])

  useEffect(() => {
    grandTotalTime();
    // phoneFormater(user.phone_number);
  }, [store.oneUserEvent])

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
    dispatch({ type: 'RE_REGISTER', payload: person });
    setEdit(true);
    window.location.reload();
  }

  const [grandTotalHours, setGrandTotalHours] = useState(0)
  const [grandTotalMinutes, setGrandTotalMinutes] = useState(0)

  const grandTotalTime = (time) => {
    let hours = 0
    let minutes = 0
    for (let item of store.oneUserEvent) {
      if (item.total_time.days) {
        hours += item.total_time.days * 24
      }
      if (item.total_time.hours) {
        hours += item.total_time.hours
      }
      if (item.total_time.minutes) {
        minutes += item.total_time.minutes
      }
    }
    setGrandTotalHours(hours);
    setGrandTotalMinutes(minutes);
  }

  //used to convert access level number to readable title
  const accessRanks = ["Volunteer", "Officer", "Admin"]

  const phoneFormater = (phoneNumb) => {
    let format = ('' + phoneNumb).replace(/\D/g, '');
    let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ')' + match[2] + '-' + match[3];
    }
    return null;
  }


  return (
    <>
      <h1>User Page</h1>
      <div className="container">
        <h2>{user.last_name}, {user.first_name}</h2>
        <p>{user.email}</p>
      </div>
      {(user.access_level > 2) &&
        <div className="rankContainer">
          <div>Rank:</div> <div>{edit ? <div>{accessRanks[user.access_level - 1]}</div> : <select defaultValue={user.access_level} onChange={(e) => setPerson({ ...person, access_level: e.target.value })}><option value="1">Volunteer</option><option value="2">Officer</option><option value="3">Admin</option></select>}</div>
        </div>}

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
        <div className="personInfoItem">Date of Birth</div>            <div className="personInfoItem">{edit ? <div>{user.dob.substring(0, 10)}</div> : <input defaultValue={user.dob.substring(0, 10)} onChange={(e) => setPerson({ ...person, dob: e.target.value })} type="date" />}</div>
        <div className="personInfoItem">Involved with SOND Since</div> <div className="personInfoItem">{edit ? <div>{user.involved_w_sond_since.substring(0, 10)}</div> : <input defaultValue={user.involved_w_sond_since.substring(0, 10)} onChange={(e) => setPerson({ ...person, involved_w_sond_since: e.target.value })} type="date" />}</div>
        <div className="personInfoItem">Affiliation/College</div>      <div className="personInfoItem">{edit ? <div>{user.college_id}</div> : <input defaultValue={user.college_id} onChange={(e) => setPerson({ ...person, college_id: e.target.value })} type="number" />}</div>
        {/* edit button will conidtionally render the divs into inputs, Save will dispatch the new data */}
        <button onClick={() => setEditMode()} >Edit Info</button> <button onClick={() => updateInfo()} >save</button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Event</TableCell>
              <TableCell align="center">Event Date</TableCell>
              <TableCell align="center">Attendance</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(store.oneUserEvent[1]) && store.oneUserEvent.map((item) => <TableRow key={item.id}>
              <TableCell align="left">
                {item.name}
              </TableCell>
              <TableCell align="center">
                {item.date.substring(0, 10)}
              </TableCell>
              <TableCell align="center">
                {(item.total_time.hours) ? (`${item.total_time.hours} hours `) : ''}
                {(item.total_time.minutes) ? (`${item.total_time.minutes} minutes`) : 'N/A'}
              </TableCell >
              <TableCell align="center">
                <button onClick={() => history.push(`/details/${item.event_id}`)}>view event</button>
              </TableCell>
            </TableRow>)}
            <TableRow>
              <TableCell colSpan="4">
                {/*intentionally blank buffer column */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Total Volunteer Time:
            </TableCell>
              <TableCell colSpan="3" align="center">
                {grandTotalHours} hours {grandTotalMinutes} minutes
            </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}


// this allows us to use <App /> in index.js
export default UserPage;



// let phoneNumb = user.phone_number;

// const phoneFormater = (phoneNumb) => {
//   let format = ('' + phoneNumb).replace(/\D/g,'');
//   let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
//   if (match){
//     return '('+match[1]+')'+match[2]+'-'+match[3];
//   }
//   return null;
// }

{/* <div className="personInfoItem">Phone</div>                    <div className="personInfoItem">{edit ? <div>{phoneFormater()}</div> : <input defaultValue={user.phone_number.split('-').join('')} onChange={(e) => setPerson({ ...person, phone_number: e.target.value })} type="number" />}</div> */ }
