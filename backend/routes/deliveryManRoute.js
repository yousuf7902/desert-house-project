import express from "express";
import { addDeliveryMan, allDeliveryMan, assignDeliveryMan } from "../controllers/deliveryManController.js";



const deliveryRouter= express.Router();

deliveryRouter.post("/add", addDeliveryMan);
deliveryRouter.post("/assign", assignDeliveryMan);
deliveryRouter.get("/all",allDeliveryMan);


export default deliveryRouter;