import './App.css'
import Search from './component/Search'
import Meals from './component/Meals'
import Modal from './component/Modal'
import Favorites from './component/Favorites'
import { useGlobalContext } from './context'



export default function App() {
  const { showModal, favorite } = useGlobalContext()

  return (
    <main>
      <Search />
      {favorite.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>

  )
}
