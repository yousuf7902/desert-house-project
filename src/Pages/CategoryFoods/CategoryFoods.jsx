import React, { useState, useEffect, useContext } from "react";
import "./CategoryFoods.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";

const CategoryFoods = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const { url, food_list, fetchFoodList } = useContext(StoreContext);
    const [sortBy, setSortBy] = useState("Default");
    const [show, setShow] = useState(10);

    useEffect(() => {
        const fetchCategoryData = async () => {
            await axios
                .get(`${url}/api/food/category`)
                .then((res) => setCategoryData(res.data.categories));
        };
        fetchCategoryData();
        fetchFoodList();
    }, []);


    const categories = [...new Set(categoryData.map((item) => item.category))];

    const filteredFoods = selectedCategory
        ? food_list.filter((food) => food.category === selectedCategory)
        : "";

    return (
        <div className="category-foods">
            <h1 >Our Categories</h1>
            <div className="categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={selectedCategory === category ? "active" : ""}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {selectedCategory === "" ? (
                <h1 className="category-header">Choose your category to show the foods</h1>
            ) : (
                <>
                    <div className="filter-area">
                        <div className="filter-left">
                            <span>{selectedCategory}</span>
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
                                <select
                                    value={show}
                                    onChange={(e) => setShow(Number(e.target.value))}
                                >
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <FoodDisplay data={filteredFoods} sortBy={sortBy} show={show} />
                </>
            )}
        </div>
    );
};

export default CategoryFoods;
