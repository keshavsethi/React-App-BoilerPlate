import axios from 'axios';
import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE} from './Login.constants';
// similar functions for logout as well
const initLoginCreator = () => ({
  type: LOGIN_INIT,
});

const initLogoutCreator = () => ({
  type: LOGOUT_INIT,
});

const loginSuccessCreator = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    email: data.email,
  }
});

const loginFailureCreator = (errorMessage) => ({
  type: LOGIN_FAILURE,
  payload: {
    error: errorMessage,
  }
});

const performLogin = () => {
  return async (disptach) => {
    disptach(initLoginCreator());
  };
};

const loginSuccess = (details) => {
  return async (disptach) => {
    console.log(details);
    const url = `http://localhost:3000/users?user.email=${details.email}`;
    await axios.get(url)
    .then(res => {
      console.log("returned thing");
      console.log(res.data);
      if(res.data.length === 0) console.log("NOT Valid Email");
      if(details.password === res.data[0].user.password){
        console.log("Correct passowrd")
        disptach(loginSuccessCreator(details));
      }
      else {
        console.log("wrong password");
        disptach(loginFailureCreator('Error'));
    }
    })
  };
};

const loginFailure = (errorMessage) => {
  return async (disptach) => {
    disptach(loginFailureCreator(errorMessage));
  };
};

const performLogout = () => {
  return async (disptach) => {
    disptach(initLogoutCreator());
  };
};

const dummy = () => {};

export { performLogin, loginSuccess, loginFailure, performLogout, dummy };
