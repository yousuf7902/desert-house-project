import React, { useContext, useEffect, useState } from "react";
import "./EditItems.css";
import axios from "axios";
import { assets } from "../../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditItems = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Cake",
        stock: "",
    });

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchSingleFood = async () => {
            await axios.get(`${url}/api/food/${id}`).then((res) => {
                setData({
                    name: res.data.food.name,
                    description: res.data.food.description,
                    price: res.data.food.price,
                    category: res.data.food.category,
                    stock: res.data.food.countInStock,
                });
            });
        };
        fetchSingleFood();
    }, [id]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("stock", data.stock);
        formData.append("image", image);

        const response = await axios.put(`${url}/api/food/edit/${id}`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Cake",
                stock: "",
            });
            setImage(false);
            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/admin/list-items");
            }, 1000);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className="add">
            <div className="add-header">
                <h1>Edit Your Food Item</h1>
            </div>
            <form className="add-form" onSubmit={onSubmitHandler}>
                <div className="add-img-upload">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                    />
                </div>

                <div className="add-product-name">
                    <p>Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>

                <div className="add-product-description">
                    <p>Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>

                <div className="add-category-price-stock">
                    <div className="add-category">
                        <p>Category</p>
                        <select onChange={onChangeHandler} name="category" required>
                            <option value="Cake">Cake</option>
                            <option value="Cupcake">Cupcake</option>
                            <option value="Sweets">Sweets</option>
                            <option value="Pastry">Pastry</option>
                            <option value="Pudding">Pudding</option>
                            <option value="Donuts">Donuts</option>
                            <option value="Waffle">Waffle</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div className="add-price">
                        <p>Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="Food Price..."
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="add-stock">
                        <p>Stock</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.stock}
                            type="number"
                            name="stock"
                            placeholder="Enter stock..."
                            required
                            min="0"
                        />
                    </div>
                </div>

                <button type="submit" className="add-btn">
                    UPDATE FOOD
                </button>
            </form>
        </div>
    );
};

export default EditItems;
