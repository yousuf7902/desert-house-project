import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        orderMessages: [
            {
                orderId: {
                    type: String,
                },
                deliveryMan: {
                    type: String,
                },
                deliveryManPhone: {
                    type: Number,
                },
            },
        ],
        cartData: {
            type: Object,
            default: {},
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
