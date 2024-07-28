import React, { useContext, useEffect, useState } from "react";
import "./SuccessPage.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate();
    const {id}= useParams();

    const [orderData, setOrderData] = useState({});
    
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${url}/api/orders/${id}`, {
                    headers: { token },
                });
                console.log(response.data.orderDetails)
                setOrderData(response.data.orderDetails);
            } catch (error) {
                console.error("Error fetching order:", error.message);
            }
        };

        fetchOrder();
    }, [id, token, url]);

    console.log(orderData)
    const shopMoreHandler = () => {
        navigate("/");
    }

    return (
        <div className="success-page">
            <h1>Order Successful!</h1>
            <div className="order-details">
                <h2>Order ID: {orderData?._id}</h2>
                <div className="details">
                    <div className="customer-details">
                        <h3>Customer Details</h3>
                        <p>
                            Name: {orderData?.address?.firstName} {orderData?.address?.lastName}
                        </p>
                        <p>Email: {orderData?.address?.email}</p>
                        <p>Phone: {orderData?.address?.phone}</p>
                    </div>
                    <div className="order-status">
                        {orderData?.orderStatus === "Pending" ? (
                            <>
                                Order Status:{" "}
                                <span style={{ color: "red" }}>{orderData?.orderStatus}</span>
                            </>
                        ) : (
                            <>
                                Order Status:{" "}
                                <span style={{ color: "green" }}>{orderData?.orderStatus}</span>
                            </>
                        )}

                        <p>Payment Method: {orderData?.paymentMethod}</p>
                        {orderData?.isPaid === false ? (
                            <>
                                Payment Status: <span style={{ color: "red" }}>Not Paid</span>
                            </>
                        ) : (
                            <>
                                Payment Status: <span style={{ color: "green" }}>Paid</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    {orderData?.items?.map((item, index) => (
                        <div key={index} className="order-item">
                            <img src={url + "/images/" + item.image} alt={item.name} />
                            <div className="item-details">
                                <h4>{item.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <p>
                                    Price: ${item.price} X {item.quantity} ={" "}
                                    {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="total-amount">
                        <h3>Shipping Price: $60</h3>
                        <h3>Total Amount: ${orderData?.totalAmount}</h3>
                        <button type="submit" onClick={shopMoreHandler} className="shopmore-btn">
                            Order More...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
