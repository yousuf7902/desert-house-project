import React, { useContext } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./HomeFoodDisplay.css"

const HomeFoodDisplay = ({ data }) => {
    return (
        <div className="home-food-display" id="home-food-display">
            <div className="home-food-display-list">
                {data?.map((item, index) => {
                    return (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            stock={item.countInStock}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HomeFoodDisplay;
