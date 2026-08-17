import { BrowserRouter } from 'react-router'
import SignUp from './pages/SignUp'
import Header from './components/header&footer/Header'

function App() {
  return(
    <BrowserRouter>
      <Header notifications={2}/>
      <SignUp />
    </BrowserRouter>
  )
}

export default App