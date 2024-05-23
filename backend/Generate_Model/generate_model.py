import random
import string
import pandas as pd
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split
from surprise import SVD
from surprise.dump import dump
from surprise import accuracy


# Function to generate random user ID
def generate_user_id():
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=24))


# Sample recipe names
sample_recipe_names = [
    "Warm Comfort",
    "Gorditas con Camarones",
    "Green Seasoning",
    "Best Deviled Eggs",
    "Spiral Ham in the Slow Cooker",
    "Chicken and Rice With Leeks and Salsa Verde",
    "Maple and Chile Roasted Squash With Quinoa Tabouli",
    "Spicy Coconut Pumpkin Soup",
    "Creole Cream Cheese",
    "Spiced Lamb and Dill Yogurt Pasta",
    "Creole Cream Cheesecake With Caramel-Apple Topping",
    "Hot Pimento Cheese Dip",
    "Shrimp Creole",
    "Braised Chicken Legs With Grapes and Fennel",
    "Salmon Burgers With Ginger and Quick-Pickled Cucumbers",
    "Our Favorite Creamy Mashed Potatoes",
    "Coconut-Creamed Corn and Grains",
    "Caramelized Plantain Parfait",
    "Thanksgiving Mac and Cheese",
    "Crispy Salt and Pepper Potatoes",
    "Roasted Beets With Crispy Sunchokes and Pickled Orange-Ginger Purée",
    "Sloppy Joe Shirred Eggs With Spinach",
    "Fish Tacos al Pastor",
    "Drunk Apricot Shito (Ghanaian Hot Pepper Sauce)",
    "Salt-and-Pepper Fish",
    "Papaya-and-Cubeb-Marinated Snapper With Baked Yam Chips",
    "Tomato Brown Butter",
    "Maple Barbecue Grilled Chicken",
    "Italian Sausage and Bread Stuffing",
    "Nut Butter Granola Bars",
    "Kale and Pumpkin Falafels With Pickled Carrot Slaw",
    "Pumpkin Dutch Baby With Pumpkin Butter",
    "Pita",
    "Zucchini-Lentil Fritters With Lemony Yogurt",
    "Newtons Law",
    "Butternut Squash and Apple Soup",
    "Chicken and Rice With Leeks and Salsa Verde",
    "Shrimp Creole",
    "Salmon Burgers With Ginger and Quick-Pickled Cucumbers",
    "Our Favorite Creamy Mashed Potatoes",
    "Salt-and-Pepper Fish",
    "Dad’s Curried Chicken",
    "Maple Barbecue Grilled Chicken",
    "Mango Curry",
    "Paneer With Burst Cherry Tomato Sauce",
    "Miso-Glazed Salmon With Sushi Rice",
    "Coconut Rice",
    "Tiger Fruit Salad",
]


# Function to generate random recipe name
def generate_recipe_name():
    return random.choice(sample_recipe_names)


# Generate random data
num_users = 100
num_recipes_per_user = 10
data = {
    "_id": [generate_user_id() for _ in range(num_users)],
    "name": [f"User{i}" for i in range(num_users)],
    "email": [f"user{i}@example.com" for i in range(num_users)],
    "password": [f"password{i}" for i in range(num_users)],
    "recipe_ratings": [
        [generate_recipe_name() for _ in range(num_recipes_per_user)]
        for _ in range(num_users)
    ],
    "liked_recipes": [
        [generate_recipe_name() for _ in range(random.randint(1, num_recipes_per_user))]
        for _ in range(num_users)
    ],
    "searched_ingredients": [
        [generate_recipe_name() for _ in range(random.randint(1, num_recipes_per_user))]
        for _ in range(num_users)
    ],
}

# Convert the data to a DataFrame
df = pd.DataFrame(data)

# Print the generated dataset
print("Generated Dataset:")
print(df)

# Define a Reader object
reader = Reader(rating_scale=(1, 5))

# Initialize empty lists for user, item, and rating
users = []
items = []
ratings = []

# Loop through the data and extract user, item, and rating information
for i, row in df.iterrows():
    for recipe_rating in row["recipe_ratings"]:
        users.append(row["_id"])
        items.append(recipe_rating)
        ratings.append(random.randint(1, 5))  # Random ratings between 1 and 5

# Create a DataFrame from the extracted information
data_df = pd.DataFrame({"user": users, "item": items, "rating": ratings})

# Load data from the DataFrame and specify the fields
dataset = Dataset.load_from_df(data_df[["user", "item", "rating"]], reader)

# Split the data into train and test sets
trainset, testset = train_test_split(dataset, test_size=0.2)

# Choose a recommendation algorithm (SVD in this case) with regularization
model = SVD(reg_all=0.1)

# Train the model on the trainset
model.fit(trainset)

# Evaluate the performance of the trained model
predictions = model.test(testset)
rmse = accuracy.rmse(predictions)
print(f"RMSE: {rmse}")

import os

# Specify the folder path where you want to save the trained model
output_folder = (
    "C:/Users/danaa/Downloads/FlavorFusion (2)/FlavorFusion/backend/Services"
)

# Define the output file path for the trained model
output_file = os.path.join(output_folder, "reccommendation_model.pkl")
dump(output_file, algo=model)

print("Trained model saved successfully!")
