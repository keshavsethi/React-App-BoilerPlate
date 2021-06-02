import { REGISTER_INIT, REGISTER_SUCCESS, REGISTER_FAILURE} from './Register.constants';

const ValidateEmail = (mail) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) return true
    return false
};

const initRegisterCreator = () => ({
  type: REGISTER_INIT,
});


const registerSuccessCreator = (data) => ({
  type: REGISTER_SUCCESS,
  payload: {
    email: data.email,
  }
});

const registerFailureCreator = (errorMessage) => ({
  type: REGISTER_FAILURE,
  payload: {
    error: errorMessage,
  }
});

const performRegister = () => {
  return async (disptach) => {
    disptach(initRegisterCreator());
  };
};

const registerSuccess = ( email ) => {
  return async (disptach) => {
    disptach(registerSuccessCreator(email));
  };
};

const registerFailure = (errorMessage) => {
  return async (disptach) => {
    disptach(registerFailureCreator(errorMessage));
  };
};

const dummy = () => {};

export { performRegister, registerSuccess, registerFailure, dummy, ValidateEmail };
