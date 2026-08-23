import { BrowserRouter } from 'react-router'
import Profile from './pages/Profile'
import Header from './components/header&footer/Header'
import profileImage from './assets/profile/profileImage.svg'

function App() {
  return(
    <BrowserRouter>
      <Header notifications={2}/>
      <Profile firstName="Lucas" lastName="Mendes" email="lucasm@gmail.com" profileImage={profileImage} orders={5} wishlist={3} ratings={4.5} memberSince="2022" phone="(11) 99999-9999" dateOfBirth="1990-01-01" gender="Male"/>
    </BrowserRouter>
  )
}

export default App