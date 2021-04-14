import React from 'react';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './EventDetail.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import { Card, CardHeader, CardContent, TextField, Table, TableContainer, TableHead, TableRow, TableCell, Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from '../EventCardStyle/EventCadStyle'



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

//  This page lists the details for a specific event
function EventDetail() {

    const [open, setOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    const [selectedPerson, setSelectedPerson] = useState("")
    const history = useHistory();

    const params = useParams();
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.user);
    const [search, setSearch] = useState('');
    const userEvent = useSelector((store) => store.userEvent);
    const event = useSelector((store) => store.event);
    const today = new Date();

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_EVENT', payload: { params: params.id, search: search } })
    }, [search]);


    const archiveEvent = () => {
        dispatch({ type: 'ARCHIVE_EVENT', payload: params.id });
        history.push("/events");
    }

    const unarchiveEvent = () => {
        dispatch({ type: 'UNARCHIVE_EVENT', payload: params.id })
        history.push('/events');
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpener = (user) => {
        setSelectedPerson(user)
        setUserOpen(true);
    };
    const handleCloser = () => {
        setUserOpen(false);
    };
    const removeUser = () => {
        dispatch({ type: 'UNATTEND_EVENT', payload: { userId: selectedPerson.id, eventId: store.event[0].id, params: params.id } })
        handleCloser()
    }


    const phoneFormater = (phoneNumb) => {
        let format = ('' + phoneNumb).replace(/\D/g, '');
        let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ')' + match[2] + '-' + match[3];
        }
        return phoneNumb;
    }

    const classes = useStyles()


    return (
        <>
            {event[0] &&
                <Container>
                    {/* <button ><img src={InfoIcon}/></button>  onClick should toggle a modal to desribe use of check-in */}
                    <Grid item>
                        <Button variant="contained" color="default" onClick={() => history.push(`/edit/${params.id}`)}>Edit Event</Button>
                    </Grid>
                    <Card className={classes.mobileCard}>
                            <CardHeader title={event[0].name} className={classes.cardHead} />
                        <CardContent>
                            <img src={event[0].pic_url} height='100px' />
                        </CardContent>
                        <CardContent className="descriptionText" >
                            <Grid container direction="row" justify="space-around">
                                <Grid item>
                                    <p><b>WHEN:</b></p>
                                    <p>{moment(event[0].date).format('MMMM Do YYYY')}</p> 
                                    <p>{moment(event[0].time, "HH:mm").format('hh:mm A')}</p>
                                </Grid>
                                <Grid item>
                                    <p><b>WHERE:</b></p>
                                    <p>{event[0].location}</p>
                                </Grid>
                            </Grid>
                            <p>{event[0].description}</p>
                            <p>{event[0].special_inst}</p>
                        </CardContent>
                    </Card>
                    <h2>Scheduled Participants</h2>
                    <TextField style={{ width: '25%', paddingBottom: '10px' }} label="Search Scheduled Participants" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <TableContainer component={Paper} >
                        <Table id="eventUser" className="eventUser">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Role</StyledTableCell>
                                    <StyledTableCell>Organization</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Phone Number</StyledTableCell>
                                    <StyledTableCell colSpan="2">Check In / Out</StyledTableCell>
                                    <StyledTableCell>Remove</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <tbody>
                                {userEvent[0] && userEvent.map(user => {
                                    return (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell>{user.first_name} {user.last_name}</StyledTableCell>
                                            <StyledTableCell>{user.category}</StyledTableCell>
                                            <StyledTableCell>{user.college_name}</StyledTableCell>
                                            <StyledTableCell>{user.email}</StyledTableCell>
                                            <StyledTableCell>{phoneFormater(user.phone_number)}</StyledTableCell>
                                            <StyledTableCell><Button variant="contained" disabled={(user.check_in < user.check_out || user.check_in === null) ? false : true} onClick={() => dispatch({ type: 'CHECK_IN', payload: { user_id: user.id, event_id: user.event_id, params: params.id, search: search } })}>Check In</Button></StyledTableCell>
                                            <StyledTableCell><Button variant="contained" disabled={(user.check_in < user.check_out || user.check_in === null) ? true : false} onClick={() => dispatch({ type: 'CHECK_OUT', payload: { user_id: user.id, event_id: user.event_id, params: params.id, search: search } })}>Check Out</Button></StyledTableCell>
                                            <StyledTableCell>
                                                <Button variant="contained" style={{ backgroundColor: "#FF0000", color: "white" }} onClick={() => handleClickOpener(user)}>
                                                    Remove
                                                    </Button>

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </TableContainer>
                    <br />
                    <Dialog
                        open={userOpen}
                        onClose={handleCloser}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{`Are you sure you want to remove ${selectedPerson.first_name} ${selectedPerson.last_name}?`}</DialogTitle>
                        <DialogContent >
                            <DialogContentText>
                                They will no longer be able to check into this event.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloser} variant="contained">
                                Cancel
                            </Button>
                            <Button onClick={() => removeUser()} style={{ color: "white", backgroundColor: "#FF0000" }} autoFocus>
                                Remove Volunteer
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {event[0] && user.access_level >= 2 &&
                        // <button onClick={() => archiveEvent()}>Archive Event</button>
                        <Grid container justify="space-between">
                            <Grid item>
                                <div>
                                    {store.event[0].archived === false ?
                                        <Button variant="contained" style={{ backgroundColor: "#FF0000", color: "white" }} onClick={handleClickOpen}>
                                            Archive Event
                                    </Button>
                                        :
                                        <Button variant='contained' color="primary" onClick={() => unarchiveEvent()}>
                                            Restore Event
                                    </Button>}
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">{`Are you sure you want to archive ${store.event[0].name}`}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                This event will no longer be visible to volunteers.
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClose} variant="contained">
                                                Cancel
                                        </Button>
                                            <Button onClick={handleClose, archiveEvent} variant="contained" style={{ backgroundColor: "#FF0000", color: "white" }}>
                                                Archive Event
                                    </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    component={ReactHTMLTableToExcel}
                                    id="test-table-xls-button"
                                    className="download-table-xls-button"
                                    table="eventUser"
                                    filename="Event Registrants"
                                    sheet="eventUser.xls"
                                    buttonText="Download Event Registrants">
                                </Button>
                            </Grid>
                        </Grid>
                        // <button onClick={() => unarchiveEvent()}>Unarchive Event</button>
                    }
                </Container>
            }
        </>
    );
}

export default EventDetail;