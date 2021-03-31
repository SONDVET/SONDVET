import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Events.css';
import { Card, CardMedia, CardHeader, CardContent, CardActions, CardActionsArea, TextField, Button, Accordion, AccordionSummary, Typography, useMediaQuery } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useStyles } from '../EventCardStyle/EventCadStyle'
import moment from 'moment';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

//  This page lists all posted events
function Events() {

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
    const [search, setSearch] = useState('');
    const today = new Date();

    // updates whenever a search paramater is given,
    // this allows for live updates as you type a search query
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT', payload: search });
    }, [search]);

    useEffect(() => {
        dispatch({ type: 'FETCH_AFFILIATE' });
        dispatch({ type: 'FETCH_ALL_USER_EVENT' });
        dispatch({ type: 'FETCH_ALL_USER_EVENT' });
        dispatch({ type: 'FETCH_USER_GROUP' });
    }, [])

    //updates pagination list whenever event list is changed
    useEffect(() => {
        setNoOfPages(Math.ceil(store.event.length / itemsPerPage));
    }, [store.event])

    //button which will take a user to that event's details page
    const goToDetails = (eventId) => {
        //TODO: this route may need to be updated 
        history.push(`/details/${eventId}`)
    }

    // const goToGroup = (groupId) => {
    //     //TODO: this route may need to be updated 
    //     history.push(`/group_view/${groupId}`)
    // }

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

    const memberCount = (groupId) => {
        let count = 0;
        for (let item of store.userGroup) {
            if (groupId === item.group_id) {
                count++;
            }
        }
        return count;
    }


    const shrink = useMediaQuery("(min-width: 800px)")

    return (
        <>
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
                                        <CardHeader title={event.name} />
                                        <CardContent>
                                            <img src={event.pic_url} height='50px' />
                                        </CardContent>
                                        {/* {/* <Accordion>
                                    <AccordionSummary><p>Details</p></AccordionSummary> */}
                                        <CardContent className="descriptionText" >
                                            {moment(event.date).format("dddd, MMMM Do YYYY")} <br /> {moment(event.time, "HH:mm").format('hh:mm A')}
                                            <p >{event.location}</p>
                                            <p >{event.description}</p>
                                            <p >{event.special_inst} </p>
                                        </CardContent>
                                        {((moment(event.date) + 86400000) < moment(today)) ? 'event expired ' : ''}
                                        {((checkForAttend(user.id, event.id) || !store.allUserEvent) && ((moment(event.date) + 86400000) > moment(today))) && <Button variant="contained" color="primary" onClick={() => dispatch({ type: 'ATTEND_EVENT', payload: { eventId: event.id, userId: user.id } })}>Join</Button>}&nbsp;
                                        {((!checkForAttend(user.id, event.id) && store.allUserEvent) && ((moment(event.date) + 86400000) > moment(today))) && <Button variant="contained" color="secondary" onClick={() => dispatch({ type: 'UNATTEND_EVENT', payload: { eventId: event.id, userId: user.id } })}>Can't make it</Button>}  &nbsp;

                                        {(user.access_level >= 2) && <Button variant="contained"  onClick={() => goToDetails(event.id)}>Details</Button>}
                                    </Card>

                                )
                            })}
                        </div>
                        : <><h1 style={{ textAlign: 'center' }}>No Events Found</h1></>}
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