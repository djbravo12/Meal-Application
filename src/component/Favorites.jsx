import { useGlobalContext } from "../context"

const Favorites = () => {

  const { removeToFavorite, selectMeal, favorite } = useGlobalContext()
  return <section className="favorites">
    <div className="favorites-content">
      <h5>favorites</h5>
      <div className="favorites-container">
        {favorite.map((item) => {
          const { idMeal, strMealThumb: image } = item
          return <div key={idMeal} className="favorite-item">
            <img src={image} alt='favorite-meal' className="favorites-img img" onClick={() => selectMeal(idMeal, true)} />
            <button className='remove-btn' onClick={() => removeToFavorite(idMeal)}> remove</button>
          </div>
        })}
      </div>
    </div>
  </section>
}

export default Favorites