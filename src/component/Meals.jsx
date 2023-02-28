import { useGlobalContext } from "../context"
import { AiOutlineLike } from 'react-icons/ai'

const Meals = () => {
  const { meals, loading, selectMeal, addToFavorite } = useGlobalContext()


  if (loading) {
    return <section className="section">
      <h4>Loading...</h4>
    </section>
  }

  if (meals.length < 1) {
    console.log(meals.length)
    return <section className="section">
      <h4>No meals matched your search term. Please try
        again.</h4>
    </section>
  }

  return <section className="section-center" >
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
      // console.log(singleMeal)
      return <article key={idMeal} className="single-meal">
        <img src={image} style={{ witdh: '200px' }} className="img" onClick={() => selectMeal(idMeal)} />
        <footer>
          <h5>{title}</h5>
          <button className='like-btn' onClick={() => addToFavorite(idMeal)}><AiOutlineLike /></button>
        </footer>
      </article>
    })}
  </section>
}

export default Meals