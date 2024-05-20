require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/user-routes');
const cookieParser = require('cookie-parser');
const recipesModel = require('./Models/Recipes');
const cors = require('cors'); 
const app = express();

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
  
  app.put('/updateLike/:recipeId', async (req, res) => {
      const { recipeId } = req.params;
      const { like } = req.body;
      try {
          const updatedRecipe = await recipesModel.findByIdAndUpdate(
              recipeId,
              { $set: { like: like } }, // Update the like field
              { new: true }
          );
  
          if (!updatedRecipe) {
              return res.status(404).json({ message: 'Recipe not found' });
          }
  
          return res.status(200).json({ message: 'Like updated successfully', recipe: updatedRecipe });
      } catch (error) {
          console.error('Error updating like:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  });

  app.put('/updateRank/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const { rating } = req.body;

    try {
        const recipe = await recipesModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'recipe not found' });
        }
        const updatedRank = ((parseFloat(rating) + parseFloat(recipe.rating)) / 2.0);
        recipe.rating = updatedRank;
        const updatedrecipe = await recipe.save();

        res.json({ message: 'Rating updated successfully'});
    } catch (error) {
        console.error('Error updating rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
  