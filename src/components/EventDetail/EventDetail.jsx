import React from 'react';
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './EventDetail.css';


//  This page lists the details for a specific event
function EventDetail() {
    
    const params = useParams()
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user);
    const event = useSelector((store) => store.event);
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
    }, []);

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
         
        </div>
        </>
    );
}

export default EventDetail;