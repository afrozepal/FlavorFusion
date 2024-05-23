import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
// import icon from '../assets/icon.png'; // Adjust the path to the icon as necessary
import Cookies from 'js-cookie';
import khana from '../assets/khana1.jpg'
// import { FaTimes } from 'react-icons/fa';

function PIbar() {
    const usercookie = JSON.parse(Cookies.get('usercookie'));
    const useridd = usercookie.id;

    const [recipes, setRecipes] = useState([]);

    const fetchLikedRecipes = () => {
        axios.get(`http://localhost:5000/getlikedrecipes/${useridd}`)
            .then(response => {
                setRecipes(response.data);
                console.log(response.data);
                console.log(useridd);
            })
            .catch(err => console.error('Error fetching data:', err));
    };

    useEffect(() => {
        fetchLikedRecipes();
    }, []);

    return (
        <div className="pcontainer2">
            <div className="precipe-container">
                <h1>Liked Recipes</h1>
                <div className="card-container ccaf">
                    {recipes.map(recipe => (
                        <div className="card caf" style={{ width: '18rem', marginRight: '20px', marginBottom: '20px' }} key={recipe._id}>
                            {(() => {
                                        try {
                                        return (
                                            <img
                                            src={require(`../assets/FoodImages/${recipe.Image_Name}.jpg`)}
                                            alt="Recipe"
                                            />
                                        );
                                        } catch (error) {
                                        // console.error(error); // Log the error for debugging
                                        return (<img src={khana} alt="Icon" />);
                                        }
                                    })()}
                            <div className="card-body cbaf" style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 className="card-title">{recipe.Title}</h5>
                                <div className="mt-auto lastrowcard">
                                <Link style={{color:'white'}} to={`/RecipeDetail`}
                                        onClick={() => {
                                            const cookieRecipe = {
                                                _id: recipe._id,
                                                Title: recipe.Title,
                                                Ingredients: recipe.Ingredients,
                                                Instructions: recipe.Instructions,
                                                Image_Name: recipe.Image_Name
                                            };
                                            Cookies.set('cookieRecipe', JSON.stringify(cookieRecipe));
                                        }}
                                        >
                                            See Full Recipe
                                        </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PIbar;
