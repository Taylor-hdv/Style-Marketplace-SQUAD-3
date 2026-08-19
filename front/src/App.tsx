import { BrowserRouter } from 'react-router'
import SignIn from './pages/SignIn'
import Header from './components/header&footer/Header'

function App() {
  return(
    <BrowserRouter>
      <Header notifications={2}/>
      <SignIn />
    </BrowserRouter>
  )
}

export default App