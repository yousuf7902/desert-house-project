import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = ({ setShowLogin }) => {
    const {
        cartItems,
        food_list,
        removeFromCart,
        getTotalCartAmount,
        url,
        decrementItem,
        incrementItem,
        addCartToDb,
        token,
        fetchFoodList,
    } = useContext(StoreContext);

    useEffect(()=>{
        fetchFoodList();
    }, [])

    const navigate = useNavigate();

    const checkoutHandler = () => {
        if (token) {
            addCartToDb();
            navigate("/order");
        } else {
            setShowLogin(true);
        }
    };

    const orderNowHandler = () => {
        navigate("/foods");
    };

    return (
        <div className="cart">
            {Object.keys(cartItems).length === 0 ? (
                <div className="empty-cart">
                    <h1>Your cart is empty. Fill it with some delicious food!</h1>
                    <button onClick={orderNowHandler}>Order Now</button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        <div className="cart-items-title">
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>
                        <br />
                        <hr />
                        {food_list.map((item, index) => {
                            console.log(cartItems[item._id]);
                            if (cartItems[item._id] > 0) {
                                return (
                                    <div>
                                        <div className="cart-items-title cart-items-item">
                                            <img src={url + "/images/" + item.image} alt="" />
                                            <p>{item.name}</p>
                                            <p>{item.price}tk</p>
                                            <div className="quantity-control">
                                                <button
                                                    className="btn-decrement"
                                                    onClick={() => decrementItem(item._id)}
                                                    disabled={cartItems[item._id] <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity">
                                                    {cartItems[item._id]}
                                                </span>
                                                <button
                                                    className="btn-increment"
                                                    onClick={() => incrementItem(item._id)}
                                                    disabled={
                                                        cartItems[item._id] >= item.countInStock
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p>{(item.price * cartItems[item._id]).toFixed(2)}tk</p>
                                            <p
                                                onClick={() => removeFromCart(item._id)}
                                                className="cross"
                                            >
                                                x
                                            </p>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="cart-bottom">
                        <div className="cart-total">
                            <h2>Cart Totals</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>{getTotalCartAmount().toFixed(2)}tk</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>{getTotalCartAmount() === 0 ? 0 : 60}tk</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <b>Total</b>
                                    <b>
                                        {getTotalCartAmount() === 0
                                            ? 0
                                            : (getTotalCartAmount() + 60).toFixed(2)}
                                        tk
                                    </b>
                                </div>
                            </div>
                            <button onClick={checkoutHandler}>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
