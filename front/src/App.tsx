import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/header&footer/Header";
import ProductInfo from "./pages/ProductInfo";
import profileImage from "./assets/profile/profileImage.svg";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header notifications={2} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <Profile profileImage={profileImage} wishlist={3} ratings={4.5} />
          }
        />
        <Route
          path="/product-info"
          element={
            <ProductInfo
              productName="Premium Cotton T-Shirt"
              rating={5}
              reviews={450}
              price={29}
              stock={100}
              oldPrice={40}
              maxItems={10}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
