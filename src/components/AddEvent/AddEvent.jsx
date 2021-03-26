import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddEvent.css';
import { TextField, FormControl, Button, FormHelperText, InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core";
import moment from 'moment';


//  This page is for officers and admins to create new events
function AddEvent() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);


    const [newEvent, setNewEvent] = useState({
        name: "",
        description: "",
        special_inst: "",
        location: "",
        date: "",
        time: "",
        pic_url: "https://news.prairiepublic.org/sites/ndpr/files/201906/NDSO.jpg", // default SOND logo
    })

    const addNewEvent = (event) => {
        event.preventDefault();
        console.log(newEvent)
        dispatch({ type: 'ADD_NEW_EVENT', payload: newEvent });
        history.push('/events')
    };


    const useStyles = makeStyles({ // set stying for card and paper
        input: {
            width: 200,
            padding: 10
        },
        description: {
            width: 420,
            padding: 10
        },
    });
    const classes = useStyles();

    return (
        <>
            <h1>Add New Events Here!</h1>
            <div className="addEventContainer">
                <form className="addEventForm" onSubmit={addNewEvent}>
                    <TextField
                        className={classes.input}
                        id="name-control"
                        label="Name"
                        variant="outlined"
                        required
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    />
                    <TextField
                        className={classes.description}
                        id="description-control"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={6}
                        required
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                    <TextField
                        className={classes.input}
                        id="sp-instruction-control"
                        label="Special Instructions"
                        variant="outlined"
                        multiline
                        rows={3}
                        helperText="optional"
                        onChange={(e) => setNewEvent({ ...newEvent, special_inst: e.target.value })}
                    />
                    <TextField
                        className={classes.input}
                        id="location-control"
                        label="Location"
                        variant="outlined"
                        multiline
                        rowsMax={4}
                        required
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                    <TextField
                        className={classes.input}
                        id="date-control"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        type="date"
                        rowsMax={4}
                        required
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <TextField
                        className={classes.input}
                        id="date-control"
                        label="Time"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        type="time"
                        rowsMax={4}
                        required
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                    <TextField
                        className={classes.input}
                        id="date-control"
                        label="Image URL"
                        variant="outlined"
                        rowsMax={4}
                        helperText="optional"
                        onChange={(e) => setNewEvent({ ...newEvent, pic_url: e.target.value })}
                    />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <Button type="reset" variant="contained" color="secondary">Clear Fields</Button>
                    <FormHelperText id="my-helper-text">*Fields with an asterisk are required</FormHelperText>
                </form>
            </div>
        </>
    );
}

export default AddEvent;