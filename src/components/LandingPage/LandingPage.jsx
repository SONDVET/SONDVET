import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>If you are a first-time volunteer please register.  Once you have registered this app will allow you to view and volunteer for events Special Olympics North Dakota hosts.</p>
          <p>For event organizers this app can be used to keep track of hours that volunteers log at your events.  Volunteers will be visible on the page for your event.  You can check them in and out as necessary and log the total times for all volunteers at the end of your event.</p>
          <p>At the end of your event please export the XLS file by clicking the button on your event page and email that file to your Special Olympics contact to make sure your volunteers’ hours are recorded properly.</p>
        </div>
        <div className="grid-col grid-col_4">
          <LoginForm />

          <center>
            <h4>Not A Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
