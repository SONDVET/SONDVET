import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from "moment";
import { TextField, Button, FormHelperText, makeStyles, Container, Grid } from "@material-ui/core";
import Image from '../Images/SONDLogo.png'; //src / components / Images / SONDLogo.png

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

//  This page is for officers and admins to edit events
function EditEvent() {
    const params = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const store = useSelector((store) => store)
    const user = useSelector((store) => store.user);
    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
    }, []);
    const [newEvent, setNewEvent] = useState({
        id: 0,
        name: "",
        description: "",
        special_inst: "",
        location: "",
        date: "",
        time: "",
        pic_url: `${Image}`, // default SOND logo
    })

    const declare = () => {
        if(newEvent.id === 0){
        setNewEvent({
            id: store.event[0].id,
            name: store.event[0].name,
            description: store.event[0].description,
            special_inst: store.event[0].special_inst,
            location: store.event[0].location,
            date: store.event[0].date,
            time: store.event[0].time,
            pic_url: store.event[0].pic_url
        })
        console.log(newEvent)
        return;
    }else{
        console.log(`editing ${newEvent.name}`)
    }

       
    }
    const updateEvent = () => {
        console.log(newEvent)
        dispatch({ type: 'EDIT_EVENT', payload: newEvent });
        history.push(`/details/${params.id}`)
    }
    return (
        <>
            <Container>
                <div className="addEventContainer" >
                    {store.event[0] &&
                        <>
                        <h1 className="registerHeader">Editing {store.event[0].name}</h1>
                        <form className="addEventForm" onSubmit={updateEvent} >
                            {declare()}
                            <Grid container direction="row" justify="center">
                                <Grid item>
                                    <div className="upperFields" >
                                        <TextField
                                            
                                            className={classes.input}
                                            value={newEvent.name}
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
                                            defaultValue={store.event[0].description}
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
                                            defaultValue={store.event[0].special_inst}
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
                                            defaultValue={store.event[0].location}
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
                                            defaultValue={moment(store.event[0].date).format("YYYY-MM-DD")}
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
                                            defaultValue={store.event[0].time}
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
                                            defaultValue={store.event[0].pic_url}
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
                                <Button onClick={() => history.push(`/details/${params.id}`)} type="button" variant="contained" style={{ backgroundColor: "grey", color: "white" }}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                            <FormHelperText id="my-helper-text">*Fields with an asterisk are required</FormHelperText>
                        </form>
                        </>
                    }
                </div>
            </Container>
        </>
    );
}
export default EditEvent;