import React from 'react';
import { Card, CardMedia, CardHeader, CardContent, CardActions, CardActionsArea, TextField, Button, Accordion, AccordionSummary, Typography, useMediaQuery, Select, MenuItem } from '@material-ui/core';
import { useStyles } from '../EventCardStyle/EventCadStyle'
import './InfoPage.css';

//  Here are instructions for using this application.

function InfoPage() {

  const classes = useStyles()

  return (
    <>
      <div className="container">
        <h1>Instructions for Officers</h1>
        <p>For Officers (meaning those who can create events) you will have to register as normal and then get authorization from a Special Olympics North Dakota Admin.  Only an Admin can promote you to Officer.
      Once that is completed you will have access to the Add Event page.</p>

        <h3>Add Events Instructions</h3>
        <p>Here you will find a form for you to fill out with various data about your event.
        All fields are required excepting “special instructions” and. “Image URL”.
        “Image URL” can be a URL for any web-based image, if left blank it will default to SOND’s logo.
        Once you have filled out your event’s information clicking on “submit” will add it to the event list.
        “Clear Fields” will erase everything in this form should you want to start over.
        </p>

        <h3>Event Details Page Instruction</h3>
        <p>On the Events page you, as an Officer, will have access to the <Button className={classes.cardButton} variant="contained" >Details</Button> button.  Clicking on this will take you to the Event Details page.
        At the bottom of this page you will see a table listing all the volunteers participating in this event.  The “Remove” button will remove that volunteer from the list of participants.  Clicking <Button variant="contained">Check In</Button> for a volunteer will start a timer that records time spent volunteering for this event.  <Button variant="contained">Check Out</Button> stops the timer and records total hours volunteered.  “Check-in” and “Check-out” can be clicked multiple times over the course of an event.  If, for example, a volunteer was checked out for a lunch break you could check them back in when they return and the app will add hours as normal.
        </p>
        <p>At the end of your event click
          <Button
            variant="contained">Download Event Registrants
        </Button>.  This will create an XLS file.  Email this file to your administrator contact at SOND so that your volunteers and event can be  recorded.  Be sure to adjust the number of participants visable at the bottom of the page as only the volunteers viewed in that table will be downloaded.</p>
      </div>
      <div className="container">
        <h1 className="adminInst">Instructions for Administrators</h1>
        <p>As Administrators of this application you will have a number of responsibilities and abilities.</p>
        <h3>Admin Page</h3>
        <p>Admins are the only users that have access to Admin page.  Here you will be provided with a searchable list of all active users, archived users and archived events.  </p>
        <p>Clicking on <Button variant="contained">View User</Button> will bring you to a page where you can view and edit that users information.  Clicking on <Button variant="contained" color="default" >Edit Info</Button> changes the table rows to inputs allowing you to edit that users information.
        This will also allow you to change a user’s access level by clicking on the dropdown next to "Rank:" just below the users's name.
        </p>
        <p>You also have the ability to change a user’s password.  Should they request a change click on <Button variant="contained" >Update User Password</Button> and enter a new password.</p>
        <h3>All Groups Page</h3>
        <p>The All Groups page is where you can manage the groups or affiliations that users can subscribe to.  This may represent what college a volunteer is attending but you can add groups for any bookkeeping purpose.  To add a new group enter the name of the new group in the "Input New Group Name" text field and click the <Button variant="contained">Add Group to List</Button> .  Now that group will be available for all users to associate with.</p>      
        <p>You may want to remove groups as well as add them.  To do so click on <Button variant="contained" color="default" >View</Button> to go to that group’s page and click on <Button variant="contained" style={{ color: "white", backgroundColor: "#FF0000" }} autoFocus>Archive Group</Button>.  Archived groups will be displayed at the bottom table in the All Groups page.  Groups can also be unarchived from this table.</p>        </div>
    </>
  );
}

export default InfoPage;
