import { BrowserRouter, Routes } from 'react-router'
import CardCategory from './components/cardCategory/CardCategory'
import productIcon from "./assets/cardProduct/productImage.svg";


function App() {
  return(
    <CardCategory src={productIcon} alt="Product Icon" title="Clothing" quantity="100"></CardCategory>
  )
}

export default App