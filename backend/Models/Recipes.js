const mongoose=require('mongoose')

const recipesSchema= new mongoose.Schema(
    {
        Title:String,
        Ingredients:String,
        Instructions:String,
        Image_Name:String,
        like:Number,
        rating:Number
    }
)

const recipesModel=mongoose.model("recipes" , recipesSchema )
module.exports=recipesModel