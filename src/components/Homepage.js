import React, { useState, useEffect } from 'react';
import { Nav, Nav2 } from './nav.js';
import '../style/selfstyling.css';
import curryimg from '../assets/currypage1.jpg';
import { Carousel } from 'react-bootstrap';
import carouselImage from '../assets/image1.avif';
import axios from 'axios';

const Homepage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [sllrecipes,setallrecipes] =useState([]);

//   const generateRecipe = () => {
//     axios.get('http://localhost:5000/getrecipes')
//     .then(response => {
//         console.log('Response:', response.data); // Log the response data
//         setallrecipes(response.data);
//     })
//     .catch(err => console.error('Error fetching data:', err));
// };

  useEffect(() => {
    // generateRecipe();
    fetch('http://localhost:5000/api/reccommendations')
      .then(response => response.json())
      .then(data => {
        setRecommendations(data.recommendations || []); // Ensure recommendations is an array
        console.log("fetched data: ", data.recommendations);
      })
      .catch(error => console.error('Error fetching recommendations:', error));
  }, []);
  

  const redirect = () => {
    window.location.href = '/Generator'
  }

  return (
    <>
      <Nav />
      <Nav2 />
      <div className="container-samreen">
        <img src={curryimg} alt="backgroundimg" className="background-img" />
        <div className="overlay">
          <div className="content">
            <h3><i>Your very own personalized recipe generator</i></h3>
            <div className="buttons">
              <button className="generate_btn" onClick = {redirect}>Generate Recipe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="second-container">
        <h5> Recommended For You </h5>
        <br/>
        <Carousel interval={2000}>
          {recommendations.map((recipe, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-container">
                <img
                  className="d-block w-100 carousel-img"
                  // src={carouselImage}
                  src={require(`../assets/masala${index + 1}.jpg`)}
                  alt={recipe}
                />
                <div className="carousel-hover-text">{recipe}</div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="second-container">
        <h5>Why food gen?</h5>
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
  );
}

export default Homepage;
