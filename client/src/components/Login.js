import React from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
  state = { 
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChanges = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', this.state.credentials)
    .then(res => {
      // console.log(res)
      // res.data.payload
      localStorage.setItem('token', res.data.payload)
      this.props.history.push('/bubbles')
    })
    .catch(err => console.log(err))
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
          <label> Username: 
            <input 
            type='text' 
            name='username'
            onChange={this.handleChanges}
            />
          </label>
          <label> Password: 
            <input 
            type='text' 
            name='password'
            onChange={this.handleChanges}
            />
          </label>
          <button>Log In</button>
        </form>
      </>
    );
  }
};

export default Login;
