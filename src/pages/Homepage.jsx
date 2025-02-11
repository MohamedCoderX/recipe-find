import React, { useState, useEffect } from 'react';
import { Landingpage } from '../Recipe-cmp/landing-page';
import { Loading } from '../Recipe-cmp/loading';
import { HeartIcon } from 'lucide-react';
import { Description } from '../Recipe-cmp/description';

// API Details
const App_Id = "0472da83";
const App_key = "e644ffd36469cfabebfa4d347d4b359e";

export const Homepage = () => {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchquery] = useState("");
  const [popin, setPopin] = useState(false);
  const [selectedRecipe, setSelectedrecipe] = useState(null);

  // Function for fetch recipes based on the query
  const fetchRecipies = async (query) => {
    try {
      // Make the API request to fetch recipes 
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${App_Id}&app_key=${App_key}`,
        {
          method: 'GET',
          headers: {
            'Edamam-Account-User': 'Halithmm', 
          },
        }
      );

      // Handle the API response and set the recipes in state
      const data = await response.json();
      setRecipe(data.hits); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false); // Handle error and stop loading
    }
  };

  // Handler to submit the search query
  const handlerSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchRecipies(searchQuery); // Fetch recipes based on the search query
  };

  // Function for open a popup with the recipe description
  const openpop = (recipe) => {
    setSelectedrecipe(recipe); // Set the selected recipe for the popup
    setPopin(true); 
  };

  // Function for close the popup
  const closepop = () => {
    setPopin(false); 
  };

  // Function for handle saving a recipe to the favorites list
  const savedList = (recipe) => {
    if (!recipe) {
      console.error("Recipe is undefined");
      return;
    }
  
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    // Extract correct data
    const simplifiedRecipe = {
      label: recipe.label || "Unknown Recipe",
      image: recipe.image || "",
      ingredients: recipe.ingredients || [],
      url: recipe.url || "",
    };
  
    // Prevent duplicate recipes
    const isAlreadySaved = favorites.some((fav) => fav.label === simplifiedRecipe.label && fav.url === simplifiedRecipe.url);
  
    if (!isAlreadySaved) {
      favorites.push(simplifiedRecipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    } else {
      alert("Recipe is already in favorites!");
    }
  };
  
  
  
  useEffect(() => {
    fetchRecipies("chicken"); // Fetch default recipes when the page loads
  }, []);

  return (
    <div>
      {/* Landing page component with search functionality */}
      <Landingpage 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchquery} 
        handlerSubmit={handlerSubmit} 
      />

      {/* Title and subtitle for recommended recipes */}
      <div className="Recipe-title">
        <h1>Recommended Recipes</h1>
      </div>

      {/* Display the recipes in a grid of cards */}
      <div className="card-container">
        {loading ? (
          <Loading /> // Show loading spinner if data is still being fetched
        ) : (
          // Map through the recipes and display them as cards
          recipes.map((recipe, index) => (
            <div className="cards" key={index}>
              <img 
                className="recipe-img" 
                src={recipe.recipe.image} 
                alt={recipe.recipe.label} 
              />
              <h3>{recipe.recipe.label}</h3>

              {/* Button to open the recipe description in a popup */}
              <div className="btn">
                <button 
                  className="Description-btn" 
                  onClick={() => openpop(recipe.recipe)}
                >
                  Description
                </button>
              </div>

              {/* Heart icon for saving a recipe to favorites */}
              <div className="saveList">
                <HeartIcon onClick={() => savedList(recipe.recipe)} className="heart-icon" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Popup to show the selected recipe description */}
      {popin && selectedRecipe && (
        <div className="popup">
          <div className="popup-content">
            <Description 
              recipe={selectedRecipe} 
              closepop={closepop} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
