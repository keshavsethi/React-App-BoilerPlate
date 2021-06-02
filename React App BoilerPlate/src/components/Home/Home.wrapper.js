import React, { PureComponent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

class HomeWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
      }

    handleLogout() {
        const {actions,history} = this.props;
        actions.logout(); 
        history.push('/login');// redirect
    }

  render() {
    const {data} = this.props;
    return (
      <div>
        {Object.keys(data).length === 0 ?<CircularProgress/>:
          <div style={{ height: "100vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align">
                <h2 style={{ padding: "10vh", color:"pink" }}>
                <b>Hey,</b> {data.email} | How you doin?  <span role="img" aria-label="hello">🚀  </span>
                </h2>
                <Button
                    fullWidth
                    variant="contained"
                    color="Secondary"
                    onClick={this.handleLogout}
                >Logout <span role="img" aria-label="hello">👌  </span>
                </Button>
            </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(HomeWrapper);
