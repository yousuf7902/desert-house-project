import deliveryManModel from "../models/deliveryManModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//create a delivery man
const addDeliveryMan = async (req, res) => {
    try {
        const addDeliveryMan = new deliveryManModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        });

        console.log(addDeliveryMan)

        await addDeliveryMan.save();
        res.json({ success: true, message: "Delivery Man added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


//get all delivery man
const allDeliveryMan = async (req, res) => {
    try {
        const allMan = await deliveryManModel.find({});
        res.json({ success: true, allMan });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//assign a delivery man to a order
const assignDeliveryMan = async(req,res) => {
    try {
        const deliveryMan = await deliveryManModel.findById(req.body.deliveryMenId);
        const order = await orderModel.findById(req.body.orderId);
        const user = await userModel.findById(order.userId);
        user.orderMessages.push({
            orderId: req.body.orderId,
            deliveryMan: deliveryMan.name,
            deliveryManPhone: deliveryMan.phone,
        });
        await user.save();
        res.json({ success: true, message: "Assigned delivery man for this order"});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addDeliveryMan, allDeliveryMan, assignDeliveryMan };
