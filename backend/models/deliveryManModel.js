import mongoose from "mongoose";

const deliveryManSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const deliveryManModel = mongoose.model.delivery || mongoose.model("delivery", deliveryManSchema);

export default deliveryManModel;
