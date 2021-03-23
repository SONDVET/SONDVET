import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './Events.css';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionsArea from '@material-ui/core/CardActionArea';
import Pagination from'@material-ui/lab/Pagination';

//  This page lists all posted events
function Events() {


    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);


    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT' });
        dispatch({type: 'FETCH_AFFILIATE'});
        dispatch({type: 'FETCH_ALL_USER_EVENT'});
      }, [])

      //updates pagination list whenever event list is changed
      useEffect(() => {
        setNoOfPages(Math.ceil(store.event.length / itemsPerPage));
      }, [store.event])

      //button which will take a user to that event's details page
      const goToDetails = (eventId) => {
          //TODO: this route may need to be updated 
          history.push(`/details/${eventId}`)
      }

      const goToGroup = (groupId) => {
            //TODO: this route may need to be updated 
          history.push(`/group_view/${groupId}`)
      }

      const checkForAttend = (userId, eventId) => {
          for (let item of store.allUserEvent){
              if (item.user_id === userId && item.event_id === eventId)
              return false;
          }
          return true;
      }

      //for use of event list pagination
      const [page, setPage] = useState(1);
      const itemsPerPage = 6;
      const [noOfPages, setNoOfPages] = useState(Math.ceil(store.event.length / itemsPerPage))

      const handleChange = (event, value) => {
          setPage(value);
      }

    return (
        <>
            <h1>This is the Event List Page</h1>
            <div className="eventListContainer">
                <div>
                    {/* loops over every event in the event store and displays them in a div */}
                    {(store.event[0]) && store.event.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((event) =>
                        <Card key={event.id}> <CardHeader title={event.name}/> <img src={event.pic_url} height='50px'/> <CardContent> {event.description} {event.location} {event.special_inst} </CardContent>
                           {(checkForAttend(user.id, event.id) || !store.allUserEvent) && <button onClick={() => dispatch({type: 'ATTEND_EVENT', payload: {eventId: event.id, userId: user.id}})}>Join</button>}
                           {(!checkForAttend(user.id, event.id) && store.allUserEvent) ? <button onClick={() => dispatch({type: 'UNATTEND_EVENT', payload: {eventId: event.id, userId: user.id}})}>Can't make it</button>: ''}
                            {(user.access_level >= 2) && <button onClick={() => goToDetails(event.id)}>Details</button>}
                        </Card>)}
                        <Pagination
                            count={noOfPages}
                            shape="rounded"
                            variant="outlined"
                            onChange={handleChange}
                            defaultPage={1}
                            showFirstButton
                            showLastButton />
                </div>
            </div>
            {(user.access_level >1) && <div className="groupListContainer">
                        <h1>Hello privileged user!</h1>
                        <table>
                            <tr>
                                <th>Group</th>
                                <th>Total Members</th>
                                <th></th>
                            </tr>
                            {(store.affiliate[0]) && store.affiliate.map((affiliate) => 
                            <tr>
                                <td>{affiliate.college_name}</td>
                                <td>placeholder</td>
                                <td><button onClick={() => goToGroup(affiliate.id)}>View</button></td>
                            </tr>
                            )}
                        </table>
            </div>}
        </>
    );
}

export default Events;