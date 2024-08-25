import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "./../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const address = event.target.address;
        const phone = event.target.phone;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value, [address]: value, [phone]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
        
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
            window.location.reload();
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? (
                        <></>
                    ) : (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}
                    {currState === "Login" ? (
                        <></>
                    ) : (
                        <input
                            name="address"
                            onChange={onChangeHandler}
                            value={data.address}
                            type="text"
                            placeholder="Your address"
                            required
                        />
                    )}
                    {currState === "Login" ? (
                        <></>
                    ) : (
                        <input
                            name="phone"
                            onChange={onChangeHandler}
                            value={data.phone}
                            type="text"
                            placeholder="Phone Number"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="password"
                        required
                    />
                </div>
                <button type="submit">
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account?
                        <span onClick={() => setCurrState("Sign Up")}> Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?
                        <span onClick={() => setCurrState("Login")}> Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
