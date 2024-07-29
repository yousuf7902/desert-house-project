/* import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category, show }) => {
    const { food_list } = useContext(StoreContext);
    
    return (
        <div className="food-display" id="food-display">
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category.toLowerCase()) {
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
                    }
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
 */

import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Pagination from "../Pagination/Pagination";

const FoodDisplay = ({data, category, sortBy, show }) => {
    const { food_list } = useContext(StoreContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredList, setFilteredList] = useState([]);

    console.log(category);

    useEffect(() => {
        const filtered = data ? data : food_list.filter(
            (item) => category === "All" || category === item.category.toLowerCase()
        );

        if (sortBy === "Price Low to High") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price High to Low") {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredList(filtered);
        setCurrentPage(1);
    }, [category, food_list, sortBy, data]);

    const indexOfLastItem = currentPage * show;
    const indexOfFirstItem = indexOfLastItem - show;
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredList.length / show);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="food-display" id="food-display">
            <div className="food-display-list">
                {currentItems.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        stock={item.countInStock}
                    />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} />
        </div>
    );
};
export default FoodDisplay;
