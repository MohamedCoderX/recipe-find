import { HeartIcon } from 'lucide-react'; // Import HeartIcon from lucide-react
import React from 'react';
import { Link } from 'react-router-dom';  //  Link import from react-router-dom

export const Landingpage = ({ searchQuery, setSearchQuery, handlerSubmit }) => {
  return (
    <div>
      {/* Header Section */}
      <div className='Header-container'>
        <div className='Heading'>
          {/* Recipe App Logo and Title */}
          <img src="images/Burger (1).jpg" alt="Recipe App" />
          <h2>RECIPE APP</h2>
        </div>
        <div className='Favuo'>
          {/* Link to the favorites page */}
          <Link to="/favorites">
            {/* Heart icon for favorites */}
            <HeartIcon className='Heart-icon' />
          </Link>
        </div>
      </div>

      {/* Search Box Section */}
      <div className='search-box'>
        <form onSubmit={handlerSubmit}>
          {/* Input field for searching recipes */}
          <input
            type="text"
            placeholder='What do you want to cook ?'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='submitbutton'>
            {/* Submit button to trigger search */}
            <button className='submit-btn' type='submit'>Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};
