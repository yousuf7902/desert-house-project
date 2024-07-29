import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import SuccessPage from "./Pages/OrderSuccessPage/SuccessPage";
import MyOrders from "./Pages/MyOrders/MyOrders";
import AllFoods from "./Pages/AllFoods/AllFoods";
import LatestFoods from "./Pages/LatestFoods/LatestFoods";
import CategoryFoods from "./Pages/CategoryFoods/CategoryFoods";
import SingleFoodPage from "./Pages/SingleFoodPage/SingleFoodPage";
const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
            <div className="app">
                <Navbar setShowLogin={setShowLogin} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
                    <Route path="/order" element={<PlaceOrder />} />
                    <Route path="/order-success/:id" element={<SuccessPage />} />
                    <Route path="/myorders" element={<MyOrders />} />
                    <Route path="/foods" element={<AllFoods />} />
                    <Route path="/foods/latest" element={<LatestFoods/>}/>
                    <Route path="/foods/category" element={<CategoryFoods />} />
                    <Route path="/foods/:id" element={<SingleFoodPage/>}/>
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
