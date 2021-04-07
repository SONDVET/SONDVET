import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Events.css';
import { Card, CardHeader, CardContent, TextField, Button, useMediaQuery, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useStyles } from '../EventCardStyle/EventCadStyle'
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';


//  This page lists all posted events
function Events() {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.user);
    const [search, setSearch] = useState('');
    const today = new Date();
    const [groupRep, setGroupRep] = useState(0);
    const [eventId, setEventId] = useState(0);

    // updates whenever a search paramater is given,
    // this allows for live updates as you type a search query
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT', payload: search });
    }, [search]);

    useEffect(() => {
        dispatch({ type: 'FETCH_AFFILIATE' });
        dispatch({ type: 'FETCH_ALL_USER_EVENT' });
        dispatch({ type: 'FETCH_ONE_USER_GROUP', payload: user.id });
    }, [])

    //updates pagination list whenever event list is changed
    useEffect(() => {
        setNoOfPages(Math.ceil(store.event.length / itemsPerPage));
    }, [store.event])

    //button which will take a user to that event's details page
    const goToDetails = (eventId) => {
        history.push(`/details/${eventId}`)
    }

    const checkForAttend = (userId, eventId) => {
        for (let item of store.allUserEvent) {
            if (item.user_id === userId && item.event_id === eventId)
                return false;
        }
        return true;
    }

    //for use of event list pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;
    const [noOfPages, setNoOfPages] = useState(Math.ceil(store.event.length / itemsPerPage))

    const handleChange = (event, value) => {
        setPage(value);
    }
    const classes = useStyles()

    const handleClickOpen = (selectId) => {
        setEventId(selectId)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const shrink = useMediaQuery("(min-width: 1120px)")

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Pick a group"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        It looks like you are a member of more than one group.  Which group would you like to represent for this event?
                                                        </DialogContentText>
                    <Select value={groupRep} onChange={(e) => setGroupRep(e.target.value)}>
                        <MenuItem value='0' disabled >Select one</MenuItem>
                        {(store.userGroup[0]) && store.userGroup.map((group) =>
                            <MenuItem key={group.id} value={group.group_id}>{group.college_name}</MenuItem>
                        )}</Select>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                                                        </Button>
                    <Button onClick={() => { setOpen(false), dispatch({ type: 'ATTEND_EVENT', payload: { eventId: eventId, userId: user.id, groupId: groupRep } }) }} color="primary" autoFocus disabled={groupRep === 0}>
                        Confirm and Join
                    </Button>

                </DialogActions>
            </Dialog>
            <div className="eventsHead">
                <h2 className="headText">Events</h2>
                <p className="headText">Click on "Join" to volunteer for an event.  A list of events you have volunteered for will appear on your Profile. <br></br> Clicking  "Can't Make It" removes you as a volunteer for that event.
                </p>
            </div>
            <div className='searchWrap'>
                <TextField className={classes.searchBar} label="Search Events" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="eventListContainer">
                <div>
                    {store.event.length > 0 ?
                        <div className="cardWrap">
                            {/* loops over every event in the event store and displays them in a div */}
                            {(store.event[0]) && store.event.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((event) => {
                                return (
                                    <Card key={event.id} className={`${shrink ? classes.eventCard : classes.mobileCard}`}>
                                        <CardHeader className={classes.cardHead} title={<b>{event.name}</b>} subheader={<div className={classes.subheader}><p className={classes.subheader}>{moment(event.date).format("dddd, MMMM Do YYYY")}</p> <p className={classes.subheader}>{moment(event.time, "HH:mm").format('hh:mm A')}</p></div>}/>
                                        <CardContent className={classes.descriptionText}>
                                            <img src={event.pic_url} height='65px' />
                                                    <p >{event.description}</p>
                                                    <p >{event.special_inst} </p>
                                        </CardContent>
                                        {((moment(event.date) + 86400000) < moment(today)) ? <Button className={classes.cardButton} variant="contained" disabled>event expired </Button> : ''}
                                        {((checkForAttend(user.id, event.id) || !store.allUserEvent) && ((moment(event.date) + 86400000) > moment(today)) && store.userGroup.length >= 1) && ((store.userGroup[0]) && (store.userGroup.length > 1) ?
                                            <Button variant="contained" color="primary" className={classes.cardButton} onClick={() => handleClickOpen(event.id)}>Join Event</Button>
                                            : <Button variant="contained" color="primary" className={classes.cardButton} onClick={() => dispatch({ type: 'ATTEND_EVENT', payload: { eventId: event.id, userId: user.id, groupId: store.userGroup[0].group_id } })}>Join Event</Button>)}&nbsp;
                                        {((!checkForAttend(user.id, event.id) && store.allUserEvent) && ((moment(event.date) + 86400000) > moment(today))) && <Button variant="contained" className={classes.cardButton} style={{color:"white", backgroundColor:"#FF0000"}} onClick={() => dispatch({ type: 'UNATTEND_EVENT', payload: { eventId: event.id, userId: user.id } })}>Can't make it</Button>}  &nbsp;

                                        {(user.access_level >= 2) && <Button className={classes.cardButton} variant="contained" onClick={() => goToDetails(event.id)}>Details</Button>}
                                    </Card>
                                )
                            })}
                        </div>
                        : <><h1 style={{ textAlign: 'center' }}>No Events Found</h1></>}
                    <br></br>
                    <br></br>
                    <div className="pageWrap">
                        <Pagination
                            className="pagination"
                            count={noOfPages}
                            shape="rounded"
                            variant="outlined"
                            onChange={handleChange}
                            defaultPage={1}
                            showFirstButton
                            showLastButton />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Events;