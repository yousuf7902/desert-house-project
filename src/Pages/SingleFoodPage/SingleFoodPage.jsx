import React, { useContext, useEffect, useState } from "react";
import "./SingleFoodPage.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SingleFoodPage = () => {
    const { id } = useParams();
    const { url, addToCart, userData } = useContext(StoreContext);
    const [foodItem, setFoodItem] = useState({});
    const navigate = useNavigate();
    console.log(foodItem.countInStock);

    useEffect(() => {
        const fetchSingleFood = async () => {
            await axios.get(`${url}/api/food/${id}`).then((res) => setFoodItem(res.data.food));
        };
        fetchSingleFood();
    }, [id]);

    const addToCartHandler = (id) => {
        addToCart(id);
        navigate("/cart");
    };

     const handleGoBack = () => {
         navigate(-1); 
     };

    return (
        <div className="single-food-page">
            <div className="food-image">
                <img src={url + "/images/" + foodItem.image} alt={foodItem.name} />
            </div>
            <div className="food-details">
                <h1>{foodItem.name}</h1>
                {foodItem.countInStock === 0 ? <h1>Out of stock</h1> : null}
                <p className="category">Category: {foodItem.category}</p>
                <p className="description">{foodItem.description}</p>
                <p className="price">{foodItem.price} Tk</p>
                <p className="total-sell">Total Sold: {foodItem.totalSell}</p>
                <div className="button-container">
                    {!userData.isAdmin && foodItem.countInStock > 0 && (
                        <button className="add-to-cart" onClick={() => addToCartHandler(id)}>
                            Add to Cart
                        </button>
                    )}
                    <button className="add-to-cart" onClick={handleGoBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleFoodPage;
