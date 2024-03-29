import { useState, useEffect } from "react";

export const useRandProducts = (selectedCategoryName) => {
  const [categorisedProducts1, setCategorisedProducts1] = useState([]);
  const [error1, setError1] = useState();

  const fetchRandom = async () => {
    try {
      let url;
      if (selectedCategoryName === "Meals") {
        url = `https://www.themealdb.com/api/json/v1/1/random.php`;
      } else if (selectedCategoryName === "Cocktails") {
        url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const product = await response.json();
        setCategorisedProducts1(product.meals ? product.meals[0] : product.drinks[0]);
        setError1(null); // Reset error if successful
      } else {
        throw new Error("Can't fetch the data");
      }
    } catch (error) {
      setError1(error.message); // Set error message if failed
    }
  };

  useEffect(() => {
    // Fetch random recipe only if the category is selected
    if (selectedCategoryName) {
      fetchRandom();
    }
  }, [selectedCategoryName]);

  return [categorisedProducts1, error1, fetchRandom];
};
