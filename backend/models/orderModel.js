import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        tranId: {
            type: String,
        },
        items: {
            type: Array,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0.0,
        },
        address: {
            type: Object,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        orderStatus: {
            type: String,
            required: true,
            default: "Pending",
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
