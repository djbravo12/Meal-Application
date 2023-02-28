import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AppContext = createContext(null)

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
const allMealsUr = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const mealsByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=a"

const AppProvider = ({ children }) => {

  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorite, SetFavorite] = useState([])

  const fetchData = async (dataurl) => {
    setLoading(true)
    try {
      const { data } = await axios.get(dataurl)
      console.log(data.meals)
      data.meals ? setMeals(data.meals) : setMeals([])
    }
    catch (error) {
      console.log(error.response)
    }
    setLoading(false)
  }


  useEffect(() => {
    fetchData(mealsByName)
  }, [])


  useEffect(() => {
    fetchData(allMealsUr)
  }, [])

  useEffect(() => {
    if (!searchTerm) return
    fetchData(`${allMealsUr}${searchTerm}`)
  }, [searchTerm])


  const fetchRandomMeal = () => {
    fetchData(randomMealUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) => {

    let meal
    if (favoriteMeal) {
      meal = favoriteMeal.find((meal) => meal.idMeal === idMeal)
    }
    else {
      meal = Meals.find((meal) => meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavorite = (idMeal) => {
    const alreadyFavorite = favorite.find((meal) => meal.idMeal === idMeal)
    if (alreadyFavorite) return
    const meal = meals.find((meal) => meal.idMeal === idMeal)
    const updateFavorite = [...favorite, meal]

    SetFavorite(updateFavorite)

  }
  const removeToFavorite = (idMeal) => {
    const updateFavorite = favorite.filter((meal) => meal.idMeal !== idMeal)
    console.log(updateFavorite)
    SetFavorite(updateFavorite)
  }

  return <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, addToFavorite, removeToFavorite, favorite }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider, AppContext }