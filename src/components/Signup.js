import React, { useState } from 'react';
import { Nav } from './nav';
import mainImgSu from '../assets/signupimg.jpg'; 
import '../style/login.css'; 
import axios from 'axios'; // Import Axios for making HTTP requests

function Signup() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    // Log form data before making the POST request
    console.log('Form Data:', { password, fullName, email });
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/signup", {
        name: fullName,
        email,
        password
      });
      
      setUsername('');
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      alert('Account created successfully! Please log in.');
    } catch (error) {
      console.error('Error creating account:', error);
      setErrorMessage('Error creating account. Please try again later.');
    }
  };

  return (
    <div className="mainc">
      <Nav />
      <div className="row px-0">
        <div className="col-lg-6 px-0">
          <img src={mainImgSu} alt="Login Image Not Displayed" className="img-fluid" />
        </div>
        <div className="col-lg-6 mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Sign Up</h5>
              <h6 className="mb-4">Already have an account? <a href="/">Log In!</a></h6>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="username" 
                      placeholder="Enter your username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="fullname" 
                      placeholder="Enter your full name" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Enter your email address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      placeholder="Enter your password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      placeholder="Confirm your password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
