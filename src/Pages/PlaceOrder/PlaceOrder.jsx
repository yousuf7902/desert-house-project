import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url, loadCartData, placeOrderData } =
        useContext(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        const storedOrder = localStorage.getItem("order");
        if (storedOrder) {
            const { address } = JSON.parse(storedOrder);
            return address;
        } else {
            return {
                firstName: "",
                lastName: "",
                email: "",
                address: "",
                city: "",
                country: "",
                zipcode: "",
                phone: "",
            };
        }
    });
    console.log(data);
    const [paymentMethod, setPaymentMethod] = useState("");

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData((data) => ({ ...data, [name]: value }));
    };

    const codHandler = () => {
        setPaymentMethod("COD");
    };

    const onlinePaymentHandler = () => {
        setPaymentMethod("Online-Payment");
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                itemInfo["totalSell"] += cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            totalAmount: getTotalCartAmount() + 60,
            paymentMethod,
        };

        try {
            const res = await axios.post(url + "/api/orders/placeorder", orderData, {
                headers: { token },
            });
            await loadCartData(token);
            placeOrderData(res.data.order);

            if (paymentMethod === "COD") {
                const {_id}=JSON.parse(localStorage.getItem('order'));
                navigate(`/order-success/${_id}`);
            } else {
                try {
                    const { _id } = JSON.parse(localStorage.getItem("order")) || " ";
                    const res = await axios.post(
                        url + "/api/orders/online-payment",
                        { _id },
                        {
                            headers: { token },
                        }
                    );
                    placeOrderData(res.data.order);
                    window.location.replace(res.data.url);
                } catch (error) {
                    console.log(error.message);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First name"
                        required
                    />
                    <input
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last name"
                        required
                    />
                </div>
                <input
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email address"
                    required
                />
                <input
                    name="address"
                    onChange={onChangeHandler}
                    value={data.address}
                    type="text"
                    placeholder="Address..."
                    required
                />
                <input
                    name="city"
                    onChange={onChangeHandler}
                    value={data.city}
                    type="text"
                    placeholder="City"
                    required
                />
                <div className="multi-fields">
                    <input
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                        required
                    />
                    <input
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip code"
                        required
                    />
                </div>
                <input
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                    required
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}tk</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 60}tk</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 60}tk</b>
                        </div>
                    </div>
                    <div className="placeorder-btn">
                        <button type="submit" onClick={codHandler}>
                            Cash On Delivery
                        </button>
                        <button type="submit" onClick={onlinePaymentHandler}>
                            Online Payment
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
