import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HomeWrapper from './Home.wrapper';
import { performLogout } from '../Login/Login.actions';

class HomeContainer extends PureComponent {
  
  render() {
    const {data, actions} = this.props;
    return <HomeWrapper data={data} actions={actions}/>;
  }
}

const mapStateToProps = state => ({
  data: state.login.data,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    logout: () => {
      return dispatch(performLogout());
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer),
);
