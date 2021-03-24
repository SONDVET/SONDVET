import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Events.css';
import { Card, CardMedia, CardHeader, CardContent, CardActions, CardActionsArea, TextField, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useStyles } from '../EventCardStyle/EventCadStyle'
//  This page lists all posted events
function Events() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.user);
    const [search, setSearch] = useState('')

    // updates whenever a search paramater is given,
    // this allows for live updates as you type a search query
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT', payload: search });
        dispatch({ type: 'FETCH_AFFILIATE' });
        dispatch({ type: 'FETCH_ALL_USER_EVENT' });
    }, [search]);

    //updates pagination list whenever event list is changed
    useEffect(() => {
        setNoOfPages(Math.ceil(store.event.length / itemsPerPage));
    }, [store.event])

    //button which will take a user to that event's details page
    const goToDetails = (eventId) => {
        //TODO: this route may need to be updated 
        history.push(`/details/${eventId}`)
    }

    const goToGroup = (groupId) => {
        //TODO: this route may need to be updated 
        history.push(`/group_view/${groupId}`)
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
    return (
        <>
            <TextField className="eventSearch" label="Search Events" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="eventListContainer">
                <div>
                    <div className="cardWrap">
                        {/* loops over every event in the event store and displays them in a div */}
                        {(store.event[0]) && store.event.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((event) =>
                            <Card key={event.id} className={classes.eventCard}>
                                <CardHeader title={event.name} /> <img src={event.pic_url} height='50px' />
                                <CardContent> {event.description} {event.location} {event.special_inst} </CardContent>
                                {(checkForAttend(user.id, event.id) || !store.allUserEvent) && <Button variant="outlined" onClick={() => dispatch({ type: 'ATTEND_EVENT', payload: { eventId: event.id, userId: user.id } })}>Join</Button>}
                                {(!checkForAttend(user.id, event.id) && store.allUserEvent) ? <Button variant="outlined" onClick={() => dispatch({ type: 'UNATTEND_EVENT', payload: { eventId: event.id, userId: user.id } })}>Can't make it</Button> : ''}
                                {(user.access_level >= 2) && <Button variant="outlined" onClick={() => goToDetails(event.id)}>Details</Button>}
                            </Card>)}
                    </div>
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
            {(user.access_level > 1) && <div className="groupListContainer">
                <h1>Hello privileged user!</h1>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="SO College Members"
                    filename="SO College Members"
                    sheet="eventUser.xls"
                    buttonText="Download SO College Members" />
                <table id="SO College Members">
                    <tbody>
                        <tr>
                            <th>Group</th>
                            <th>Total Members</th>
                            <th></th>
                        </tr>
                        {(store.affiliate[0]) && store.affiliate.map((affiliate) =>
                            <tr key={affiliate.id}>
                                <td>{affiliate.college_name}</td>
                                <td>placeholder</td>
                                <td><button onClick={() => goToGroup(affiliate.id)}>View</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>}
        </>
    );
}

export default Events;