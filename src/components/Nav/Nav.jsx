import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import Logo from '../Images/WhiteLogo.png';  //src/components/Images/SONDLogo.png


function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'My Profile';
  }


  return (
    <div className="nav">
      <Link to="/home">
        <img className="mainLogo" src={Logo} />
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
        <Link className="navLink" to="/addevent">
          Add Event
        </Link>
          </>
        )}
        
        <Link className="navLink" to="/events">
          Events
        </Link> 

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
