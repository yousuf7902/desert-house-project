import React, { useContext, useEffect, useState } from 'react'
import "./LatestFoods.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';

const LatestFoods = () => {
    const {url} = useContext(StoreContext);
    const [latestFoods, setLatestFoods] = useState();
    const [sortBy, setSortBy] = useState("Default");
    const [show, setShow] = useState(10);

    useEffect(() => {
        const fetchLatestFoods = async()=> {
            await axios
                .get(`${url}/api/food/latest`)
                .then((res) => setLatestFoods((res.data.latestFoods).slice(0,15)));
        }
        fetchLatestFoods();
    },[])

  return (
      <div>
          <div className="all-foods">
              <div className="header-foods">
                  <h1>Top {latestFoods?.length} Latest Foods</h1>
                  <p>From Our Kitchen to Your Table!</p>
              </div>
              <div className="filter-area">
                  <div className="filter-left">
                      <span>Latest Foods</span>
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
              <FoodDisplay data={latestFoods} sortBy={sortBy} show={show} />
          </div>
      </div>
  );
}

export default LatestFoods
