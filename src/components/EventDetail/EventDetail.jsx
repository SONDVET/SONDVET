import axios from 'axios';
import React from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './EventDetail.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';


//  This page lists the details for a specific event
function EventDetail() {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const history = useHistory();

    const params = useParams()
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)
    const userEvent = useSelector((store) => store.userEvent);
    const event = useSelector((store) => store.event);
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
        dispatch({ type: 'FETCH_USER_EVENT', payload: params.id })
    }, []);


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



    return (

        <>
            {/* <button ><img src={InfoIcon}/></button>  onClick should toggle a modal to desribe use of check-in */}
            <div className="eventDetailContainer">

                {event[0] && user.access_level >= 2 ?
                    <>
                        <h1>{event[0].name}</h1>
                        <img src={event[0].pic_url} />
                        <p>{event[0].date}</p>
                        <p>{event[0].time}</p>
                        {/* <p>{time}</p> */}
                        <p>{event[0].description}</p>
                        <p>{event[0].special_inst}</p>
                    </>
                    :
                    <>
                        <h1>404</h1>
                        <h2>Not Found</h2>
                    </>
                }
                {userEvent[0] && user.access_level >= 2 &&
                    <>
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="eventUser"
                            filename="Event Registrants"
                            sheet="eventUser.xls"
                            buttonText="Download Event Registrants" />
                        <table id="eventUser" className="eventUser">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Organization</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th colSpan="2">Check In / Out</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userEvent.map(user => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.first_name} {user.last_name}</td>
                                            <td>{user.category}</td>
                                            <td>{user.college_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone_number}</td>
                                            <td><button disabled={(user.check_in < user.check_out || user.check_in === null) ? false : true} onClick={() => dispatch({ type: 'CHECK_IN', payload: { user_id: user.id, event_id: user.event_id, params: params.id } })}>Check In</button></td>
                                            <td><button disabled={(user.check_in < user.check_out || user.check_in === null) ? true : false} onClick={() => dispatch({ type: 'CHECK_OUT', payload: { user_id: user.id, event_id: user.event_id, params: params.id } })}>Check Out</button></td>
                                            <td><button onClick={() => dispatch({ type: 'UNATTEND_EVENT', payload: { eventId: user.event_id, userId: user.id, params: params.id } })}>Remove</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {event[0] && user.access_level >= 2 &&
                            // <button onClick={() => archiveEvent()}>Archive Event</button>
                    <div>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Delete Event
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{"Are you sure?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this event?  If you do they will be set to "archived" and only Admins will be able to retrive them.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Disagree and Cancel
                                </Button>
                                <Button onClick={handleClose, archiveEvent} color="primary" autoFocus>
                                    Agree and Archive Event
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                            // <button onClick={() => unarchiveEvent()}>Unarchive Event</button>
                        }
                    </>
                }
            </div>
        </>
    );
}

export default EventDetail;