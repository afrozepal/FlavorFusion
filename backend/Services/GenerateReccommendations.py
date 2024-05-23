import sys
import json
from surprise.dump import load
import os

# Get the current directory of the script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Define the model filename
model_filename = "reccommendation_model.pkl"

# Construct the model path using the current directory
model_path = os.path.join(current_directory, model_filename)

# Check if the model file exists
if not os.path.exists(model_path):
    print(
        json.dumps(
            {
                "error": f"Model file '{model_filename}' not found in the directory: {current_directory}"
            }
        )
    )
    exit()

# Load the trained model
try:
    _, model = load(model_path)
except Exception as e:
    print(json.dumps({"error": f"Error loading model: {str(e)}"}))
    exit()


# Main function to generate recommendations
def main(email, liked_recipes):
    # If liked_recipes is empty, initialize it as an empty list
    if not liked_recipes:
        liked_recipes = []

    try:
        # Get the predictions for the user's recipes
        predictions = [
            model.predict(email, recipe_name) for recipe_name in liked_recipes
        ]

        # Sort predictions by estimated rating
        predictions.sort(key=lambda x: x.est, reverse=True)

        # Get top 10 recommendations
        top_recommendations = [pred.iid for pred in predictions[:10]]

        # Print recommendations as JSON array
        print(json.dumps(top_recommendations))
    except Exception as e:
        print(json.dumps({"error": f"Error generating recommendations: {str(e)}"}))
        exit()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(
            json.dumps(
                {
                    "error": "Usage: python GenerateReccommendations.py <email> <liked_recipes_json>"
                }
            )
        )
        exit()

    user_email = sys.argv[1]
    liked_recipes_json = sys.argv[2]

    try:
        liked_recipes = json.loads(liked_recipes_json)
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON for liked recipes"}))
        exit()

    main(user_email, liked_recipes)
