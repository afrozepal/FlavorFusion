import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './script/App.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Homepage from './components/Homepage.js';
import reportWebVitals from './script/reportWebVitals.js';
import ForgotPassword from './components/ForgotPassword.js';
import About from './components/About.js';
import { Provider, useSelector } from 'react-redux'; // Import useSelector
import store from './Store/store.js'; 
import Generator from './pages/Generator.js';
import Contact from './components/Contact.js';
import RecipeDetail from './components/RecipeDetail.js';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LikedRecipes from './pages/LikedRecipes.js';

// Custom Route component to conditionally render routes
const CustomRoute = ({ path, element }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Get login state from Redux store
  console.log("REDUX: ", isLoggedIn)
  // Render route only if logged in or path is one of Login, Signup, or ForgotPassword
  if (!isLoggedIn && !["/Login", "/Signup", "/ForgotPassword"].includes(path)) {
    return null;
  }

  return <Route path={path} element={element} />;
};

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
  },
  {
    path: "RecipeDetail",
    element:<RecipeDetail/>
  },
  {
    path: "LikedRecipes",
    element:<LikedRecipes/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <CustomRoute path="/" element={<App />} />
        <CustomRoute path="/Login" element={<Login />} />
        <CustomRoute path="/Signup" element={<Signup />} />
        <CustomRoute path="/ForgotPassword" element={<ForgotPassword />} />
        <CustomRoute path="/Homepage" element={<Homepage />} />
        <CustomRoute path="/About" element={<About />} />
        <CustomRoute path="/Generator" element={<Generator />} />
        <CustomRoute path="/Contact" element={<Contact />} />
        <CustomRoute path="/RecipeDetail" element={<RecipeDetail />} />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
