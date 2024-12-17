import React, { useContext, useEffect, useState } from "react";
import "./AllFoods.css";
import { StoreContext } from "../../Context/StoreContext";
import { useSearchParams } from "react-router-dom";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";

const AllFoods = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Default");
    const [show, setShow] = useState(10);

    useEffect(() => {
        if (categoryData !== null) {
            setCategory(categoryData.toLowerCase());
        }
        else{
            setCategory("All")
        }
    }, [categoryData]);

    return (
        <div className="all-foods">
            <div className="header-foods">
                <h1>{category === "All" ? "FOODS" : category.toUpperCase()}</h1>
                <p>From Our Kitchen to Your Table!</p>
            </div>
            <div className="filter-area">
                <div className="filter-left">
                    <span>{category.toUpperCase()}</span>
                </div>
                <div className="filter-right">
                    <div className="sort-by">
                        <label>Sort By:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="Default">Default</option>
                            <option value="Price Low to High">Price Low to High</option>
                            <option value="Price High to Low">Price High to Low</option>
                        </select>
                    </div>
                    <div className="show">
                        <label>Show:</label>
                        <select value={show} onChange={(e) => setShow(Number(e.target.value))}>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            </div>
            <FoodDisplay category={category} sortBy={sortBy} show={show} />
        </div>
    );
};

export default AllFoods;