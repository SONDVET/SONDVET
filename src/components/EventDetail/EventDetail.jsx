import React from 'react';
import { useSelector } from 'react-redux';
//import InfoIcon from '@material-ui/icons/Info';

//  This page lists the details for a specific event
function EventDetail() {
    

    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);


    return (
        <>
        <h1>This is the Event Details Page</h1>
            {/* <button ><img src={InfoIcon}/></button>  onClick should toggle a modal to desribe use of check-in */}
        <div className="eventDetailContainer">
          
         
        </div>
        </>
    );
}

export default EventDetail;