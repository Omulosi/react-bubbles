import React, { useState, useContext } from "react";
import { AuthContext } from '../context';
import { axiosWithAuth } from '../utils'

const loginUrl = `http://localhost:5000/api/login`;

const Login = (props) => {
  const [isAuthenticated, setIsAuthenticsted] = useContext(AuthContext);
  const [user, setUser] = useState({username: '', password: ''});
  const [error, setError] = useState(null)
  
  const handleChange = event => {
    setUser({...user, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth().post(`${loginUrl}`, user)
      .then(res => {
        debugger
        localStorage.setItem('token', res.data.payload);
        setIsAuthenticsted(true);
        props.history.push('/')
      })
      .catch(error => {
        debugger
        console.log(error)
      })
  }

  return (
      <div className="form-data">
        <div className="login-header mb-4">
          Log In
        </div>
        <div className="error mb-2">{error && error}</div>
        <form className='input-form' onSubmit={handleSubmit} method="post">      
          <div className="form-group">
            <label htmlFor="username">Email or Username</label>
            <input
              id="username"
              type='text'
              name='username'
              onChange={handleChange}
              value={user.username}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type='password'
                name='password'
                onChange={handleChange}
                value={user.password}
                required
                className="form-control"
              />
            </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
  );
};
  
export default Login;
