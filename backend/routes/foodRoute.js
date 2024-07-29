import express from "express";
import {
    addFood,
    categoryData,
    latestFoods,
    listFood,
    popularFoods,
    removeFood,
    singleFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()} ${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/category", categoryData);
foodRouter.get("/latest", latestFoods);
foodRouter.get("/popular", popularFoods);
foodRouter.get("/:id", singleFood)
export default foodRouter;
