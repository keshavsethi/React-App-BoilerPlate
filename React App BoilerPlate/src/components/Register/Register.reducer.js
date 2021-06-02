import { REGISTER_INIT, REGISTER_SUCCESS, REGISTER_FAILURE } from './Register.constants';

const DEFAULT_STATE = {
  loading: false,
  errors: null,
  data: {},
};

const transformAndStoreLogingData = data => {
  return { ...data };
};

const transformErrors = data => {
  return data.error.errorMessage;
};

const RegisterReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case REGISTER_INIT:
      return { ...state, loading: true };
    case REGISTER_SUCCESS: {
      const userData = transformAndStoreLogingData(action.payload);
      return { ...state, loading: false, data: userData };
    }
    case REGISTER_FAILURE: {
      const err = transformErrors(action.payload);
      return { ...state, loading: false, errors: err};
    }
    default:
      return state;
  }
};

export default RegisterReducer;
