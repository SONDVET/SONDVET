import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UserAdminView.css";
import { useHistory, useParams } from 'react-router-dom'

//  This page is for users to view all events they subscribed to and edit their profile info.
function UserAdminView() {

  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(store => store);
  const user = useSelector((store) => store.oneUser[0]);
  const params = useParams()

  useEffect(() => {
    dispatch({ type: 'FETCH_AFFILIATE' });
    dispatch({ type: 'FETCH_ONE_USER', payload: params.id})
    dispatch({ type: 'FETCH_ONE_USER_EVENT', payload: params.id });
  }, [])
  useEffect(() => {
    grandTotalTime();
  }, [store.oneUserEvent])

  const [edit, setEdit] = useState(true);
  


  const setEditMode = () => {
    console.log('clicked edit mode', edit);
    if (edit === true) {
      return setEdit(false);
    }
    else if (!edit === true) {
      return setEdit(true);
    }
  };


  const updateInfo = () => {
    console.log(person)
    dispatch({ type: 'RE_REGISTER', payload: person })

    setEdit(false);
  }

  const [grandTotalHours, setGrandTotalHours] = useState(0)
  const [grandTotalMinutes, setGrandTotalMinutes] = useState(0)

  const grandTotalTime = (time) => {
    let hours = 0
    let minutes = 0
    for (let item of store.oneUserEvent) {
      if (item.total_time.days) {
        hours += item.total_time.days * 24
      }
      if (item.total_time.hours) {
        hours += item.total_time.hours
      }
      if (item.total_time.minutes) {
        minutes += item.total_time.minutes
      }
    }
    setGrandTotalHours(hours);
    setGrandTotalMinutes(minutes);
  }
   
       
   
    const [person, setPerson] = (store.oneUser[0]) ? 
    useState({
    id: store.oneUser[0].id,
    category: store.oneUser[0].category,
    first_name: store.oneUser[0].first_name,
    last_name: store.oneUser[0].last_name,
    email: store.oneUser[0].email,
    phone_number: store.oneUser[0].phone_number,
    address: store.oneUser[0].address,
    city: store.oneUser[0].city,
    state: store.oneUser[0].state,
    zip: store.oneUser[0].zip,
    dob: store.oneUser[0].dob,
    involved_w_sond_since: store.oneUser[0].involved_w_sond_since,
    college_id: store.oneUser[0].college_id,
    password: store.oneUser[0].password,
    access_level: store.oneUser[0].access_level
  })
   :
   useState({
    id: 0,
    category: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: 0,
    address: "",
    city: "",
    state:"",
    zip: "",
    dob: "",
    involved_w_sond_since: "",
    college_id: 1,
    password: "",
    access_level: 1
   })
   


  return (
    <>
        
    
       {store.oneUser[0] && store.user.access_level === 3 ?
        <>
      <h1>User Page</h1>
      <div className="container">
        <h2>{user.last_name}, {user.first_name}</h2>
        <p>{user.email}</p>
      </div>

      <h3>Personal Information:</h3>
      <div className='personalInfoContainer'>
        <div className="personInfoItem">Category</div>                 <div className="personInfoItem">{edit ? <div>{user.category}</div> : <input defaultValue={user.category} onChange={(e) => setPerson({ ...person, category: e.target.value })} />}</div>
        <div className="personInfoItem">First Name</div>               <div className="personInfoItem">{edit ? <div>{user.first_name}</div> : <input defaultValue={user.first_name} onChange={(e) => setPerson({ ...person, first_name: e.target.value })} />}</div>
        <div className="personInfoItem">Last Name</div>                <div className="personInfoItem">{edit ? <div>{user.last_name}</div> : <input defaultValue={user.last_name} onChange={(e) => setPerson({ ...person, last_name: e.target.value })} />}</div>
        <div className="personInfoItem">Email</div>                    <div className="personInfoItem">{edit ? <div>{user.email}</div> : <input defaultValue={user.email} onChange={(e) => setPerson({ ...person, username: e.target.value })} type="email" />}</div>
        <div className="personInfoItem">Phone</div>                    <div className="personInfoItem">{edit ? <div>{user.phone_number}</div> : <input defaultValue={user.phone_number.split('-').join('')} onChange={(e) => setPerson({ ...person, phone_number: e.target.value })} type="number" />}</div>
        <div className="personInfoItem">Address</div>                  <div className="personInfoItem">{edit ? <div>{user.address}</div> : <input defaultValue={user.address} onChange={(e) => setPerson({ ...person, address: e.target.value })} />}</div>
        <div className="personInfoItem">City</div>                     <div className="personInfoItem">{edit ? <div>{user.city}</div> : <input defaultValue={user.city} onChange={(e) => setPerson({ ...person, city: e.target.value })} />}</div>
        <div className="personInfoItem">State</div>                    <div className="personInfoItem">{edit ? <div>{user.state}</div> : <input defaultValue={user.state} onChange={(e) => setPerson({ ...person, state: e.target.value })} />}</div>
        <div className="personInfoItem">Zip</div>                      <div className="personInfoItem">{edit ? <div>{user.zip}</div> : <input defaultValue={user.zip} onChange={(e) => setPerson({ ...person, zip: e.target.value })} type="number" />}</div>
        <div className="personInfoItem">Date of Birth</div>            <div className="personInfoItem">{edit ? <div>{user.dob.substring(0, 10)}</div> : <input value={user.dob.substring(0, 10)} onChange={(e) => setPerson({ ...person, dob: e.target.value })} type="date" />}</div>
        <div className="personInfoItem">Involved with SOND Since</div> <div className="personInfoItem">{edit ? <div>{user.involved_w_sond_since.substring(0, 10)}</div> : <input value={user.involved_w_sond_since.substring(0, 10)} onChange={(e) => setPerson({ ...person, involved_w_sond_since: e.target.value })} type="date" />}</div>
        <div className="personInfoItem">Affiliation/College</div>      <div className="personInfoItem">{edit ? <div>{user.college_id}</div> : <input defaultValue={user.college_id} onChange={(e) => setPerson({ ...person, college_id: e.target.value })} type="number" />}</div>
        {/* edit button will conidtionally render the divs into inputs, Save will dispatch the new data */}
        <button onClick={() => setEditMode()} >Edit Info</button> <button onClick={() => updateInfo()} >save</button>
      </div>
      <div className="userEventsContainer">
        <table>
          <tr>
            <th>
              Event
            </th>
            <th>
              Event Date
            </th>
            <th>
              Attendance
            </th>
            <th>
              {/* purposefully empty*/}
            </th>
          </tr>
          {(store.oneUserEvent[1]) && store.oneUserEvent.map((item) => <tr key={item.id}>
            <td>
              {item.name}
            </td>
            <td>
              {item.date.substring(0, 10)}
            </td>
            <td>
              {(item.total_time.hours) ? (`${item.total_time.hours} hours`) : ''}
              {(item.total_time.minutes) ? (`${item.total_time.minutes} minutes`) : 'N/A'}
            </td>
            <td>
              <button onClick={() => history.push(`/details/${item.event_id}`)}>view event</button>
            </td>
          </tr>)}
          <tr>
            <td colspan="4">
              {/*intentionally blank buffer column */}
            </td>
          </tr>
          <tr>
            <td>
              Total Volunteer Time:
            </td>
            <td colspan="3">
              {grandTotalHours} hours {grandTotalMinutes} minutes
            </td>
          </tr>
        </table>
      </div>
    </>
    :
    <> 
        <h1>404</h1>
        <h1>Not Found</h1>
    </>
    }
    </>
  );
}


// this allows us to use <App /> in index.js
export default UserAdminView;