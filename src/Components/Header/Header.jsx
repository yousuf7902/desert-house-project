import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const orderNowHandler = () => {
        navigate("/foods");
    };
    return (
        <div className="header">
            <div className="header-contents">
                <button onClick={orderNowHandler} className="order-btn">
                    Order Now
                </button>
            </div>
        </div>
    );
};

export default Header;
