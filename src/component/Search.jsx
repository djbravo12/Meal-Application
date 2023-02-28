import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const [text, setText] = useState('')
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()


  const handleChange = (e) => {
    const value = e.target.value
    setText(value)
    console.log(text)
  }

  const handleSumbit = (e) => {
    e.preventDefault()

    if (text) {
      setSearchTerm(text)
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }

  return (
    <header className='search-container'>
      <form onSubmit={handleSumbit}>
        <input type="text" placeholder="type favorite meal" className="form-input" onChange={handleChange} value={text} />
        <button type="submit" className="btn"
        >search</button>
        <button type='button' className='btn btn-hipster' onClick={handleRandomMeal}>
          suprise me!</button>
      </form>
    </header>)
}

export default Search