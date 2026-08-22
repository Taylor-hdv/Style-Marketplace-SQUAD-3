import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/header&footer/Header'
import profileImage from './assets/profile/profileImage.svg'

function App() {
  return(
    <BrowserRouter>
      <Header notifications={2}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile firstName="Lucas" lastName="Mendes" userId="cmt21r4yc0002wxkkgbbex2tf" email="lucasm@gmail.com" profileImage={profileImage} orders={5} wishlist={3} ratings={4.5} memberSince="2022" phone="(11) 99999-9999" dateOfBirth="1990-01-01" gender="Male" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App