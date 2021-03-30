import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Logo from '../Images/WhiteLogo.png';  //src/components/Images/SONDLogo.png
import { useMediaQuery, Drawer, Button, makeStyles, Toolbar, AppBar, FormControl } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
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

  const shrink = useMediaQuery("(min-width: 800px)")
  const [drawer, setDrawer] = useState(false);
  const useStyles = makeStyles((theme) => ({
    drawerLink: {
      color: "white",
      backgroundColor: "#FF0000",
      borderRadius:0,
      padding: "20px  5px 20px 5px",
    },
    drawerPaper:{
      backgroundColor:"#FF0000"
    }
  }));
  const classes = useStyles()
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
            {user.id &&
            <Link className="navLink" to="/events">
              Events
            </Link>
            }
            {user.id && user.access_level > 1 &&
              <Link className="navLink" to= "/group_view">
                All Groups
              </Link>
            }
            {user.id && user.access_level >= 3 &&
              <>
                <Link className="navLink" to="/admin">
                  Admin
              </Link>
              </>}
          {user.id && (
              <>
                {/* <Link className="navLink" to="/info">
                  Info Page
            </Link> */}
                <LogOutButton className="navLink" />
              </>
            )}
             
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
            anchor='top'
            open={drawer}
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClick={() => setDrawer(false)}
          >
          
            <img className="mainLogo" src={Logo} style={{backgroundColor:"#FF0000"}} />
            
            <Button
              component={Link}
              to={loginLinkData.path}
              onClick={() => setDrawer(false)}
              className={classes.drawerLink}
            >
              {loginLinkData.text}
            </Button>
            {user.id && user.access_level >= 2 && (
              <Button
                className={classes.drawerLink}
                component={Link}
                to="/addevent"
                onClick={() => setDrawer(false)}
              >
                Add Event
              </Button>
            )}
            {user.id &&
            <Button
              className={classes.drawerLink}
              component={Link}
              to="/events"
              onClick={() => setDrawer(false)}
            >
              Events
             </Button>
            }
            {user.id && user.access_level >1 &&
              <Button
              className={classes.drawerLink}
              component={Link}
              to="/group_view"
              >
              All Groups
              </Button>
            }
            {user.id && user.access_level >= 3 &&
              <Button
                className={classes.drawerLink}
                component={Link}
                to="/admin"
                onClick={() => setDrawer(false)}
              >
                Admin
              </Button>}
            {user.id && <LogOutButton className="navLink" />}
          </Drawer>
        </>
      }
    </div>

  );
}

export default Nav;
