import React, { useContext, useState } from "react";
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
import { StoreContext } from "./Context/StoreContext";
import AddItems from "./Pages/Admin/AddItems/AddItems";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListItems from "./Pages/Admin/ListItems/ListItems";
import EditItems from "./Pages/Admin/EditItems/EditItems";
import AllOrders from "./Pages/Admin/AllOrders/AllOrders";
import DeliveryMan from "./Pages/Admin/AssignDeliveryMan/DeliveryMan";
import AddDeliveryMan from "./Pages/Admin/AddDeliveryMan/AddDeliveryMan";

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { url } = useContext(StoreContext);
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
                    <Route path="/foods/latest" element={<LatestFoods />} />
                    <Route path="/foods/category" element={<CategoryFoods />} />
                    <Route path="/foods/:id" element={<SingleFoodPage />} />
                    <Route path="/admin/add-items" element={<AddItems url={url} />} />
                    <Route path="/admin/list-items" element={<ListItems url={url} />} />
                    <Route path="/admin/list-items/edit/:id" element={<EditItems url={url}/>}/>
                    <Route path="/admin/all-orders" element={<AllOrders/>}/>
                    <Route path="/admin/assign-delivery-man/:id" element={<DeliveryMan/>}/>
                    <Route path="/admin/add-delivery-man" element={<AddDeliveryMan/>}/>
                </Routes>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
            <Footer />
        </>
    );
};

export default App;
