import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css'
import App from './script/App.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Homepage from './components/Homepage.js'
import reportWebVitals from './script/reportWebVitals.js';
import ForgotPassword from './components/ForgotPassword.js';
import About from './components/About.js';
import { Provider } from 'react-redux';
import store from './Store/store.js'; 
import Generator from './pages/Page2.js';
import Contact from './components/Contact.js'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "Login",
    element:<Login/>
  },
  {
    path: "Signup", 
    element:<Signup/>
  },
  {
    path: "ForgotPassword", 
    element:<ForgotPassword/>
  },
  {
    path: "Homepage", 
    element:<Homepage/>
  },
  {
    path: "About", 
    element:<About/>
  },
  {
    path: "Generator",
    element:<Generator/>
  },
  {
    path: "Contact",
    element:<Contact/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
