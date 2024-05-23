require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/user-routes');
const cookieParser = require('cookie-parser');
const recipesModel = require('./Models/Recipes');
const cors = require('cors'); 
const app = express();
const User = require ('./Models/User');

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001'] 
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

mongoose.connect("mongodb+srv://Danaa:danaa@cluster0.rdtwozo.mongodb.net/RecipeGen")
    .then(() => {
        app.listen(5000);
        console.log("Listening to the port 5000");
    })
    .catch((err) => console.log(err));


    app.get('/getrecipes', (req, res) => {
      recipesModel.find({})
          .then(recipes => res.json(recipes))
          .catch(err => res.json(err));
  });
  
  app.get('/getlikedrecipes/:userid', async (req, res) => {
    const userid = req.params.userid;

    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log('User found:', user); // Log user information
        // console.log('Liked recipes:', user.liked_recipes); // Log liked recipes

        // Use the Title field instead of name for querying
        const likedRecipesRegex = user.liked_recipes.map(recipeTitle => new RegExp(`^${recipeTitle}$`, 'i'));

        const recipes = await recipesModel.find({ Title: { $in: likedRecipesRegex } });
        // console.log('Recipes found:', recipes); // Log recipes found

        res.json(recipes);
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

app.put('/updateLike/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const { like, userid } = req.body;
    try {

        // Update the like field in the recipe
        const updatedRecipe = await recipesModel.findByIdAndUpdate(
            recipeId,
            { $set: { like: like } }, // Update the like field
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the first index where the recipeId is not present

        const insertIndex = user.liked_recipes.indexOf(updatedRecipe.Title);
        if (insertIndex === -1) {
            // If recipeId is not found in the array, add it
            user.liked_recipes.push(updatedRecipe.Title);
        }

        await Promise.all([user.save(), updatedRecipe.save()]); // Perform saves concurrently for efficiency

        return res.status(200).json({ message: 'Like updated successfully'});
        
    } catch (error) {
        console.error('Error updating like:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.put('/updateRank/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const { rating, userid } = req.body;
    try {
                // Find the recipe by ID
        const recipe = await recipesModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Calculate the new average rating
        const updatedRank = ((parseFloat(rating) + parseFloat(recipe.rating)) / 2.0);
        recipe.rating = updatedRank;


        // Find the user by ID
        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Insert the new recipeId at the first available index in user.rating
        const insertIndex = user.rating.indexOf(recipe.Title);
        if (insertIndex === -1) {
            // If recipeId is not found in the array, add it
            user.rating.push(recipe.Title);
        }

        await Promise.all([user.save(), recipe.save()]); // Perform saves concurrently for efficiency

        res.json({ message: 'Rating updated successfully'});
        
    } 
    catch (error) {
        console.error('Error updating rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.put('/updatesearch/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { ingredients } = req.body;
    try {
        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find the first available index for insertion
        let insertIndex = 0;
        while (user.searched_ingredients.includes(ingredients[0])) {
            insertIndex++;
        }
        // Insert the new ingredients at the first available index
        user.searched_ingredients.splice(insertIndex, 0, ...ingredients);

        // Save the updated user document
        user = await user.save();

        return res.status(200).json({ message: "Searched ingredients updated successfully", user });
    } catch (error) {
        console.error('Error updating searched ingredients:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
  