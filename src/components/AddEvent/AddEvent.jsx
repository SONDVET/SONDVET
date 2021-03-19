import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

//  This page is for officers and admins to create new events
function AddEvent() {


    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);


    return (
        <>
            <h1>Add New Events Here!</h1>
            <div className="addEventContainer">


            </div>
        </>
    );
}

export default AddEvent;