import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container, Grid, TablePagination, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import './Admin.css';

function Admin() {

  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(store => store);

  const [search, setSearch] = useState('');
  const [searchArch, setSearchArch] = useState('')
  const [searchArchEvents, setSearchArchEvents] = useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  useEffect(() => {
    dispatch({ type: "FETCH_ARCHIVED", payload: searchArch})
  }, [searchArch])

  useEffect(() => {
    dispatch({ type: "FETCH_ALL", payload: search})
  }, [search])

  useEffect(() => {
    dispatch({ type: "FETCH_ARCHIVED_EVENTS", payload: searchArchEvents}) 
  }, [searchArchEvents])

  const goToUser = (user) => {
    history.push(`/userdetails/${user}`)
  };

  const goToEvent = (event) => {
    history.push(`/details/${event}`)
  }

  const phoneFormater = (phoneNumb) => {
    let format = ('' + phoneNumb).replace(/\D/g, '');
    let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ')' + match[2] + '-' + match[3];
    }
    return phoneNumb;
  }


  return (
    <>
      <Container>
        <h1 className="admin_header">Admin</h1>
        <h3 className="headText">All users profiles can be accessed from here</h3>
        <p className="headText"> <br></br> Clicking  "View User" and then "Edit Info" from the user's page will allow you to archive or unarchive any user as well as adjust any of their personal information.
                </p>
        <div className="table_header">
          <h2>Active Users:</h2>
        </div> <br/>
        <TextField style ={{width:"35%", paddingBottom:"10px"}} label="Search Active Users by Last Name" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell> Name </StyledTableCell>
                <StyledTableCell> Email </StyledTableCell>
                <StyledTableCell> Phone Number </StyledTableCell>
                <StyledTableCell> Address </StyledTableCell>
                <StyledTableCell> City </StyledTableCell>
                <StyledTableCell> State </StyledTableCell>
                <StyledTableCell> Zip Code </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {(store.allUsers[0] && store.allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) =>
                <StyledTableRow key={user.id} >
                  <StyledTableCell>{user.first_name} {user.last_name}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{phoneFormater(user.phone_number)}</StyledTableCell>
                  <StyledTableCell>{user.address}</StyledTableCell>
                  <StyledTableCell>{user.city}</StyledTableCell>
                  <StyledTableCell>{user.state}</StyledTableCell>
                  <StyledTableCell>{user.zip}</StyledTableCell>
                  <StyledTableCell><Button variant="contained" onClick={() => goToUser(user.id)}>View User</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={store.allUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
        <br></br>
        <br></br>
        {/* END ALL USERS */}
        <div className="table_header">
          <h2>Archived Users:</h2>
        </div>
        <TextField style ={{width:"35%", paddingBottom:"10px"}} label="Search Archived Users by Last Name" value={searchArch} onChange={(e) => setSearchArch(e.target.value)}/>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell> Name </StyledTableCell>
                <StyledTableCell> Email </StyledTableCell>
                <StyledTableCell> Phone Number </StyledTableCell>
                <StyledTableCell> Address </StyledTableCell>
                <StyledTableCell> City </StyledTableCell>
                <StyledTableCell> State </StyledTableCell>
                <StyledTableCell> Zip Code </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {(store.archivedUsers[0] && store.archivedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) =>
                <StyledTableRow key={user.id} >
                  <StyledTableCell>{user.first_name} {user.last_name}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{phoneFormater(user.phone_number)}</StyledTableCell>
                  <StyledTableCell>{user.address}</StyledTableCell>
                  <StyledTableCell>{user.city}</StyledTableCell>
                  <StyledTableCell>{user.state}</StyledTableCell>
                  <StyledTableCell>{user.zip}</StyledTableCell>
                  <StyledTableCell><Button variant="contained" onClick={() => goToUser(user.id)}>View User</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={store.archivedUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>

        <div className="table_header">
          <h2>Archived Events:</h2>
        </div>
        <TextField style ={{width:"35%", paddingBottom:"10px"}} label="Search Archived Events" value={searchArchEvents} onChange={(e) => setSearchArchEvents(e.target.value)}/>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell> Event </StyledTableCell>
                <StyledTableCell> Date </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {(store.archivedEvents[0] && store.archivedEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) =>
                <StyledTableRow key={event.id} >
                  <StyledTableCell>{event.name}</StyledTableCell>
                  <StyledTableCell>{moment(event.date).format(" MMMM Do YYYY")}</StyledTableCell>
                  <StyledTableCell><Button variant="contained" onClick={() => goToEvent(event.id)}>View Details</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={store.archivedUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </>
  )
}

export default Admin