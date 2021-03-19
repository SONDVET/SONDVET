import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

//  This page lists all posted events
function Events() {


    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);


    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT' });
      }, [])

      //button which will take a user to that event's details page
      const goToDetails = (eventId) => {
          //TODO: this route may need to be updated 
          history.push(`/eventdetail/${eventId}`)
      }

    return (
        <>
            <h1>This is the Event List Page</h1>
            <div className="eventListContainer">
                <div>
                    {/* loops over every event in the event store and displays them in a div */}
                    {store.event[0] && store.event.map((event) =>
                        <div key={event.id}> <img src={event.pic_url} height='50px' /> {event.name} {event.description} {event.location} {event.special_inst}
                            <button>Join</button>
                            <button>Can't make it</button>
                            {(user.access_level >= 2) && <button onClick={() => goToDetails(event.id)}>Details</button>}
                        </div>)}
                </div>
            </div>
        </>
    );
}

export default Events;