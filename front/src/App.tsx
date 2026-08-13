import { BrowserRouter, Routes } from 'react-router'
import CardProduct from './components/cardProduct/CardProduct'

function App() {
  return(
    <CardProduct 
      src="/src/assets/cardProduct/productImage.svg"
      alt="Product Image"
      title="Denim Jeans"
      price="$ 99"
      quantity={10}
      tag="New"
      rating={4.5}
      oldPrice="129"
      tagColor="bg-blackCustom"
    />
  )
}

export default App