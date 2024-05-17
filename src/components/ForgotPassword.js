import { Nav } from './nav.js';
import { useState } from 'react';
import '../style/login.css';
import fpimg from '../assets/fpimg.avif';
import axios from 'axios';

export default function ForgotPassword() {
  const [usernameBorderColor, setUsernameBorderColor] = useState('');
  const [email, setEmail] = useState('');
  const [emailBorderColor, setEmailBorderColor] = useState('');
  const [password, setPassword] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/forgotpassword", {
        email: email,
        password: password 
      });
      const data = res.data;
      return data;
    } catch (err) {
      throw err;
    }
  };

  // function handleUsernameBorder() {
  //   if (username === '') {
  //     setUsernameBorderColor('red');
  //   } else setUsernameBorderColor('black');
  // }

  function handleEmailBorder() {
    if (email === '') {
      setEmailBorderColor('red');
    } else setEmailBorderColor('black');
  }

  function handlePasswordBorder() {
    if (password === '') {
      setPasswordBorderColor('red');
    } else setPasswordBorderColor('black');
  }

  function handleConfirmPasswordBorder() {
    if (confirmPassword === '') {
      setConfirmPasswordBorderColor('red');
    } else setConfirmPasswordBorderColor('black');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === '' || confirmPassword === '' || email === '') {
      // if (username === '') handleUsernameBorder();
      if (email === '') handleEmailBorder();
      if (password === '') handlePasswordBorder();
      if (confirmPassword === '') handleConfirmPasswordBorder();
      setErrorMessage('Error. Empty Field(s).')
      return;
    } 

    else if (password!== confirmPassword)
    {
      setErrorMessage('Error. Passwords dont match.')
      return;
    }
    
    else {
      try {
        const response = await sendRequest(); 
        alert('Password Successfully Changed!');
        window.location.href='/login'
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          console.log('issue: ', errorMessage)
          // if (errorMessage === "Invalid Username") {
          //   setUsernameBorderColor('red');
          // } else if (errorMessage === "Invalid Password") {
          //   setPasswordBorderColor('red');
          // } else if (errorMessage === "Invalid Email") {
          //   setEmailBorderColor('red');
          // }
        } 
      }
    } 
  }

  return (
    <div className="mainc">
      <Nav />
      <div className="row px-0">
        <div className="col-lg-6 px-0">
          <img src={fpimg} alt="Login Img Not Displayed" className="img-fluid" />
        </div>
        <div className="col-lg-6 mt-3">
          <div className="card">
            <div className="card-body">
              <div className='login-heading'>
                <h4 className="card-title mb-3">Change Password</h4>
                <h6 className=" mb-4">Don't have an account? <a href="/Signup">Sign Up!</a></h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => (setEmail(e.target.value))}
                    onBlur={handleEmailBorder}
                    style={{ borderColor: emailBorderColor }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => (setPassword(e.target.value))}
                    onBlur={handlePasswordBorder}
                    style={{ borderColor: passwordBorderColor }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                    placeholder="Confirm password here"
                    value={confirmPassword}
                    onChange={(e) => (setConfirmPassword(e.target.value))}
                    onBlur={handleConfirmPasswordBorder}
                    style={{ borderColor: confirmPasswordBorderColor }}
                  />
                </div>
                <div className="d-grid">
                  <div className='last-message'>
                    <p className='error-message'>{errorMessage}</p>
                  </div>
                  <button type="submit" className="btn btn-primary">Update Password</button>
                </div>
                <div className="container mt-2">
                  <div className="row justify-content-right align-items-right" >
                    <div className="col-auto">
                      <span className="content forgot-password"><a href='/'>Back to Login</a></span>
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
