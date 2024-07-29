import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import FoodDisplay from "../FoodDisplay/FoodDisplay";
import HomeFoodDisplay from "../HomeFoodDisplay/HomeFoodDisplay";
import "./LatestFood.css";

const LatestFood = () => {
    const { url } = useContext(StoreContext);
    const [latestFoods, setLatestFoods] = useState();

    useEffect(() => {
        const fetchLatestFoods = async () => {
            await axios
                .get(`${url}/api/food/latest`)
                .then((res) => setLatestFoods(res.data.latestFoods.slice(0, 10)));
        };
        fetchLatestFoods();
    }, []);

    return (
        <div>
            <h1 className="latest-header">New Food Items</h1>
            <HomeFoodDisplay data={latestFoods} />
        </div>
    );
};

export default LatestFood;
