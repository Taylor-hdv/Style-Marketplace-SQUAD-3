import { BrowserRouter, Routes } from 'react-router'
import CardCategory from './components/cardCategory/CardCategory'
import categoryIcon from './assets/cardCategory/categoryIcon.svg'
function App() {
  return(
    <CardCategory title="Camisetas" quantity="10" src={categoryIcon} alt="Camisetas" /> 
  )
}

export default App