const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    // Run your code here, after you have insured that the connection was made
    const newRecipe = await Recipe.create({ title: 'New recipe Title', cuisine: 'new cuisine type' });
    console.log("New recipe:", newRecipe.title);
    const multipleRecipes = await Recipe.insertMany(data);
    multipleRecipes.forEach(recipe => {
      console.log('Title -->', recipe.title);
    });
    await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    )
    await Recipe.deleteOne({ title: 'Carrot Cake' });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
};

manageRecipes();
