import React, { useContext, useEffect, useState } from "react";
import "./SuccessPage.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
    const { url, token, userData, userDetails } = useContext(StoreContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [orderData, setOrderData] = useState({});
    const [orderMessage, setOrderMessage] = useState();
    const [show, setShow] = useState(false);

    console.log(userData);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${url}/api/orders/${id}`, {
                    headers: { token },
                });
                console.log(response.data.orderDetails);
                setOrderData(response.data.orderDetails);
            } catch (error) {
                console.error("Error fetching order:", error.message);
            }
        };

        fetchOrder();
        userDetails(token);
    }, [id, token, url]);

    useEffect(() => {
        if (userData?.orderMessages && userData.orderMessages.length > 0) {
            userData.orderMessages.forEach((orderMessage) => {
                console.log(orderMessage._id, id);
                if (orderMessage.orderId === id) {
                    setOrderMessage(orderMessage);
                    setShow(true);
                }
            });
        }
    }, [userData, show, orderMessage]);

    const shopMoreHandler = () => {
        setShow(false);
        navigate("/");
    };

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
                        {orderData?.orderStatus && (
                            <>
                                Order Status:{" "}
                                <span
                                    className={`admin-panel-status ${orderData?.orderStatus?.toLowerCase()}`}
                                >
                                    {orderData?.orderStatus}
                                </span>
                            </>
                        )}

                        <p>Payment Method: {orderData?.paymentMethod}</p>
                        {orderData?.isPaid === false ? (
                            <>
                                Payment Status:{" "}
                                <span className={`admin-status ${orderData?.isPaid}`}>
                                    Not Paid
                                </span>
                            </>
                        ) : (
                            <>
                                Payment Status:{" "}
                                <span className={`admin-status ${orderData?.isPaid}`}>Paid</span>
                            </>
                        )}
                    </div>
                </div>

                {show && (
                    <>
                        <div className="delivery-man-details">
                            <h3>Delivery Man Details</h3>
                            <p>Name: {orderMessage.deliveryMan}</p>
                            <p>Phone: 0{orderMessage.deliveryManPhone}</p>
                        </div>
                    </>
                )}

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    {orderData?.items?.map((item, index) => (
                        <div key={index} className="order-item">
                            <img src={url + "/images/" + item.image} alt={item.name} />
                            <div className="item-details">
                                <h4>{item.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <p>
                                    Price: {item.price} X {item.quantity} ={" "}
                                    {(item.price * item.quantity).toFixed(2)} TK
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="total-amount">
                        <h3>Shipping Price: 60 TK</h3>
                        <h3>Total Amount: {orderData?.totalAmount} TK</h3>
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
