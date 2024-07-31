import React, { useContext, useState } from "react";
import "./AddDeliveryMan.css";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext";
import { toast } from "react-toastify";

const AddDeliveryMan = () => {
    const { url } = useContext(StoreContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${url}/api/delivery-man/add`, formData);
            if (res.data.success) {
                toast.success(res.data.message);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                });
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.log(error.data.message);
        }
    };

    return (
        <div className="add-delivery-man-container">
            <h1>Add New Delivery Man</h1>
            <form onSubmit={handleSubmit} className="add-delivery-man-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Add Delivery Man
                </button>
            </form>
        </div>
    );
};

export default AddDeliveryMan;
