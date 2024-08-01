import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import LatestFood from "../../Components/LatestFood/LatestFood";
import PoplularFoods from "../../Components/PopularFoods/PoplularFoods";
const Home = () => {
    const [category, setCategory] = useState("All");

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <LatestFood />
            <PoplularFoods />
        </div>
    );
};

export default Home;
