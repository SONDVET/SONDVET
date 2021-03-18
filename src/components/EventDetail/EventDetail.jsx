import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';

//  This page lists the details for a specific event
function EventDetail() {
    

    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);


    return (
        <>
        <button ><img src={InfoIcon}/></button> {/* onClick should toggle a modal to desribe use of check-in */}
        <div className="eventDetailContainer">
          
         
        </div>
        </>
    );
}

export default EventDetail;