import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

//  This page is for users to view all events they subscribed to and edit their profile info.
function UserPage() {


  const user = useSelector((store) => store.user);


  return (
    <>
    <h1>User Page</h1>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
