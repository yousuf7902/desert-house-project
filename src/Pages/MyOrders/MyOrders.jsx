import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [myOrders, setMyOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await axios.get(`${url}/api/orders/user-orders`, {
                    headers: { token },
                });
                setMyOrders(res.data.orders);
            } catch (error) {
                console.error("Error fetching order:", error.message);
            }
        };
        fetchAllOrders();
    }, [url, token]);

    const filteredOrders =
        searchTerm === ""
            ? myOrders
            : myOrders?.filter(
                  (order) =>
                      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
              );

    const viewDetailsHandler = (order_id) => {
        navigate(`/order-success/${order_id}`);
    };

    return (
        <div className="my-orders">
            <h1>My Orders ({myOrders?.length})</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Items</th>
                        <th>Payment Method</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders?.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{order._id}</td>
                            <td>{order.createdAt.slice(0, 10)}</td>
                            <td>${order.totalAmount.toFixed(2)}</td>
                            <td>{order.items.length}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                {order.isPaid ? (
                                    <span className={`my-order-status ${order.isPaid}`}>Paid</span>
                                ) : (
                                    <span className={`my-order-status ${order.isPaid}`}>Due</span>
                                )}
                            </td>
                            <td>
                                <span
                                    className={`my-order-status ${order.orderStatus.toLowerCase()}`}
                                >
                                    {order.orderStatus}
                                </span>
                            </td>
                            <td>
                                <button
                                    type="submit"
                                    onClick={() => viewDetailsHandler(order._id)}
                                    className="view-details"
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
