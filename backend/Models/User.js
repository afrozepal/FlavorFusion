const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // minlength: 6s
    },
    rating: {
        type: [String],
        required: false,
        default: []
    },
    liked_recipes: {
        type: [String],
        required: false,
        default: []
    },
    searched_ingredients: {
        type: [String],
        required: false,
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);