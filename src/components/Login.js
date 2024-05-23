import React, { useState, useContext } from 'react';
import { Nav } from './nav.js';
import mainImgLg from '../assets/login.jpg';
import warningicon from '../assets/warning.png';
import { useDispatch } from "react-redux";
import { authActions } from "../Store/store.js";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import Cookies from 'js-cookie'

export default function Login (){
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warningImgP, setWarningImgP] = useState(false);
  const [warningImgU, setWarningImgU] = useState(false);
  const [usernameBorderColor, setUsernameBorderColor] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState('');
  const navigate = useNavigate();
  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: username,
        password: password
      });
      const data = res.data;
      return data;
    } catch (err) {
      // console.log(err);
      throw err; // Propagate the error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username !== '' && password !== '') {
      try {
        const response = await sendRequest(); 
        const token = response.token;
        const decodedToken = jwtDecode(token);
        // console.log("Decoded Token:", decodedToken);
        const userId = decodedToken.id;
        const usercookie = {
          id: userId,
        };
        Cookies.set('usercookie', JSON.stringify(usercookie));
        dispatch(authActions.login());
        alert('User successfully logged in!');
        navigate('/Homepage');
      } catch (error) {
        // Handle login error (e.g., display error message)
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "Invalid Username") {
            setWarningImgU(true);
            setUsernameBorderColor('red');
          } else if (errorMessage === "Invalid Password") {
            setWarningImgP(true);
            setPasswordBorderColor('red');
          }
        } 
      }
    } else {
      if (username === '') {
        setWarningImgU(true);
        setUsernameBorderColor('red');
      } else {
        setWarningImgU(false);
        setUsernameBorderColor('black');
      }
  
      if (password === '') {
        setWarningImgP(true);
        setPasswordBorderColor('red');
      } else {
        setWarningImgP(false);
        setPasswordBorderColor('black');
      }
    }
  };
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleUsernameBlur = () => {
    if (username === '') {
      setUsernameBorderColor('red');
      setWarningImgU(false);
    } else {
      setUsernameBorderColor('black');
      setWarningImgU(false);
    }
  }

  const handlePasswordBlur = () => {
    if (password === '') {
      setPasswordBorderColor('red');
      setWarningImgP(false);
    } else {
      setPasswordBorderColor('black');
      setWarningImgP(false);
    }
  }
  return (
    <div className="mainc">
      <Nav />
      <div className="row px-0">
        <div className="col-lg-6 px-0">
          <img src={mainImgLg} alt="Login Img Not Displayed" className="img-fluid" />
        </div>
        <div className="col-lg-6 mt-3">
          <div className="card fdc">
            <div className="card-body">
              <div className='login-heading'>
                <h4 className="card-title mb-3">Login</h4>
                <h6 className=" mb-4">Don't have an account? <a href="/Signup">Sign Up!</a></h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="mb-3 d-flex align-items-center">
                    <input
                      type="email"
                      className={`form-control fd ${usernameBorderColor === 'red' ? 'thick-border' : ''}`}
                      id="username"
                      value={username}
                      placeholder="Enter your email"
                      onChange={handleUsernameChange}
                      onBlur={handleUsernameBlur}
                      style={{ borderColor: usernameBorderColor }}
                    />
                    {warningImgU && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-3 d-flex align-items-center">
                    <input
                      type="password"
                      className={`form-control fd ${passwordBorderColor === 'red' ? 'thick-border' : ''}`}
                      id="password"
                      value={password}
                      placeholder="Enter your password"
                      onChange={handlePasswordChange}
                      onBlur={handlePasswordBlur}
                      style={{ borderColor: passwordBorderColor }}
                    />
                    {warningImgP && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                  <div className="container cd mt-2">
                    <div className="row justify-content-right align-items-right">
                      <div className="col-auto">
                        <span className="content forgot-password"><a href='/ForgotPassword'>Forgot Password?</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}
