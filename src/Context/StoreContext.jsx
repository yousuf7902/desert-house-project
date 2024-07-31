import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [userData, setUserData] = useState({});
    const [orderData, setOrderData] = useState(
        localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : {}
    );
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        /* if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        } */
    };

    /* const decrementItem = async(itemId) => {
        if (cartItems[itemId] === 0) {
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                if (updatedCart[itemId]) {
                    delete updatedCart[itemId];
                }
                return updatedCart;
            });
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }

        if(token){
            await axios.put(url + "/api/cart/decrement", {itemId}, {headers:{token}});
        }
    } */

    const decrementItem = (itemId) => {
        if (cartItems[itemId] === 0) {
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                if (updatedCart[itemId]) {
                    delete updatedCart[itemId];
                }
                return updatedCart;
            });
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
    };

    const incrementItem = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId]) {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
        /* if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        } */
    };

    const addCartToDb = async () => {
        if (token) {
            await axios.post(url + "/api/cart/cart-items", { cartItems }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    const placeOrderData = async (data) => {
        localStorage.setItem("order", JSON.stringify(data));
        setOrderData(data);
    };

    const userDetails = async (token) => {
        const response = await axios.get(url + "/api/user/userdata", { headers: { token } });
        setUserData(response.data.userData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await userDetails(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        decrementItem,
        incrementItem,
        addCartToDb,
        url,
        token,
        setToken,
        loadCartData,
        orderData,
        placeOrderData,
        userData,
        userDetails,
        fetchFoodList,
    };
    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};
export default StoreContextProvider;
