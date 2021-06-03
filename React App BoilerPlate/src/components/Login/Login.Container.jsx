import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginWrapper from './Login.wrapper';
import { performLogin, loginSuccess, loginFailure, performLogout } from './Login.actions';

class LoginContainer extends PureComponent {

  render() {
    const {loading, errors, data, actions, auth} = this.props
    return <LoginWrapper loading={loading} auth={auth} errors={errors} data={data} actions={actions}/>;
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  errors: state.login.errors,
  data: state.login.data,
  auth: state.login.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    login: () => {
      return dispatch(performLogin());
    },
    loginSuccess: (details) => {
      return dispatch(loginSuccess(details));
    },
    loginFailure: errorMessage => {
      return dispatch(loginFailure(errorMessage));
    },
    logout: () => {
      return dispatch(performLogout());
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer),
);
