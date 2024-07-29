import React, { useContext, useEffect, useState } from 'react'
import "../LatestFood/LatestFood.css"
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import HomeFoodDisplay from '../HomeFoodDisplay/HomeFoodDisplay';

const PoplularFoods = () => {
    const {url} = useContext(StoreContext);
    const [popularFoods, setPopularFoods] = useState();

    useEffect(()=>{
        const fetchPopularFoods = async () => {
            await axios
                .get(`${url}/api/food/popular`)
                .then((res) => setPopularFoods(res.data.popularFoods.slice(0, 10)));
        }
        fetchPopularFoods()
    },[])

  return (
      <div>
          <h1 className="latest-header">Popular Food Items</h1>
          <HomeFoodDisplay data={popularFoods}/>
      </div>
  );
}

export default PoplularFoods
