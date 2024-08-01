import React, { useState, useEffect } from "react";
import "./ListItems.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListItems = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const filteredList =
        searchTerm === ""
            ? list
            : list?.filter(
                  (food) =>
                      food.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      food.category.toLowerCase().includes(searchTerm.toLowerCase())
              );

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    };

    const editFood = async (foodId) => {
        navigate(`/admin/list-items/edit/${foodId}`);
    };
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <h1 className="list-header">All Deserts List ({list.length})</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search deserts by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="list-container">
                <div className="list-table">
                    <div className="list-table-format title">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b>Stock</b>
                        <b>Sold</b>
                        <b>Action</b>
                    </div>
                    {filteredList.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`list-table-format  ${
                                    item.countInStock === 0 ? "out-of-stock-list" : ""
                                }`}
                            >
                                <img src={`${url}/images/` + item.image} alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}tk</p>
                                <p>
                                    {item.countInStock === 0 ? "Out Of Stock" : item.countInStock}
                                </p>
                                <p>{item.totalSell}</p>
                                <div className="btn-area">
                                    <button
                                        onClick={() => removeFood(item._id)}
                                        className="remove-btn"
                                    >
                                        X
                                    </button>
                                    <button onClick={() => editFood(item._id)} className="edit-btn">
                                        Edit Items
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ListItems;
