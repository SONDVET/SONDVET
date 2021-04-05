import React from 'react';
import './InfoPage.css';

//  Here are instructions for using this application.

function InfoPage() {
  return (
    <>
      <div className="container">
        <h1>Instructions for Officers</h1>
        <p>For Officers (meaning those who can create events) you will have to register as normal and then get authorization from a Special Olympics North Dakota Admin.  Only an Admin can promote you to Officer.
      Once that is completed you will have access to the “Add Event” page.</p>

        <h3>Add Events Instructions</h3>
        <p>Here you will find a form for you to fill out with various data about your event.
        All fields are required excepting “special instructions” and. “Image URL”.
        “Image URL” can be a URL for any web-based image, if left blank it will default to SOND’s logo.
        Once you have filled out your event’s information clicking on “submit” will add it to the event list.
        “Clear Fields” will erase everything in this form should you want to start over.
        </p>

        <h3>Event Details Page Instruction</h3>
        <p>On the Event List page you, as an Officer, will have access to the "Details" button.  Clicking on this will take you to the Event Details page.
        At the bottom of this page you will see a table listing all the volunteers participating in this event.  The “Remove” button will remove that volunteer from the list of participants.  Clicking “Check-in” for a volunteer will start a timer that records time spent volunteering for this event.  “Check-out” stops the timer and records total hours volunteered.  “Check-in” and “Check-out” can be clicked multiple times over the course of an event.  If, for example, a volunteer was checked out for a lunch break you could check them back in when they return and the app will add hours as normal.
        </p>
        <p>At the end of your event click the “Download Event Registrants” button.  This will create an XLS file.  Email this file to your administrator contact at SOND so that your volunteers and event can be  recorded.  Be sure to adjust the number of participants visable at the bottom of the page as only the volunteers viewed in that table will be downloaded.</p>
      </div>
      <div className="container">
        <h1 className="adminInst">Instructions for Administrators</h1>
        <p>Features available to Administrators:</p>
        <ul>
          <li>Access to Admin view</li>
          <li>Access to Group view</li>
          <li>Access to user details from group view</li>
          <li>Ability to change password for users - select a user through the Admin page</li>
        </ul>
      </div>
    </>
  );
}

export default InfoPage;
