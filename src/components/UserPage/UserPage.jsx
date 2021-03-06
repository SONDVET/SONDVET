import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UserPage.css";
import { useHistory } from 'react-router-dom';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container, TablePagination, TextField, Select, MenuItem, Paper } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment';


//Styling for material tables
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '20px'
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


//  This page is for users to view all events they subscribed to and edit their profile info.
function UserPage() {


  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(store => store);
  const user = useSelector((store) => store.user);

  //Grabs needed info on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_AFFILIATE', payload: "" });
    dispatch({ type: 'FETCH_USER_GROUP' });
    dispatch({ type: 'FETCH_ONE_USER_EVENT', payload: user.id });
  }, [])

  useEffect(() => {
    grandTotalTime();
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
    access_level: user.access_level,
    archived: user.archived
  })


  const setEditMode = () => {
    if (edit === true) {
      return setEdit(false);
    }
    else if (!edit === true) {
      return setEdit(true);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateInfo = () => {
    dispatch({ type: 'RE_REGISTER', payload: person });
    setEdit(true);
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
    hours += Math.floor(minutes / 60)
    minutes = minutes % 60;
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
    return phoneNumb;
  }

  const isAMember = (userId, groupId) => {
    for (let item of store.userGroup) {
      if (item.user_id === userId && item.group_id === groupId)
        return true
    }
    return false
  }

  const toggleJoin = (userId, groupId, command) => {
    if (command === 'join') {
      dispatch({ type: 'ADD_USER_GROUP', payload: { user_id: userId, group_id: groupId } })
    }
    if (command === 'leave') {
      dispatch({ type: 'REMOVE_USER_GROUP', payload: { user_id: userId, group_id: groupId } })
    }
  }

  return (
    <>
      <Container maxWidth="xl">
        <Grid container direction="row" spacing={3} justify="space-between" alignItems="center">
          <Grid item>
            <p className="name">{person.first_name} {person.last_name}</p>
            <p className="mail">{person.email}</p>

            {(user.access_level > 2) &&
              <div className="rankContainer">
                <div>Rank: &nbsp;</div>  <div clasname="rank">{edit ? <div><b>{accessRanks[user.access_level - 1]}</b></div> : <Select defaultValue={user.access_level} onChange={(e) => setPerson({ ...person, access_level: e.target.value })}><MenuItem value="1">Volunteer</MenuItem><MenuItem value="2">Officer</MenuItem><MenuItem value="3">Admin</MenuItem></Select>}</div>
              </div>}
          </Grid>
          <Grid item>
            <Button variant="contained" color="default" onClick={() => setEditMode()}>{edit ? 'Edit Info' : 'cancel edit'}</Button> {!edit ? <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => updateInfo()} >save</Button> : ''}
          </Grid>
        </Grid>

        <br />
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          {/* Personal Information Table */}
          <Grid item lg={5}>
            <TableContainer className='personalInfoContainer' component={Paper} >
              <Table size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell colSpan="2" align="center">Personal Information</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell><b>Category</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.category}</div> : <TextField defaultValue={person.category} onChange={(e) => setPerson({ ...person, category: e.target.value })} />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>First Name</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.first_name}</div> : <TextField key="name" value={person.first_name} onChange={(e) => setPerson({ ...person, first_name: e.target.value })} />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>Last Name</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.last_name}</div> : <TextField defaultValue={person.last_name} onChange={(e) => setPerson({ ...person, last_name: e.target.value })} />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>Email</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.email}</div> : <TextField defaultValue={person.email} onChange={(e) => setPerson({ ...person, username: e.target.value })} type="email" />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>Phone</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{phoneFormater(user.phone_number)}</div> : <TextField defaultValue={person.phone_number.split('-').join('')} maxLength="10" onChange={(e) => setPerson({ ...person, phone_number: e.target.value })} type="tel" />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>Address</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.address}</div> : <TextField defaultValue={person.address} onChange={(e) => setPerson({ ...person, address: e.target.value })} />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>City</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.city}</div> : <TextField defaultValue={person.city} onChange={(e) => setPerson({ ...person, city: e.target.value })} />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>State</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.state}</div> : <TextField defaultValue={person.state} onChange={(e) => setPerson({ ...person, state: e.target.value })} />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>Zip</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.zip}</div> : <TextField defaultValue={person.zip} onChange={(e) => setPerson({ ...person, zip: e.target.value })} type="number" />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>Date of Birth</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.dob.substring(0, 10)}</div> : <TextField defaultValue={person.dob.substring(0, 10)} onChange={(e) => setPerson({ ...person, dob: e.target.value })} type="date" />}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell><b>Involved with SOND Since</b></StyledTableCell>
                    <StyledTableCell>{edit ? <div>{person.involved_w_sond_since.substring(0, 10)}</div> : <TextField defaultValue={person.involved_w_sond_since.substring(0, 10)} onChange={(e) => setPerson({ ...person, involved_w_sond_since: e.target.value })} type="date" />}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>

            </TableContainer>
          </Grid>

          {/* Group Table */}
          <Grid item md={4}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell colSpan="3" align="center">Groups</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell><b>Name</b></StyledTableCell>
                    <StyledTableCell><b>Joined?</b></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                  {(store.affiliate[0]) && store.affiliate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((group) => <StyledTableRow key={group.id}>
                    <StyledTableCell><b>{group.college_name}</b></StyledTableCell>
                    <StyledTableCell>{(store.userGroup[0]) && isAMember(user.id, group.id) ? <CheckCircleIcon color='primary' /> : <HighlightOffIcon />} </StyledTableCell>
                    <StyledTableCell>{((store.userGroup[0]) && isAMember(user.id, group.id) ? <Button variant="contained" onClick={() => toggleJoin(user.id, group.id, 'leave')}>Leave</Button> : <Button variant="contained" onClick={() => toggleJoin(user.id, group.id, 'join')}>Join</Button>)}</StyledTableCell>
                  </StyledTableRow>)}
                </TableBody>
              </Table>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={store.affiliate.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
          </Grid>
        </Grid>
        <br />

        {/* User Events Table */}
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Grid item xs={10}>
            <h2>Event Participations</h2>
            <TableContainer component={Paper} >
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
                  {(store.oneUserEvent[0]) && store.oneUserEvent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => <StyledTableRow key={item.id}>
                    <StyledTableCell align="left">
                      <b>{item.name}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {moment(item.date).format('LL')}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {(item.total_time.hours) ? (`${item.total_time.hours} hours `) : ''}
                      {(item.total_time.minutes) ? (`${item.total_time.minutes} minutes`) : 'N/A'}
                    </StyledTableCell >
                    <StyledTableCell align="center">
                      <Button variant="contained" onClick={() => history.push(`/details/${item.event_id}`)}>view event</Button>
                    </StyledTableCell>
                  </StyledTableRow>)}
                  <StyledTableRow>
                    <StyledTableCell colSpan="4">
                      {/*intentionally blank buffer column */}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>
                      <b>Total Volunteer Time:</b>
                    </StyledTableCell>
                    <StyledTableCell colSpan="3" align="center">
                      {grandTotalHours} hours {grandTotalMinutes} minutes
                  </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={store.oneUserEvent.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


export default UserPage;


