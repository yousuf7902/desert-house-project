import React, { useContext, useEffect, useState } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
const ExploreMenu = () => {
    const [categoryData, setCategoryData] = useState([]);
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryData = async () => {
            await axios
                .get(`${url}/api/food/category`)
                .then((res) => setCategoryData(res.data.categories));
        };
        fetchCategoryData();
    }, []);

    const categories = [...new Set(categoryData.map((item) => item))].slice(0, 8);

    const categoryHandler = (category) => {
      navigate(`/foods?category=${category}`)
    } 

    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Discover Our Menu</h1>
            <p>
                Delight in our selection of scrumptious cakes, mouth-watering pastries, and heavenly
                sweets. Each treat is crafted with care to bring joy to your taste buds and make
                every occasion special. From classic cakes to innovative desserts, our shop offers
                something for everyone. Whether you're celebrating a milestone or simply indulging
                in a sweet moment, our delightful menu has the perfect treat waiting for you.
            </p>
            <div className="explore-menu-list">
                {categories.map((item) => {
                    return (
                            <div
                                className="explore-menu-list-item"
                                onClick={() => categoryHandler(item.category)}
                            >
                                <img src={url + "/images/" + item.image} alt="" />
                                <p>{item.category}</p>
                            </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
