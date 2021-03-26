import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UserPage.css";
import { useHistory } from 'react-router-dom';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


//  This page is for users to view all events they subscribed to and edit their profile info.
function UserPage() {

  //Styling for material tables
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(store => store);
  const user = useSelector((store) => store.user);

  //Grabs needed info on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_AFFILIATE' });
    dispatch({ type: 'FETCH_USER_GROUP' });
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
    access_level: user.access_level,
    archived: user.archived
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

  // calculates user's total volunteer time

  const [grandTotalHours, setGrandTotalHours] = useState(0)
  const [grandTotalMinutes, setGrandTotalMinutes] = useState(0)

  const grandTotalTime = (time) => {
    let hours = 0
    let minutes = 0
    for (let item of store.oneUserEvent) {
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

  //  ('' + user.phone_number).replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/)

  const isAMember = (userId, groupId) => {
    for (let item of store.userGroup) {
      if (item.user_id === userId && item.group_id === groupId)
      return true
    }
    return false
  }

  const toggleJoin = (userId, groupId, command) => {
    if (command === 'join'){
      dispatch({type: 'ADD_USER_GROUP', payload: {user_id: userId, group_id: groupId}})
    }
    if (command === 'leave'){
      dispatch({type: 'REMOVE_USER_GROUP', payload: {user_id: userId, group_id: groupId}})
    }
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
        <div>
        <button onClick={() => setEditMode()} >Edit Info</button> <button onClick={() => updateInfo()} >save</button>
        </div>
        {/* Personal Information Table */}
      <TableContainer className='personalInfoContainer' component={Paper} >
        <Table size="small">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell colSpan="2" align="center">Personal Information</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.category}</div> : <input defaultValue={user.category} onChange={(e) => setPerson({ ...person, category: e.target.value })} />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.first_name}</div> : <input defaultValue={user.first_name} onChange={(e) => setPerson({ ...person, first_name: e.target.value })} />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.last_name}</div> : <input defaultValue={user.last_name} onChange={(e) => setPerson({ ...person, last_name: e.target.value })} />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.email}</div> : <input defaultValue={user.email} onChange={(e) => setPerson({ ...person, username: e.target.value })} type="email" />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.phone_number}</div> : <input defaultValue={user.phone_number.split('-').join('')} onChange={(e) => setPerson({ ...person, phone_number: e.target.value })} type="number" />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.address}</div> : <input defaultValue={user.address} onChange={(e) => setPerson({ ...person, address: e.target.value })} />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.city}</div> : <input defaultValue={user.city} onChange={(e) => setPerson({ ...person, city: e.target.value })} />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.state}</div> : <input defaultValue={user.state} onChange={(e) => setPerson({ ...person, state: e.target.value })} />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Zip</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.zip}</div> : <input defaultValue={user.zip} onChange={(e) => setPerson({ ...person, zip: e.target.value })} type="number" />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.dob.substring(0, 10)}</div> : <input defaultValue={user.dob.substring(0, 10)} onChange={(e) => setPerson({ ...person, dob: e.target.value })} type="date" />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Involved with SOND Since</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.involved_w_sond_since.substring(0, 10)}</div> : <input defaultValue={user.involved_w_sond_since.substring(0, 10)} onChange={(e) => setPerson({ ...person, involved_w_sond_since: e.target.value })} type="date" />}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Affiliation/College</StyledTableCell>
              <StyledTableCell>{edit ? <div>{user.college_id}</div> : <input defaultValue={user.college_id} onChange={(e) => setPerson({ ...person, college_id: e.target.value })} type="number" />}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
    
      </TableContainer>

        {/* Group Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell colSpan="3" align="center">Groups</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <StyledTableRow>
              <StyledTableCell><b>Name</b></StyledTableCell>
              <StyledTableCell><b>Joined?</b></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
            {(store.affiliate[0]) && store.affiliate.map((group) => <StyledTableRow key={group.id}>
              <StyledTableCell>{group.college_name}</StyledTableCell>
              <StyledTableCell>{(store.userGroup[0]) && isAMember(user.id, group.id) ? <CheckCircleIcon color='primary' /> : <HighlightOffIcon />} </StyledTableCell> 
              <StyledTableCell>{((store.userGroup[0]) && isAMember(user.id, group.id) ? <button onClick={() => toggleJoin(user.id, group.id, 'leave')}>Leave</button> : <button onClick={() => toggleJoin(user.id, group.id, 'join')}>Join</button>)}</StyledTableCell>
            </StyledTableRow>)}
          </Table>
        </TableContainer>

        {/* User Events Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Event</StyledTableCell>
              <StyledTableCell align="center">Event Date</StyledTableCell>
              <StyledTableCell align="center">Attendance</StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(store.oneUserEvent[1]) && store.oneUserEvent.map((item) => <StyledTableRow key={item.id}>
              <StyledTableCell align="left">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.date.substring(0, 10)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {(item.total_time.hours) ? (`${item.total_time.hours} hours `) : ''}
                {(item.total_time.minutes) ? (`${item.total_time.minutes} minutes`) : 'N/A'}
              </StyledTableCell >
              <StyledTableCell align="center">
                <button onClick={() => history.push(`/details/${item.event_id}`)}>view event</button>
              </StyledTableCell>
            </StyledTableRow>)}
            <StyledTableRow>
              <StyledTableCell colSpan="4">
                {/*intentionally blank buffer column */}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>
                Total Volunteer Time:
            </StyledTableCell>
              <StyledTableCell colSpan="3" align="center">
                {grandTotalHours} hours {grandTotalMinutes} minutes
            </StyledTableCell>
            </StyledTableRow>
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
