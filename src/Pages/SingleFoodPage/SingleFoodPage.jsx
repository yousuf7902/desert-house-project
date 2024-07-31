/* import React from 'react'
import "./SingleFoodPage.css"

const SingleFoodPage = () => {
  return (
    <div>
      
    </div>
  )
}

export default SingleFoodPage
 */

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
                <p className="category">Category: {foodItem.category}</p>
                <p className="description">{foodItem.description}</p>
                <p className="price">{foodItem.price} Tk</p>
                <p className="total-sell">Total Sold: {foodItem.totalSell}</p>
                {/* <button className="add-to-cart" onClick={() => addToCartHandler(id)}>
                    Add to Cart
                </button> */}

                <div className="button-container">
                    {!userData.isAdmin && (
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
