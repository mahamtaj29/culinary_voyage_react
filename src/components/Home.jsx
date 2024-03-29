import React, { useState } from 'react';
import { CategoryList } from './CategoryList';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useRandProducts } from '../hooks/useRandProducts';

export const Home = () => {
  const [selectedCategoryName, setSelectedCategoryName] = useState('Meals');
  const [categorisedProducts, error, searchQuery] = useFetchProducts(selectedCategoryName);
  const [categorisedProducts1, error1, fetchRandom] = useRandProducts(selectedCategoryName);
  const [showRandomRecipe, setShowRandomRecipe] = useState(false);
  // Function to handle category selection
  const onSelectCategory = (clickedCategoryName) => {
    setSelectedCategoryName(clickedCategoryName);
    // Reset showRandomRecipe when category changes
    setShowRandomRecipe(false); 
  };
 // Function to handle search query
  const onSearchQuery = (item) => {
    setSelectedCategoryName(item.target.value);
    setShowRandomRecipe(false); 
  };
  // Function to handle click on random button
  const handleRandomClick = () => {
    // Pass selectedCategoryName to fetchRandom
    fetchRandom(selectedCategoryName); 
    setShowRandomRecipe(true);
  };

  return (
    <div className="home">
      <CategoryList 
        title="All Categories"
        onSelectCategory={onSelectCategory}
      />
      {/* Buttons for selecting categories */}
      <div className='categories-row'>
        <button onClick={() => onSelectCategory('Meals')}>Meals</button>
        <button onClick={() => onSelectCategory('Cocktails')}>Cocktails</button>
      </div>
      <div>
        <br />
        {/* Search input and random button */}
        <input type="text" id='search-input' placeholder="Search by name" value={searchQuery} onChange={onSearchQuery} />
        <button onClick={handleRandomClick}>Random {selectedCategoryName.slice(0, -1)}</button>
      </div>
      <div className='products-container'>
        {error && <div>{error}</div>}
        {!showRandomRecipe && categorisedProducts.map((product) => (
          <div key={product.idMeal || product.idDrink} className='product-box'>
            {/* Displaying random recipe details */}
            <img src={product.strMealThumb || product.strDrinkThumb} alt={product.strMeal || product.strDrink} style={{ width: '200px', height: 'auto' }} />
            <h3>{product.strMeal || product.strDrink}</h3>
            <button>See Details</button>
          </div>
        ))}
        {showRandomRecipe && (
          <div>
            <h2>Random {selectedCategoryName}</h2>
            {error1 ? (
              <p>{error1}</p>
            ) : (
              <div>
                <h3>{categorisedProducts1.strMeal || categorisedProducts1.strDrink}</h3>
                <img src={categorisedProducts1.strMealThumb || categorisedProducts1.strDrinkThumb} alt={categorisedProducts1.strMeal || categorisedProducts1.strDrink} />
              </div>
            )}
          </div>
        )}
      </div>
      </div>
  );
};