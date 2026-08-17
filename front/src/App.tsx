import { BrowserRouter } from 'react-router'
import SignUn from './pages/SignUp'
import Header from './components/header&footer/Header'

function App() {
  return(
    <BrowserRouter>
      <Header notifications={2}/>
      <SignUn />
    </BrowserRouter>
  )
}

export default App