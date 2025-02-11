import React, { useState, useEffect } from 'react';
import { Description } from '../Recipe-cmp/description';

export const Favoritepage = () => {
  const [favorites, setFavorites] = useState([]);
  const [popin, setPopin] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (label) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.label !== label);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const openpop = (recipe) => {
    setSelectedRecipe(recipe);
    setPopin(true);
  };

  const closepop = () => {
    setPopin(false);
  };

  return (
    <div>
      <h1>Favorite Recipes</h1>
      <div className="card-container">
        {favorites.length === 0 ? (
          <p>No favorite recipes added.</p>
        ) : (
          favorites.map((recipe, index) => (
            <div className="cards" key={index}>
              <img className="recipe-img" src={recipe.image} alt={recipe.label} />
              <h3>{recipe.label}</h3>

              <div className="btn">
                <button className="Description-btn" onClick={() => openpop(recipe)}>
                  Description
                </button>
              </div>

              <div className="saveList">
                <button onClick={() => removeFavorite(recipe.label)} className="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {popin && selectedRecipe && (
        <div className="popup">
          <div className="popup-content">
            <Description recipe={selectedRecipe} closepop={closepop} />
          </div>
        </div>
      )}
    </div>
  );
};
