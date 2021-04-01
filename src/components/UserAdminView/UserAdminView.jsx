import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./UserAdminView.css";
import { useHistory, useParams } from 'react-router-dom'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment';

//Styling for material tables
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: '20px'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

//  This page is for users to view all events they subscribed to and edit their profile info.
function UserAdminView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(store => store);
    const user = useSelector((store) => store.oneUser[0]);
    const params = useParams()

    useEffect(() => {
        dispatch({ type: 'FETCH_AFFILIATE' });
        dispatch({ type: 'FETCH_ONE_USER', payload: params.id })
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
            setPerson({
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
            access_level: store.oneUser[0].access_level,
            archived: store.oneUser[0].archived
        })
            return setEdit(true);
        }
    };

    const updateInfo = () => {
        console.log(person)
        dispatch({ type: 'RE_REGISTER', payload: person })
        setEdit(true);
    }

    // Sends dispatch to user router.put to archive user
    const archiveUser = () => {
        dispatch({ type: 'ARCHIVE_USER', payload: params.id });
        history.push("/admin");
    }

    // Sends dispatch to user router.put to unarchive user
    const unarchiveUser = () => {
        dispatch({ type: 'UNARCHIVE_USER', payload: params.id });
        history.push("/admin");
    }

    const phoneFormater = (phoneNumb) => {
        let format = ('' + phoneNumb).replace(/\D/g, '');
        let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ')' + match[2] + '-' + match[3];
        }
        return phoneNumb;
    }

    const isAMember = (userId, groupId) => {
        for (let item of store.userGroup) {
            if (item.user_id === userId && item.group_id === groupId)
                return true
        }
        return false
    }

    const toggleJoin = (userId, groupId, command) => {
        if (command === 'join') {
            dispatch({ type: 'ADD_USER_GROUP', payload: { user_id: userId, group_id: groupId } })
        }
        if (command === 'leave') {
            dispatch({ type: 'REMOVE_USER_GROUP', payload: { user_id: userId, group_id: groupId } })
        }
    }

    const [grandTotalHours, setGrandTotalHours] = useState(0)
    const [grandTotalMinutes, setGrandTotalMinutes] = useState(0)

    // defines person with empty values to avoid 
    // error caused by setting it to a redux value
    // before the redux store is defined 
    const [person, setPerson] = useState({
        id: 0,
        category: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: 0,
        address: "",
        city: "",
        state: "",
        zip: "",
        dob: "",
        involved_w_sond_since: "",
        college_id: 1,
        password: "",
        access_level: 1,
        archived: false
    })
   
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

    //get run when the edit button is pushed
    //to ensure oneUser store is populated before values are assinged       
    if (store.oneUser[0] && person.id === 0){        
        setPerson({
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
            access_level: store.oneUser[0].access_level,
            archived: store.oneUser[0].archived
        })
    }


  
      

    //used to convert access level number to readable title
    const accessRanks = ["Volunteer", "Officer", "Admin"]

    return (

        <>
            {store.oneUser[0] && store.user.access_level > 1 ?
                <>

                    <Container maxWidth="xl">
                        <Grid container direction="row" spacing={3} justify="space-between" alignItems="center">
                            <Grid item>
                                <p className="name">{person.first_name} {person.last_name}</p>
                                <p className="mail">{person.email}</p>

                                {(store.user.access_level > 2) &&
                                    <div className="rankContainer">
                                        <div>Rank: &nbsp;</div>  <div clasname="rank">{edit ? <div><b>{accessRanks[user.access_level - 1]}</b></div> : <select defaultValue={user.access_level} onChange={(e) => setPerson({ ...person, access_level: e.target.value })}><option value="1">Volunteer</option><option value="2">Officer</option><option value="3">Admin</option></select>}</div>
                                    </div>}
                                {(user.archived) && <p className="archived">This user is currently archived</p>}
                            </Grid>
                            <Grid item>
                                {store.user.access_level > 2 &&
                                <Button variant="contained" color="default" onClick={() => setEditMode()}>{edit ? 'Edit Info' : 'cancel edit'}</Button> 
                                }
                                {!edit ? <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => updateInfo()} >save</Button> : ''}
                                
                                <div className="archive-control">
                                    {!edit ? ((!user.archived) && <Button variant="contained" style={{backgroundColor: "#FF0000", color:"white"}} onClick={() => archiveUser()}>Archive User</Button>) : ''}
                                    {!edit ? ((user.archived) && <Button variant="contained" color="default" onClick={() => unarchiveUser()}>Restore User</Button>) : ''}
                                </div>
                            </Grid>
                        </Grid>

                        <br />
                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                            {/* Personal Information Table */}
                            <Grid item lg={5}>
                                <TableContainer className='personalInfoContainer' component={Paper} >
                                    <Table size="small">
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell colSpan="2" align="center">Personal Information</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Category</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.category}</div> : <input defaultValue={person.category} onChange={(e) => setPerson({ ...person, category: e.target.value })} />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>First Name</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.first_name}</div> : <input key="name" value={person.first_name} onChange={(e) => setPerson({ ...person, first_name: e.target.value })} />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Last Name</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.last_name}</div> : <input defaultValue={person.last_name} onChange={(e) => setPerson({ ...person, last_name: e.target.value })} />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Email</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.email}</div> : <input defaultValue={person.email} onChange={(e) => setPerson({ ...person, username: e.target.value })} type="email" />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Phone</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{phoneFormater(user.phone_number)}</div> : <input defaultValue={person.phone_number.split('-').join('')} maxLength="10" onChange={(e) => setPerson({ ...person, phone_number: e.target.value })} type="tel" />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Address</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.address}</div> : <input defaultValue={person.address} onChange={(e) => setPerson({ ...person, address: e.target.value })} />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>City</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.city}</div> : <input defaultValue={person.city} onChange={(e) => setPerson({ ...person, city: e.target.value })} />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>State</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.state}</div> : <input defaultValue={person.state} onChange={(e) => setPerson({ ...person, state: e.target.value })} />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Zip</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.zip}</div> : <input defaultValue={person.zip} onChange={(e) => setPerson({ ...person, zip: e.target.value })} type="number" />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Date of Birth</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.dob.substring(0, 10)}</div> : <input defaultValue={person.dob.substring(0, 10)} onChange={(e) => setPerson({ ...person, dob: e.target.value })} type="date" />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Involved with SOND Since</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>{person.involved_w_sond_since.substring(0, 10)}</div> : <input defaultValue={person.involved_w_sond_since.substring(0, 10)} onChange={(e) => setPerson({ ...person, involved_w_sond_since: e.target.value })} type="date" />}</StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Password</b></StyledTableCell>
                                                <StyledTableCell>{edit ? <div>--hidden--</div> : <input placeholder="Enter New Password" onChange={(e) => setPerson({ ...person, password: e.target.value })} />}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>

                                </TableContainer>
                            </Grid>

                            {/* Group Table */}
                            <Grid item md={4}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell colSpan="3" align="center">Groups</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow>
                                                <StyledTableCell><b>Name</b></StyledTableCell>
                                                <StyledTableCell><b>Joined?</b></StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                            </StyledTableRow>
                                            {(store.affiliate[0]) && store.affiliate.map((group) => <StyledTableRow key={group.id}>
                                                <StyledTableCell><b>{group.college_name}</b></StyledTableCell>
                                                <StyledTableCell>{(store.userGroup[0]) && isAMember(user.id, group.id) ? <CheckCircleIcon color='primary' /> : <HighlightOffIcon />} </StyledTableCell>
                                                <StyledTableCell>{((store.userGroup[0]) && isAMember(user.id, group.id) ? <Button variant="contained" onClick={() => toggleJoin(user.id, group.id, 'leave')}>Leave</Button> : <Button variant="contained" onClick={() => toggleJoin(user.id, group.id, 'join')}>Join</Button>)}</StyledTableCell>
                                            </StyledTableRow>)}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <br />

                        {/* User Events Table */}
                        <Grid container direction="row" justify="space-evenly" alignItems="center">
                            <Grid item xs={10}>
                                <h2>Event Participations</h2>
                                <TableContainer component={Paper} >
                                    <Table>
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell align="left">Event</StyledTableCell>
                                                <StyledTableCell align="center">Event Date</StyledTableCell>
                                                <StyledTableCell align="center">Attendance</StyledTableCell>
                                                <StyledTableCell align="center">View</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(store.oneUserEvent[0]) && store.oneUserEvent.map((item) => <StyledTableRow key={item.id}>
                                                <StyledTableCell align="left">
                                                    <b>{item.name}</b>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {moment(item.date).format('LL')}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {(item.total_time.hours) ? (`${item.total_time.hours} hours `) : ''}
                                                    {(item.total_time.minutes) ? (`${item.total_time.minutes} minutes`) : 'N/A'}
                                                </StyledTableCell >
                                                <StyledTableCell align="center">
                                                    <Button variant="contained" onClick={() => history.push(`/details/${item.event_id}`)}>view event</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>)}
                                            <StyledTableRow>
                                                <StyledTableCell colSpan="4">
                                                    {/*intentionally blank buffer column */}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell>
                                                    <b>Total Volunteer Time:</b>
                                                </StyledTableCell>
                                                <StyledTableCell colSpan="3" align="center">
                                                    {grandTotalHours} hours {grandTotalMinutes} minutes
                  </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Container>
                </>
                :
                <>
                </>
            }
        </>
    );
}


// this allows us to use <App /> in index.js
export default UserAdminView;