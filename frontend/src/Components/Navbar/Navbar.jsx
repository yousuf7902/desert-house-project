import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { FiLogOut } from "react-icons/fi";
import { FaShoppingBag } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { token, setToken, cartItems, food_list, url, userData } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState("");

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("order");
        setToken("");
        navigate("/");
        window.location.reload();
    };

    const searchHandler = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const data =
            food_list &&
            food_list.filter((food) => food.name.toLowerCase().includes(term.toLowerCase()));

        setSearchData(data);
    };

    const itemHandler = (id) => {
        navigate(`/foods/${id}`);
        setSearchTerm("");
        setSearchData("");
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
                                    <div
                                        key={index}
                                        className="search-item"
                                        onClick={() => itemHandler(item._id)}
                                    >
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
                    {!userData?.isAdmin && (
                        <>
                            <Link to="/cart">
                                <img src={assets.basket_icon} alt="basket-icon" />
                            </Link>
                            {Object?.keys(cartItems).length > 0 && (
                                <span className="dot">{Object.keys(cartItems).length}</span>
                            )}
                        </>
                    )}
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Log In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />

                        {userData?.isAdmin ? (
                            <ul className="nav-profile-dropdown">
                                <li>
                                    <Link to="/admin/all-orders" className="list_style">
                                        <FaListCheck size={20} />
                                        <p>Orders</p>
                                    </Link>
                                </li>
                                <hr />
                                <li>
                                    <Link to="/admin/list-items" className="list_style">
                                        <FaList size={20} />
                                        <p>List Items</p>
                                    </Link>
                                </li>
                                <hr />
                                <li>
                                    <Link to="/admin/add-items" className="list_style">
                                        <IoMdAddCircle size={20} />
                                        <p>Add Items</p>
                                    </Link>
                                </li>
                                <hr />
                                <li>
                                    <Link to="/admin/add-delivery-man" className="list_style">
                                        <FaUser size={20} />
                                        <p>Add Delivery Man</p>
                                    </Link>
                                </li>
                                <hr />
                                <li onClick={logout}>
                                    <FiLogOut size={20} />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        ) : (
                            <ul className="nav-profile-dropdown">
                                <li>
                                    <Link to="/myorders" className="list_style">
                                        <FaBagShopping size={20} />
                                        <p>Orders</p>
                                    </Link>
                                </li>
                                <hr />
                                <li onClick={logout}>
                                    <FiLogOut size={20} />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
