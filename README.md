## README:


## Special Olympics North Dakota: Volunteer and Events Tracker

## Description

The intent of this application is to enable Special Olympics North Dakota and its volunteers to track their involvement with SOND events.  This application will gather and collate volunteer data and also record volunteer hours by event.  Data will be exported for interaction with Excel.

This application was built by Lance Gagner, Zach Mead, Cody Njos and Jon Kranzler for Special Olympics North Dakota on occasion of their client work as a part of their involvement in Emerging Digital Academy's Conway Cohort.


## Usage

## Volunteers

For volunteers: click on "register" and fill out the registration form.  Once logged in and registered you will be able to review the events that SOND hosts.  To sign up for an event click on the “join” button and you will be added to the list of volunteers for that event.  If your schedule changes clicking on “can’t make it” will remove you from that list.

## Officers

For officers (meaning those who can create events) you will have to register as above and get authorization from a SOND admin.  Once that is completed you will have access to the Add Event page when logged in.  Here you will find a form to fill out with various data about your event.  All fields are required excepting “special instructions” and. “Image URL”.  “Image URL” can be a link to any web-based image, if left blank it will default to SOND’s logo.  Once you have filled out your event’s information clicking on “submit” will add it to the event list.  “Clear Fields” will erase everything in this form should you want to start over.

On the day of your event: From the Events page find your event’s card and click on the “event details” button.  This will take you to a page that lists all the volunteers associated with your event.  As your volunteers arrive click the “check-in” button associated with their name when they are ready to work.  At the end of the event, or whenever is appropriate, click the associated “check-out” button to log the total time that volunteer has donated to your event.  “Check-in” and “check-out” can be clicked multiple times during the course of an event.  The last step of the process is to click “Download Event Registrants” to create a XLS file.  Email this file to your contact at Special Olympics North Dakota so that your event and volunteer times can be recorded.  

## Admins

Admins come from SOND’s staff and have the roll of managing this application.  To do this you will have access to the Admin page which will list all volunteers who have registered whether they are active or archived.  Here you can not only edit any users information but most importantly edit their administrative privileges and change passwords.  Should a user request a password change you will find the button to do so at the bottom of the table listing their user information.  To edit other user information, including administrative access, click on the “edit info” button in the upper right corner.  This is also where to set a volunteer to “archived” or to restore a volunteer that comes back into service.

The process is similar with events and groups that have been archived.  Archived events (meaning events that are no longer to be displayed in the Events page) will be visible to you at the bottom of the admin page.   Admins will also be able to create and archive groups that volunteers might associate with under the All Groups page.


## Built With

This application was built with [Reactjs](https://reactjs.org/) and [React-Redux](https://react-redux.js.org/).  
[Node.js](https://nodejs.org/en/), [Axios](https://github.com/axios/axios) and [Passport.js](http://www.passportjs.org/) libraries were utilized as well.  
[Material-UI](https://material-ui.com/) was used in styling certain elements.
[Moment.js](https://momentjs.com/) was used for time displaying purposes.


## License

This application is property of Special Olympics North Dakota.  Special consideration is allowed for the named creators of this application for the purpose of self-promotion.


## Acknowledgement

 The creators would like to acknowledge Special Olympics North Dakota for providing us with a great problem to solve.  We’d also like to thank Emerging Digital Academy for its support in guiding the development of the creators’ skills to be able to build this application.

