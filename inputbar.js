import React, { useState } from "react";
import axios from 'axios';
import { BiHeart } from 'react-icons/bi';
// import { BiSolidFilePdf } from "react-icons/bi";
import { Link } from 'react-router-dom';
import '../style/selfstyling.css'
// import icon from '../assets/icon.png';
import khana from '../assets/khana1.jpg'
// import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { withRouter } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

function Ibar() {
    //////////// to get recipes
    const [ingredients, setIngredients] = useState([""]);

    const addIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const usercookie = JSON.parse(Cookies.get('usercookie'));
    // console.log('Cookie user:', usercookie); // Log the cookie recipe to check its value
    const useridd=usercookie.id;

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

    const handleLike = (recipeId) => {
        const newLike = 1;
        console.log(recipeId);
        axios.put(`http://localhost:5000/updateLike/${recipeId}`, {like: newLike, userid:useridd })
          .then(response => {
            console.log('Recipe liked successfully:', response.data);
          })
          .catch(err => console.error('Error updating like:', err));
    };

    const handlerank = (recipeId, selectedRating) => {
        axios.put(`http://localhost:5000/updateRank/${recipeId}`, {rating: selectedRating, userid:useridd})
            .then(response => {
                console.log('Rating updated successfully:', response.data);
            })
            .catch(err => console.error('Error updating rating:', err ));
    };

    return (
        <div className = 'gen_bg'>
            <div className = "main-gen-content-wrapper">
                <div className="container afc">
                    <h1>Enter Ingredients</h1>
                    {ingredients.map((ingredient, index) => (
                    <div className="input-group mb-3" key={index}>
                        <span className="input-group-text" id={`inputGroup-sizing-default-${index}`}>Ingredient {index + 1}</span>
                            <input
                                type="text"
                                className="form-control af"
                                aria-label={`Sizing example input ${index}`}
                                aria-describedby={`inputGroup-sizing-default-${index}`}
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            />
                            <button type="button" className="btn btn-danger" onClick={() => removeIngredient(index)}>X</button>
                    </div>
                    ))}
                    <div className = 'gen_btns'>
                        <button type="button" className="gen_btn1" onClick={addIngredient}>Add Ingredient</button>
                        <button type="button" className="gen_btn2" onClick={generateRecipe}>Generate Recipe</button>
                    </div>
                        </div>
                        {/* Available Recipe */}
                        <div className="container2">
                            <div className="recipe-container">
                        <h1>Available Recipes</h1>
                        <p className="recipe_matches">{getMatchedRecipes().length} matched recipes found.</p>
                        {getMatchedRecipes().length > 0 ? (
                            <table className="recipe-table">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">#</th> */}
                                        <th scope="col">RECIPE NAME</th>
                                        {/* <th>pdf key lyeye</th> */}
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        {/* <th scope="col">Ingredients</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                {getMatchedRecipes().slice(0, 1000).map((recipe, index) => (
                            <tr key={recipe._id}>
                                {/* <th scope="row">{index + 1}</th> */}
                                <td>
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
                                </td>
                                <td>{recipe.Title}
                                    <div style={{ fontSize: '14px'}}>
                                        ({recipe.matchedIngredientCount} matched ingredients)
                                        <br></br>
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
                                </td>

                                {/* <td><button className="btn btn-link pdf"><BiSolidFilePdf/></button></td> */}
                                {/* <td>{recipe.Ingredients}</td> */}
                                {/* <td ><button className="btn btn-link heart-icon" onClick={() => handleLike(recipe._id)}><BiHeart/></button></td> */}
                                <td><button className="btn btn-link heart-icon" onClick={() => handleLike(recipe._id)}><BiHeart/></button></td>
                                <td>
                                <select className="rating" onChange={(e) => handlerank(recipe._id, e.target.value)}>
                                            <option value="0" className="star ">&#9734;</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                </td>
                            </tr>
                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ibar;
