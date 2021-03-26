import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TextField, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom';


function LoginForm() {

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push("/events");
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login


  const useStyles = makeStyles({
    loginInput: {
        width: '75%',
        textAlign: "center",
        margin:10,
        borderRadius:50
    },
});
const classes = useStyles();

  return (
    <form className="loginForm" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
          <TextField
            className={classes.loginInput}
            variant="filled"
            type="text"
            name="username"
            label="Email"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
          <TextField
            className={classes.loginInput}
            variant="filled"
            type="password"
            name="password"
            label="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
