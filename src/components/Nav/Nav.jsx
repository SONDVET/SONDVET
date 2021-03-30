import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Logo from '../Images/WhiteLogo.png';  //src/components/Images/SONDLogo.png
import { useMediaQuery, Drawer, Button,  Toolbar, AppBar, FormControl } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from './NavDrawerStyle'

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
  const classes = useStyles
  const shrink = useMediaQuery("(min-width: 800px)")
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="nav">
      {shrink ?
        <>
          <Link to="/events">
            <img className="mainLogo" src={Logo} />
          </Link>
          <div>
            <Link className="navLink" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>

            {user.id && user.access_level >= 2 && (
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
                {/* <Link className="navLink" to="/info">
                  Info Page
            </Link> */}
                <LogOutButton className="navLink" />
              </>
            )}
            {user.id && user.access_level >= 3 &&
              <>
                <Link className="navLink" to="/admin">
                  Admin
          </Link>
              </>}
          </div>
        </>
        :
        <>
          <Link to="/events">
            <img className="mainLogo" src={Logo} />
          </Link>
          <Button style={{ color: "white" }} onClick={() => !drawer ? setDrawer(true) : setDrawer(false)} >
            Menu
            <MenuIcon />
          </Button>
          <Drawer
            className={classes.drawer}
            open={drawer}
            onClose={() => setDrawer(false)}
          >
            <button
              component={Link}
              to="/user"
              onClick={() => setDrawer(false)}
              className="drawerLink"
            >
              My Profile
            </button>
            {user.id && user.access_level >= 2 && (
              <button
                className="drawerLink"
                styles={{ backgroundColor: "FF0000" }}
                component={Link}
                to="/addevent"
                onClick={() => setDrawer(false)}
              >
                Add Event
              </button>
            )}
            <button
              className="drawerLink"
              component={Link}
              to="/events"
              onClick={() => setDrawer(false)}
            >
              Events
             </button>
            {user.id && <LogOutButton className="drawerLink" />}
          </Drawer>
        </>
      }
    </div>

  );
}

export default Nav;
