import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from "../ProtectedAdminRoute/ProtectedAdminRoute"
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddEvent from '../AddEvent/AddEvent';
import EventDetail from '../EventDetail/EventDetail';
import Events from '../Events/Events';
import GroupView from '../GroupView/GroupView';
import UserAdminView from '../UserAdminView/UserAdminView';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/userdetails/:id"
          >
            <UserAdminView />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in,  and authorized, redirects to AddEvent page
            // - else shows LandingPage at "/home"
            exact
            path="/addevent"
          >
            <AddEvent />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, and authorized, redirects to GroupView
            // - else shows LandingPage at "/home"
            exact
            path="/group_view/:id"
          >
            <GroupView />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in redirects to EventDetail
            // - else shows LandingPage at "/home"
            exact
            path="/details/:id"
          >
            <EventDetail />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in redirects to Events
            // - else shows LandingPage at "/home"
            exact
            path="/events"
          >
            <Events />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
