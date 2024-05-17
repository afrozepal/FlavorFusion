import React from 'react'
import {Nav,Nav2} from './nav.js'
import '../style/selfstyling.css'
import curryimg from '../assets/currypage1.jpg'

const Homepage = () => {
  return (
    <>
      <Nav></Nav>
    <Nav2></Nav2>
    <div className="container-samreen">
    <img src={curryimg} alt="backgroundimg" />
    <div className="overlay">
          <div className="content">
            <h3>Your very own personalized recipe generator</h3>
            <div className="buttons">
              <button className="btn1">Login</button>
              <button className="btn2">Signup</button>
            </div>
          </div>
        </div>
    </div>
      <div className="second-container">
        <h2>Why food gen?</h2>
        <div className="small-containers">
          <div className="small-container">
            <p>Instant Recipe Inspiration: FoodGen provides instant access to a vast database of recipes, sparking culinary creativity at your fingertips.</p>
          </div>
          <div className="small-container">
            <p>Personalized Recommendations: Tailored to your preferences, FoodGen suggests recipes based on your dietary restrictions, favorite ingredients, and cooking style.</p>
          </div>
          <div className="small-container">
            <p>Time-Saving Solution: Say goodbye to endless scrolling through recipe websites. FoodGen streamlines the cooking process by quickly generating delicious recipes tailored to your needs.</p>
          </div>
          <div className="small-container">
            <p>User-Friendly Interface: FoodGen's intuitive design makes it easy to navigate, ensuring a seamless experience for users of all culinary skill levels.</p>
          </div>
        </div>
      </div> 
    </>
  )
}

export default Homepage
