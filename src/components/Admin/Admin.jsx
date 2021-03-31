import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container, Grid, TablePagination } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useStyles } from '../EventCardStyle/EventCadStyle'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './Admin.css';

function Admin() {

  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(store => store);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
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
    dispatch({ type: "FETCH_ARCHIVED" })
    dispatch({ type: "FETCH_ALL" })
  }, [])

  const goToUser = (user) => {
    console.log(`You want to view details for person with id of ${user}`)
    history.push(`/userdetails/${user}`)
  };

  return (
    <>
      <Container>
        <h1 className="admin_header">Admin</h1>
        <div className="table_header">
          <h2>All Users:</h2>
        </div>
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
                <StyledTableRow key={user.id} onClick={() => goToUser(user.id)}>
                  <StyledTableCell>{user.first_name} {user.last_name}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.phone_number}</StyledTableCell>
                  <StyledTableCell>{user.address}</StyledTableCell>
                  <StyledTableCell>{user.city}</StyledTableCell>
                  <StyledTableCell>{user.state}</StyledTableCell>
                  <StyledTableCell>{user.zip}</StyledTableCell>
                  <StyledTableCell><Button variant="contained">View User</Button></StyledTableCell>
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
        {/* END ALL USERS */}
        <div className="table_header">
          <h2>Archived Users:</h2>
        </div>
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
                <StyledTableRow key={user.id} onClick={() => goToUser(user.id)}>
                  <StyledTableCell>{user.first_name} {user.last_name}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.phone_number}</StyledTableCell>
                  <StyledTableCell>{user.address}</StyledTableCell>
                  <StyledTableCell>{user.city}</StyledTableCell>
                  <StyledTableCell>{user.state}</StyledTableCell>
                  <StyledTableCell>{user.zip}</StyledTableCell>
                  <StyledTableCell><Button variant="contained">View User</Button></StyledTableCell>
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