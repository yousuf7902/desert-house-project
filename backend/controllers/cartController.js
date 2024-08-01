import userModel from "../models/userModel.js";

//add cartItem to database
const cartItems = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        userData.cartData=req.body.cartItems;
        await userData.save();
    }
    catch(error){
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { getCart, cartItems };
