import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './AddEvent.css';
import { TextField, FormControl, Button, FormHelperText, InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core"


//  This page is for officers and admins to create new events
function AddEvent() {


    const user = useSelector((store) => store.user);
    // const user = useSelector((store) => store.event);

    /*  Event table takes following data

        "id" serial NOT NULL,
        "name" varchar(255) NOT NULL,
        "description" varchar(255) NOT NULL,
        "special_inst" varchar(255),
        "location" varchar(255) NOT NULL,
        "date" DATE,
        "pic_url" varchar(2550),
    */

    const [newEvent, setNewEvent] = useState({
        name: "",
        description: "",
        special_inst: "",
        location: "",
        date: "",
        // time: "", --ommitted until database adjusted to accept this
        pic_url: "https://news.prairiepublic.org/sites/ndpr/files/201906/NDSO.jpg", // default SOND logo
    })

    const addNewEvent = (event) => {
        event.preventDefault();
        console.log(newEvent)
        dispatch({type: 'ADD_NEW_EVENT', payload: newEvent });
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
                    <FormHelperText id="my-helper-text">*Fields with an asterisk are required</FormHelperText>
                </form>
            </div>
        </>
    );
}

export default AddEvent;