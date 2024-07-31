import React, { useState } from "react";
import "./AddItems.css";
import axios from "axios";
import { assets } from "../../../assets/assets";
import { toast } from "react-toastify";

const AddItems = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Cake",
        stock: "",
    });
    
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
        const response = await axios.post(`${url}/api/food/add`, formData);
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
        } else {
            toast.error(response.data.message);
        }
    };
    return (
        <div className="add">
            <div className="add-header">
                <h1>Add Item To Your Lists</h1>
            </div>
            <form className="" onSubmit={onSubmitHandler}>
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
                        required
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
                        <select onChange={onChangeHandler} name="category">
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
                            type="text"
                            name="price"
                            placeholder="Food Price..."
                        />
                    </div>
                    <div>
                        <p>Stock</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.stock}
                            type="text"
                            name="stock"
                            placeholder="Enter stock..."
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    ADD FOOD
                </button>
            </form>
        </div>
    );
};

export default AddItems;
