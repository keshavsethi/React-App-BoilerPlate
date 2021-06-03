import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { withRouter } from 'react-router';
import RegisterWrapper from './Register.wrapper';
import { performRegister, registerSuccess, registerFailure, ValidateEmail } from './Register.actions';


class RegisterContainer extends PureComponent {

  render() {
    const {loading, errors, data, actions} = this.props
    return <RegisterWrapper loading={loading} errors={errors} data={data} actions={actions}/>;
  }
}


const mapStateToProps = (state) => {
    console.log(state.register);
    return {
        loading: state.register.loading,
        errors: state.register.errors,
        data: state.register.data,
    }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    register: users => {
      return dispatch(performRegister(users));
    },
    registerSuccess: registerDetails => {
      return dispatch(registerSuccess(registerDetails));
    },
    registerFailure: errorMessage => {
      return dispatch(registerFailure(errorMessage));
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterContainer),
);
