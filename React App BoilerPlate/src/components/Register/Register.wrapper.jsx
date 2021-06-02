import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterWrapper(props) {
  const classes = useStyles();
  const {loading, errors, actions} = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const history = useHistory();

  const ValidateEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) return true
  return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email) {
      const validEmail = ValidateEmail(email);
      if(validEmail) {
        setEmailError('');
        if(password) {
          if(password.length >= 10) {
            setPasswordError('');
            actions.register();
            const response = true;
            if(response) {
              await setTimeout(() => { 
                actions.registerSuccess({email, password});
                history.push('/login');// if register
              }, 3000);
            }
            else {
              const errorMessage = "Invalid user credentials";
              actions.registerFailure({errorMessage});
            }
          }
          else {
            return setPasswordError('Strong Password Please');
          }
        }
        else {
          return setPasswordError('Please enter your password!');
        }
      }
      else{
        setEmailError('Correct Email Please');
      }
    }
    else {
      return setEmailError('Please enter your email address');
    }
    return true;
  }
    return (
    <Container component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{marginTop: '1em'}}>
          <span style={{fontWeight: 'bolder', fontSize: '1.3em', color:'blue'}}>Register Here  <span role="img" aria-label="hello">🚀  </span></span>
        </Typography>
        {errors ? <Alert severity="error">{errors}</Alert> : <></>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error = {!!emailError}
            helperText = {emailError}
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error = {!!passwordError}
            helperText = {passwordError}
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          {loading ? 
          <Grid container align="center">
            <Grid item xs>
              <CircularProgress/>
            </Grid>
          </Grid>
          :
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Register
          </Button>
          }
        </form>
      </div>
    </Container>
  );
}