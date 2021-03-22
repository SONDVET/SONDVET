import React from 'react';
import { useSelector } from 'react-redux';
import './AddEvent.css';


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