## README:

## Special Olympics North Dakota: Volunteer and Events Tracker

![Landing Page](/README_screenshots/Landing_Page.png)


## Description

The intent of this application is to enable Special Olympics North Dakota and its volunteers to track their involvement with SOND events. This application will gather and collate volunteer data and also record volunteer hours by event. Data will be exported for interaction with Excel.

This application was built by Lance Gagner, Zach Mead, Cody Njos and Jon Kranzler for Special Olympics North Dakota on occasion of their client work as a part of their involvement in Emerging Digital Academy's Conway Cohort.

## Usage

Instructions for Officers
For Officers (meaning those who can create events) you will have to register as normal and then get authorization from a Special Olympics North Dakota Admin. Only an Admin can promote you to Officer. Once that is completed you will have access to the Add Event page.

![Event Page](/README_screenshots/Event_Page.png)

Add Events Instructions
Here you will find a form for you to fill out with various data about your event. All fields are required excepting “special instructions” and. “Image URL”. “Image URL” can be a URL for any web-based image, if left blank it will default to SOND’s logo. Once you have filled out your event’s information clicking on “submit” will add it to the event list. “Clear Fields” will erase everything in this form should you want to start over.

![Add Event](/README_screenshots/Add_Event.png)

Event Details Page Instruction
On the Events page you, as an Officer, will have access to the Details button. Clicking on this will take you to the Event Details page. At the bottom of this page you will see a table listing all the volunteers participating in this event. The “Remove” button will remove that volunteer from the list of participants. Clicking Check-In for a volunteer will start a timer that records time spent volunteering for this event. Check-Out stops the timer and records total hours volunteered. “Check-in” and “Check-out” can be clicked multiple times over the course of an event. If, for example, a volunteer was checked out for a lunch break you could check them back in when they return and the app will add hours as normal.

![Event Details](/README_screenshots/Event_Details.png)

At the end of your event click Download Events Registrants. This will create an XLS file. Email this file to your administrator contact at SOND so that your volunteers and event can be recorded. Be sure to adjust the number of participants visable at the bottom of the page as only the volunteers viewed in that table will be downloaded.

Instructions for Administrators
As Administrators of this application you will have a number of responsibilities and abilities.

![Admin View](/README_screenshots/Admin_View.png)

Admin Page
Admins are the only users that have access to Admin page. Here you will be provided with a searchable list of all active users, archived users and archived events.

Clicking on View User will bring you to a page where you can view and edit that users information. Clicking on Edit Info changes the table rows to inputs allowing you to edit that users information. This will also allow you to change a user’s access level by clicking on the dropdown next to "Rank:" just below the users's name.

![Personal Info](/README_screenshots/Personal_Information.png)

You also have the ability to change a user’s password. Should they request a change click on Update User Password and enter a new password.

All Groups Page
The All Groups page is where you can manage the groups or affiliations that users can subscribe to. This may represent what college a volunteer is attending but you can add groups for any bookkeeping purpose. To add a new group enter the name of the new group in the "Input New Group Name" text field and click the 
Add Group to List. Now that group will be available for all users to associate with.

![Group View](/README_screenshots/Group_View.png)

You may want to remove groups as well as add them. To do so click on View to go to that group’s page and click on Archive Group. Archived groups will be displayed at the bottom table in the All Groups page. Groups can also be unarchived from this table.

![All Groups](/README_screenshots/All_Groups.png)

## Volunteers

For volunteers: click on "register" and fill out the registration form. Once logged in and registered you will be able to review the events that SOND hosts. To sign up for an event click on the “join” button and you will be added to the list of volunteers for that event. If your schedule changes clicking on “can’t make it” will remove you from that list.

## Officers

For officers (meaning those who can create events) you will have to register as above and get authorization from a SOND admin. Once that is completed you will have access to the Add Event page when logged in. Here you will find a form to fill out with various data about your event. All fields are required excepting “special instructions” and. “Image URL”. “Image URL” can be a link to any web-based image, if left blank it will default to SOND’s logo. Once you have filled out your event’s information clicking on “submit” will add it to the event list. “Clear Fields” will erase everything in this form should you want to start over.

On the day of your event: From the Events page find your event’s card and click on the “event details” button. This will take you to a page that lists all the volunteers associated with your event. As your volunteers arrive click the “check-in” button associated with their name when they are ready to work. At the end of the event, or whenever is appropriate, click the associated “check-out” button to log the total time that volunteer has donated to your event. “Check-in” and “check-out” can be clicked multiple times during the course of an event. The last step of the process is to click “Download Event Registrants” to create a XLS file. Email this file to your contact at Special Olympics North Dakota so that your event and volunteer times can be recorded.

## Admins

Admins come from SOND’s staff and have the roll of managing this application. To do this you will have access to the Admin page which will list all volunteers who have registered whether they are active or archived. Here you can not only edit any users information but most importantly edit their administrative privileges and change passwords. Should a user request a password change you will find the button to do so at the bottom of the table listing their user information. To edit other user information, including administrative access, click on the “edit info” button in the upper right corner. This is also where to set a volunteer to “archived” or to restore a volunteer that comes back into service.

The process is similar with events and groups that have been archived. Archived events (meaning events that are no longer to be displayed in the Events page) will be visible to you at the bottom of the admin page. Admins will also be able to create and archive groups that volunteers might associate with under the All Groups page.

## Built With

This application was built with [Reactjs](https://reactjs.org/) and [React-Redux](https://react-redux.js.org/).  
[Node.js](https://nodejs.org/en/), [Axios](https://github.com/axios/axios) and [Passport.js](http://www.passportjs.org/) libraries were utilized as well.  
[Material-UI](https://material-ui.com/) was used in styling certain elements.
[Moment.js](https://momentjs.com/) was used for time displaying purposes.

## License

This application is property of Special Olympics North Dakota. Special consideration is allowed for the named creators of this application for the purpose of self-promotion.

## Acknowledgement

The creators would like to acknowledge Special Olympics North Dakota for providing us with a great problem to solve. We’d also like to thank Emerging Digital Academy for its support in guiding the development of the creators’ skills to be able to build this application.
