import React from 'react';
import { useSelector } from 'react-redux';
import './GroupView.css';


//  This page is for officers and admins to view users by aflliliation
function GroupView() {


    const user = useSelector((store) => store.user);


    return (
        <>
            <h1>View Groups Here!</h1>
            <div className="groupViewContainer">


            </div>
        </>
    );
}

export default GroupView;