import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

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