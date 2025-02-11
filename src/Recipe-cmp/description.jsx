export const Description = ({ recipe, closepop }) => {
  return (
    <div className="recipe-Detail">
      {/* Recipe Image Section */}
      <div className="img-detail">
        <img src={recipe.image} alt={recipe.label} />
      </div>

      {/* Recipe Description and Ingredients Section */}
      <div className="description-detail">
        <h3>{recipe.label}</h3>

        {/* Display ingredients */}
        <p>
          {recipe.ingredients ? (
            // If ingredients available map them and display
            recipe.ingredients.map((ingredient, index) => (
              <span key={index}>{ingredient.text}</span>
            ))
          ) : (
            // If no ingredients available display fallback message
            "No ingredients available."
          )}
        </p>
      </div>

      {/* Close Button to exit description */}
      <button onClick={closepop} className="close-btn">
        Close
      </button>
    </div>
  );
};
