/* import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);

    const [myOrders, setMyOrders] = useState();


    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await axios.get(
                    `${url}/api/orders/user-orders`,

                    {
                        headers: { token },
                    }
                );
                setMyOrders(res.data.orders);
            } catch (error) {
                console.error("Error fetching order:", error.message);
            }
        };
        fetchAllOrders();
    }, [url, token]);

    console.log(myOrders)

    return <div></div>;
};

export default MyOrders;
 */

import React, { useContext, useEffect, useState } from "react";
import "./AllOrders.css";
import { StoreContext } from "../../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const AllOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [allOrders, setAllOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchAllOrders = async () => {
        try {
            const res = await axios.get(`${url}/api/orders/allorders`, {
                headers: { token },
            });
            setAllOrders(res.data.allOrders);
        } catch (error) {
            console.error("Error fetching order:", error.message);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [url, token]);

    const filteredOrders =
        searchTerm === ""
            ? allOrders
            : allOrders?.filter(
                  (order) =>
                      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
              );


    const viewDetailsHandler = (order_id) => {
        navigate(`/order-success/${order_id}`);
    };

    const onChangeHandler = async(foodId, e) => {
        const status = e.target.value;
        await axios.put(`${url}/api/orders/${foodId}`, {status}, {
            headers:{token}
        }).then((res) => {
            if(res.data.url){
                window.location.replace(res.data.url);
            }
        });
        await fetchAllOrders();
    };


    return (
        <div className="my-orders">
            <h1>All Orders ({allOrders?.length})</h1>
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
                    {filteredOrders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{order._id}</td>
                            <td>{order.createdAt.slice(0, 10)}</td>
                            <td>${order.totalAmount.toFixed(2)}</td>
                            <td>{order.items.length}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                {order.isPaid ? (
                                    <span className={`admin-status ${order.isPaid}`}>Paid</span>
                                ) : (
                                    <span className={`admin-status ${order.isPaid}`}>Due</span>
                                )}
                            </td>
                            <td>
                                {/* {order.orderStatus} */}
                                <select
                                    onChange={(e) => onChangeHandler(order._id, e)}
                                    name="order-status"
                                    className={`admin-panel-status ${order.orderStatus.toLowerCase()}`}
                                    value={order.orderStatus}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Out-For-Delivery">Out-For-Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
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

export default AllOrders;
