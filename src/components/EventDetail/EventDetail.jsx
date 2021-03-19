import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

//  This page lists the details for a specific event
function EventDetail() {
    
    const params = useParams()
    const user = useSelector((store) => store.user);
    const event = useSelector((store) => store.event);


    return (
        <>
        {console.log(params)}
        <h1>This is the Event Details Page</h1>
            {/* <button ><img src={InfoIcon}/></button>  onClick should toggle a modal to desribe use of check-in */}
        <div className="eventDetailContainer">
          
         
        </div>
        </>
    );
}

export default EventDetail;