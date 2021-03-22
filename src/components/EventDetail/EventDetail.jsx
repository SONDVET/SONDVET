import axios from 'axios';
import React from 'react';
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './EventDetail.css';


//  This page lists the details for a specific event
function EventDetail() {
    
    const params = useParams()
    const dispatch = useDispatch()
    const userEvent = useSelector((store) => store.userEvent);
    const event = useSelector((store) => store.event);
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
        dispatch({ type: 'FETCH_USER_EVENT', payload: params.id})
    }, []);

    const checkIn = (userId, eventId) => {
        axios.put('/api/event/checkin', {user_id: userId, event_id: eventId})
        dispatch({ type: 'FETCH_USER_EVENT', payload: params.id})

    }
    const checkOut = async (userId, eventId) => {
        try{
         await axios.put('/api/event/checkout', {user_id: userId, event_id: eventId})
         await axios.put('/api/event/addtotal', {user_id: userId, event_id: eventId})
        dispatch({ type: 'FETCH_USER_EVENT', payload: params.id})
        } catch (err) {
            console.log(err);
        }
    }

    const removeVolunteer = (eventId, userId) => {
        dispatch({type: 'UNATTEND_EVENT', payload: {eventId: eventId, userId: userId}});
        dispatch({ type: 'FETCH_USER_EVENT', payload: params.id});
    }

    return (
        <>    
            {/* <button ><img src={InfoIcon}/></button>  onClick should toggle a modal to desribe use of check-in */}
        <div className="eventDetailContainer">
          {event[0] &&
          <>
          <h1>{event[0].name}</h1>
          <img src = {event[0].pic_url}/>
          <p>{event[0].date}</p>
          <p>{event[0].description}</p>
          <p>{event[0].special_inst}</p>
          </>
        }
        {userEvent[0] && 
        <>
        <table className = "eventUser">
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
            return(
                <tr>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.category}</td>
                <td>{user.college_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td><button disabled={(user.check_in < user.check_out || user.check_in === null) ? false : true} onClick={() => checkIn(user.id, user.event_id)}>Check In</button></td>
                <td><button disabled={(user.check_in < user.check_out || user.check_in === null) ? true : false} onClick={() => checkOut(user.id, user.event_id)}>Check Out</button></td>
                <td><button onClick={() => removeVolunteer(user.event_id, user.id)}>Remove</button></td>
                </tr>
            )
        } )}
        </tbody>
        </table>
        </>
        } 
        </div>
        </>
    );
}

export default EventDetail;