import { useState, useEffect } from "react"
export const useFetchProducts = (selectedCategoryName) => {

    const [categorisedProducts, setCategorisedProducts] = useState([]);
    //const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        //setIsLoading(true)
        const fetchProduct = async () => {
          try{
            let url;
            if (selectedCategoryName === "Meals") {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`
          } else if (selectedCategoryName === "Cocktails") {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita`
          } 
            const response = await fetch(url)
            if(response.ok){
              const product = await response.json()
              setCategorisedProducts(product.meals || product.drinks) // only product
              //setIsLoading(false)
            }else{
              //isLoading(false)
              throw new Error("Can't fetch the data")
            }
    
          }catch(error){
            setError("Can't fetch the data")
            //isLoading(false)
          }
        }
        fetchProduct()
      }, [selectedCategoryName, searchQuery])

      return [categorisedProducts, error, searchQuery] //isLoading is removed from here
}

