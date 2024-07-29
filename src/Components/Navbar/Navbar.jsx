import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { token, setToken, cartItems, food_list, url } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState("");

    console.log(cartItems);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("order");
        setToken("");
        navigate("/");
    };

    const searchHandler = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const data =
            food_list &&
            food_list.filter((food) => food.name.toLowerCase().includes(term.toLowerCase()));

        setSearchData(data);
    };

    return (
        <div className="navbar">
            <img src={assets.logo} alt="logo" className="logo" />
            <ul className="navbar-menu">
                <li>
                    <Link
                        to="/"
                        onClick={() => setMenu("home")}
                        className={menu === "home" ? "active" : ""}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/foods"
                        onClick={() => setMenu("foods")}
                        className={menu === "foods" ? "active" : ""}
                    >
                        Foods
                    </Link>
                </li>
                <li>
                    <Link
                        to="/foods/latest"
                        onClick={() => setMenu("latest")}
                        className={menu === "latest" ? "active" : ""}
                    >
                        Latest Food
                    </Link>
                </li>
                <li>
                    <Link
                        to="/foods/category"
                        onClick={() => setMenu("category")}
                        className={menu === "category" ? "active" : ""}
                    >
                        Choose Category
                    </Link>
                </li>
            </ul>
            <div className="navbar-right">
                <div className="navbar-input">
                    <input
                        type="text"
                        placeholder="Search your food..."
                        value={searchTerm}
                        onChange={searchHandler}
                    />
                    <div className="navbar-icon">
                        <img src={assets.search_icon} alt="Search-icon" />
                    </div>
                    {searchTerm && searchTerm.length !== 0 ? (
                        <div className="search-results">
                            {searchData &&
                                searchData.map((item, index) => (
                                    <div key={index} className="search-item">
                                        {console.log(item)}
                                        <div>
                                            <img
                                                src={url + "/images/" + item.image}
                                                alt={item.name}
                                                className="search-item-image"
                                            />
                                        </div>
                                        <div className="search-item-details">
                                            <h3>{item.name}</h3>
                                            <p>Price: {item.price}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </div>

                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="basket-icon" />
                    </Link>
                    {Object.keys(cartItems).length > 0 && (
                        <span className="dot">{Object.keys(cartItems).length}</span>
                    )}
                    {/* <div className={Object.keys(cartItems).length === 0 ? "" : "dot"}></div> */}
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li>
                                <Link to="/myorders" className="list_style">
                                    <img src={assets.bag_icon} alt="" />
                                    <p>Orders</p>
                                </Link>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
