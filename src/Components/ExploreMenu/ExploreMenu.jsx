import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Discover Our Menu</h1>
        <p>Delight in our selection of scrumptious cakes, mouth-watering pastries, and heavenly sweets. Each treat is crafted with care to bring joy to your taste buds and make every occasion special. From classic cakes to innovative desserts, our shop offers something for everyone. Whether you're celebrating a milestone or simply indulging in a sweet moment, our delightful menu has the perfect treat waiting for you.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name? "all" : item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.menu_name? "active":""} src={item.menu_image} alt=''/>
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
