import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

//  This page lists all posted events
function Events() {


    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);


    return (
        <>
            <h1>This is the Event List Page</h1>
            <div className="eventListContainer">


            </div>
        </>
    );
}

export default Events;