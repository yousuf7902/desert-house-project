import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.stock,
        image: image_filename,
    });
    
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }
};

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }
};

//all category data based on total sell
const categoryData = async (req, res) => {
    try {
        const categories = await foodModel.find({}, { category: 1, image: 1, _id: 0 }).sort({
            totalSell: -1,
        });
        res.json({ success: true, categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//latest foods based on createTime
const latestFoods = async (req, res) => {
    try {
        const latestFoods = await foodModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, latestFoods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//popular foods based on the total sell
const popularFoods = async (req, res) => {
    try {
        const popularFoods = await foodModel.find({}).sort({
            totalSell: -1,
        });
        res.json({ success: true, popularFoods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//single food by their id
const singleFood = async (req, res) => {
    try {
        const food = await foodModel.findById({
            _id: req.params.id,
        });
        res.json({ success: true, food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//edit food by their id
const editFood = async (req, res) => {
    try {
        const food = await foodModel.findById({ _id: req.params.id });
        const { name, description, price, category, stock } = req.body;

        if (req.file) {
            let filename = `${req.file.filename}`;
            food.image = filename;
        }

        food.name = name;
        food.description = description;
        food.price = price;
        food.category = category;
        food.countInStock = stock;
        await food.save();

        res.json({ success: true, message: "Product Updated Succesfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export {
    addFood,
    listFood,
    removeFood,
    categoryData,
    latestFoods,
    popularFoods,
    singleFood,
    editFood,
};
