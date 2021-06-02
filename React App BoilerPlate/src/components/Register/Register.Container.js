import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { withRouter } from 'react-router';
import RegisterWrapper from './Register.wrapper';
import { performRegister, registerSuccess, registerFailure, ValidateEmail } from './Register.actions';


class RegisterContainer extends PureComponent {
    // history = useHistory();
    
    // constructor(props){
    //     super(props);
    //     this.state = {
    //        email:'',
    //        password:'',
    //        emailError:'',
    //        passwordError:'',
    //    };
    // }
    
    // emailchange = (e) =>{
    //     this.setState({
    //        email:e.target.value
    //     });
    // }

    // passwordchange = (e) =>{
    //     this.setState({
    //        password:e.target.value
    //     });
    // }

    // handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const {email,password,emailError,passwordError} = this.state;
    //     if(email) {
    //       const validEmail =ValidateEmail(email);
    //       if(validEmail) {
    //         this.setState({
    //             email:''
    //         });
    //         if(password) {
    //           if(password.length >= 10) {
    //               this.setState({
    //                   password:''
    //               });
    //             this.register();
    //             const response = true;
    //             if(response) {
    //               await setTimeout(() => { 
    //                 registerSuccess({email, password});
    //               }, 3000);
    //             }
    //             else {
    //               const errorMessage = "Invalid user credentials";
    //               registerFailure({errorMessage});
    //             }
    //           }
    //           else {
    //               this.setState({
    //                   passwordError:'Wrong Passowrd'
    //               });
    //           }
    //         }
    //         else {
    //                this.setState({
    //                   passwordError:'Wrong Passowrd'
    //               });
    //         }
    //       }
    //       else{
    //           this.setState({
    //               emailError:'Wrong Email'
    //           });
    //       }
    //     }
    //     else {
    //       this.setState({
    //           emailError:'Wrong Email'
    //       });;
    //     }
    //     return true;
    //   }

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
    register: () => {
      return dispatch(performRegister());
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
