import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddEvent.css';
import { TextField, FormControl, Button, FormHelperText, InputLabel, Select, MenuItem, makeStyles, Container, Grid } from "@material-ui/core";
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
            width: 420,
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
            <Container>
                <div className="addEventContainer">
                    <h1 className="registerHeader">Fill out this form to create a new event.</h1>
                    <form className="addEventForm" onSubmit={addNewEvent}>
                        <Grid container direction="row" justify="center">
                            <Grid item>
                                <div className="upperFields">
                                    <TextField
                                        className={classes.input}
                                        id="name-control"
                                        label="Name"
                                        variant="outlined"
                                        inputProps={{ maxLength: 255 }}
                                        required
                                        style={{ width: 420 }}
                                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                                    />
                                    <TextField
                                        className={classes.description}
                                        id="description-control"
                                        label="Description"
                                        variant="outlined"
                                        inputProps={{ maxLength: 255 }}
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
                                        inputProps={{ maxLength: 255 }}
                                        multiline
                                        rows={6}
                                        helperText="optional"
                                        style={{ width: 420 }}
                                        onChange={(e) => setNewEvent({ ...newEvent, special_inst: e.target.value })}
                                    />
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="upperFields">
                                    <TextField
                                        className={classes.input}
                                        inputProps={{ maxLength: 255 }}
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
                                        inputProps={{ maxLength: 2550 }}
                                        rowsMax={4}
                                        helperText="optional"
                                        onChange={(e) => setNewEvent({ ...newEvent, pic_url: e.target.value })}
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <div className="buttonBox">
                            <Button type="reset" variant="contained" color="secondary">Clear Fields</Button>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </div>
                        <FormHelperText id="my-helper-text">*Fields with an asterisk are required</FormHelperText>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default AddEvent;