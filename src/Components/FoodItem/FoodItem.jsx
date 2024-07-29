import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
const FoodItem = ({ id, name, price, description, image, stock }) => {
    const { cartItems, addToCart, removeFromCart, url, decrementItem } = useContext(StoreContext);
    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className="food-item-image" src={url + "/images/" + image} alt="" />
                {!cartItems[id] ? (
                    <>
                        <img
                            className="add"
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_white}
                            alt=""
                        />
                    </>
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={() => {
                                if (cartItems[id] > 1) {
                                    decrementItem(id);
                                } else {
                                    removeFromCart(id);
                                }
                            }}
                            src={assets.remove_icon_red}
                            alt=""
                        />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                )}
                {stock < 10 ? <p className="food-item-stock">{stock} In stock</p> : null}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name.length > 25 ? name.slice(0, 25) + "..." : name}</p>
                </div>
                <p className="food-item-desc">
                    {description.length > 50 ? description.slice(0, 45) + "..." : description}
                </p>
                <p className="food-item-price">{price}tk</p>
            </div>
        </div>
    );
};

export default FoodItem;
