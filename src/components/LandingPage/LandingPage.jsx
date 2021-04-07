import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useMediaQuery } from '@material-ui/core'

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const shrink = useMediaQuery("(min-width: 1120px)")
  const onLogin = (event) => {
    history.push('/registration');
  };

  return (

    <div className="container">
      {shrink ?
        <div className="grid">
          <div className="grid-col grid-col_8">
            <div className="intro">
              <h1 className="headerText">{heading}</h1>
              <p className="introText">If you are a first-time volunteer please register.  Once you have registered this app will allow you to view and volunteer for events Special Olympics North Dakota hosts.</p>
              <p className="introText">For event organizers this app can be used to keep track of hours that volunteers log at your events.  Volunteers will be visible on the page for your event.  You can check them in and out as necessary and log the total times for all volunteers at the end of your event.</p>
              <p className="introText">At the end of your event please export the XLS file by clicking the button on your event page and email that file to your Special Olympics contact to make sure your volunteers’ hours are recorded properly.</p>
            </div>
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
        :
        <div>
          <div>
            <LoginForm />
            <center>
              <h4>Need and Account?</h4>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Register
            </button>
            </center>
          </div>
          <div style={{marginTop:'10px'}}>
            <div className="intro">
              <h1 className="headerText">{heading}</h1>
              <p className="introText">If you are a first-time volunteer please register.  Once you have registered this app will allow you to view and volunteer for events Special Olympics North Dakota hosts.</p>
              <p className="introText">For event organizers this app can be used to keep track of hours that volunteers log at your events.  Volunteers will be visible on the page for your event.  You can check them in and out as necessary and log the total times for all volunteers at the end of your event.</p>
              <p className="introText">At the end of your event please export the XLS file by clicking the button on your event page and email that file to your Special Olympics contact to make sure your volunteers’ hours are recorded properly.</p>
            </div>
          </div>

        </div>
      }
    </div>
  );
}

export default LandingPage;
