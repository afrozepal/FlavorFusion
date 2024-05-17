import React, { useState } from "react";
import axios from 'axios';
import { BiHeart } from 'react-icons/bi';
import { BiSolidFilePdf } from "react-icons/bi";
import { Link } from 'react-router-dom';
import icon from './icon.png'
import Cookies from 'js-cookie';

function PIbar() {

    ///enlarge the recipe
   

    //////////// to get recipes
    const [ingredients, setIngredients] = useState([""]);

    const addIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
        console.log(newIngredients)
    };

    const [recipes, setRecipes] = useState([]);

    const generateRecipe = () => {
        axios.get('http://localhost:5000/getrecipes')
        .then(response => {
            console.log('Response:', response.data); // Log the response data
            setRecipes(response.data);
        })
        .catch(err => console.error('Error fetching data:', err));
    };

    // display matching all ingrediants------------------------------------------------
    // const getMatchedRecipes = () => {
    //     // Check if recipes is empty
    //     if (recipes.length === 0) {
    //         return [];
    //     }
    
    //     // Check if ingredients is empty
    //     if (ingredients.length === 0) {
    //         return [];
    //     }
    
    //     // Count the number of matched ingredients for each recipe
    //     const matchedRecipes = recipes.filter(recipe => {
    //         if (!recipe.Ingredients || typeof recipe.Ingredients !== 'string') {
    //             return false; // Skip recipes with invalid Ingredients
    //         }
    
    //         // Parse the Ingredients string into an array
    //         const recipeIngredients = recipe.Ingredients
    //             .replace('[', '') // Remove '[' character
    //             .replace(']', '') // Remove ']' character
    //             .split(/\s(?=\d)/); // Split the string by whitespace followed by a digit
    
    //         // Check if any of the ingredients match the given ingredients
    //         return ingredients.every(ingredient => {
    //             return recipeIngredients.some(recipeIngredient => recipeIngredient.toLowerCase().includes(ingredient.toLowerCase()));
    //         });
    //     });
    
    //     return matchedRecipes;
    // };

    //display even if just one matches and it sorts data on the basis of maximum matched ingredients--------------------------------

    const getMatchedRecipes = () => {
        // Check if recipes or ingredients are empty
        if (recipes.length === 0 || ingredients.length === 0) {
            return [];
        }
    
        // Filter recipes based on matched ingredients
        const matchedRecipes = recipes.map(recipe => {
            if (!recipe.Ingredients || typeof recipe.Ingredients !== 'string') {
                return { ...recipe, matchedIngredientCount: 0 }; // Return recipe with 0 matched ingredients
            }
    
            // Parse the Ingredients string into an array
            const recipeIngredients = recipe.Ingredients
                .replace('[', '') // Remove '[' character
                .replace(']', '') // Remove ']' character
                .split(/\s(?=\d)/); // Split the string by whitespace followed by a digit
    
            // Count the number of matched ingredients
            const matchedIngredientCount = ingredients.reduce((count, ingredient) => {
                if (recipeIngredients.some(recipeIngredient => recipeIngredient.toLowerCase().includes(ingredient.toLowerCase()))) {
                    return count + 1;
                }
                return count;
            }, 0);
    
            // Add the matched ingredient count to the recipe object
            return { ...recipe, matchedIngredientCount };
        });
    
        // Filter out recipes with matched ingredient count greater than 0
        const filteredRecipes = matchedRecipes.filter(recipe => recipe.matchedIngredientCount > 0);
    
        // Sort recipes based on the number of matched ingredients in descending order
        const sortedRecipes = filteredRecipes.sort((a, b) => b.matchedIngredientCount - a.matchedIngredientCount);
    
        return sortedRecipes;
    };
    
    
    const removeIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };
    
    // to update database with a like
    // const handleLike = (recipeId) => {
    //     axios.put(`http://localhost:8080/likedrecipe/${recipeId}`, { like: 1 })
    //         .then(response => {
    //             console.log('Recipe liked:', response.data);
    //             // Optionally, update the state or UI to reflect the updated like status
    //         })
    //         .catch(error => {
    //             console.error('Error liking recipe:', error);
    //             // Handle error
    //         });
    // };

    
    
    return (
        <div>
            <div className="pcontainer">
                <h1>Enter Ingredients</h1>
                {ingredients.map((ingredient, index) => (
                    <div className="input-group mb-3" key={index}>
                        <span className="input-group-text" id={`inputGroup-sizing-default-${index}`}>Ingredient {index + 1}</span>
                        <input
                            type="text"
                            className="form-control"
                            aria-label={`Sizing example input ${index}`}
                            aria-describedby={`inputGroup-sizing-default-${index}`}
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                        />
                        <button type="button" className="btn btn-warning" onClick={() => removeIngredient(index)}>X</button>
                    </div>
                ))}
                <button type="button" className="pbtn1" onClick={addIngredient}>Add more Ingredient</button>
                <button type="button" className="pbtn2" onClick={generateRecipe}>Generate Recipe</button>
            </div>
            {/* Available Recipe */}
            <div className="pcontainer2">
            <div className="precipe-container">
                <h1>Available Recipes</h1>
                <p className="recipe_matches">{getMatchedRecipes().length} matched recipes found.</p>
                <div className="card-container ccaf">
                    {getMatchedRecipes().slice(0, 1000).map((recipe, index) => (
                        <div className="card caf" style={{ width: '18rem', marginRight: '20px', marginBottom: '20px' }} key={recipe._id}>
                            
                            {(() => {
                                        try {
                                        return (
                                            <img
                                            src={require(`./FoodImages/${recipe.Image_Name}.jpg`)}
                                            alt="Recipe"
                                            />
                                        );
                                        } catch (error) {
                                        // console.error(error); // Log the error for debugging
                                        return (<img src={icon} alt="Icon" />);
                                        }
                                    })()}
                            {/* <img src={icon} className="card-img-top" alt="Recipe" /> */}
                            <div className="card-body cbaf" style={{ display: 'flex', flexDirection: 'column' }}>
                                <h5 className="card-title">{recipe.Title}</h5>
                                <p className="card-text">
                                    {recipe.matchedIngredientCount} matched ingredients
                                </p>
                                <div className="mt-auto lastrowcard">
                                <Link to={`/RecipePage`}
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
                                    <button className="btn btn-link pheart-icon"><BiHeart /></button>
                                    <button className="btn btn-link ppdf"><BiSolidFilePdf /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>





        </div>
    );
}

export default PIbar;
