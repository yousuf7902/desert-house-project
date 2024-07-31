import React, { useContext, useEffect, useState } from "react";
import "./DeliveryMan.css";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeliveryMan = () => {
    const [deliveryMen, setDeliveryMen] = useState();
    const { url } = useContext(StoreContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllDeliveryMan = async (req, res) => {
            await axios
                .get(`${url}/api/delivery-man/all`)
                .then((res) => setDeliveryMen(res.data.allMan));
        };
        fetchAllDeliveryMan();
    }, []);

    const handleAssign = async (manId) => {
        try {
            const data = {
                orderId: id,
                deliveryMenId: manId,
            };
            const res = await axios.post(`${url}/api/delivery-man/assign`, data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/all-orders");
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="delivery-man-container">
            <h1>Assign Delivery Man</h1>
            <div className="delivery-man-list">
                {deliveryMen?.map((man) => (
                    <div key={man._id} className="delivery-man-card">
                        <div className="delivery-man-info">
                            <h2>{man.name}</h2>
                            <p>Email: {man.email}</p>
                            <p>Phone: {man.phone}</p>
                        </div>
                        <button className="assign-button" onClick={() => handleAssign(man._id)}>
                            Assign
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeliveryMan;
