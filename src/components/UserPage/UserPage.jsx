import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//  This page is for users to view all events they subscribed to and edit their profile info.
function UserPage() {

  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT' });
  }, [])

  return (
    <>
      <h1>User Page</h1>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
      </div>
      <div>
        <ul>
          {store.event[0] && store.event.map((event) => 
          <li key={event.id}>{event.name}, {event.description}</li>)}
        </ul>
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
