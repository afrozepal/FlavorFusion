import '../style/App.css';
import Login from '../components/Login'
import React from 'react';
import '../style/App.css'
// import { Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';


function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log("isLoggedIn : " , isLoggedIn);
  return (
    <div className="app-container">
          {/* <AuthProvider> */}
            <Login />
          {/* </AuthProvider> */}
    </div>
  );
}

export default App;
