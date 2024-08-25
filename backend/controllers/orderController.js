import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import SSLCommerzPayment from "sslcommerz-lts";
import { ObjectId } from "mongodb";

//SSLCommerz
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

//placeorder to database
const placeOrder = async (req, res) => {
    try {
        const createOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
        });
        await createOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        createOrder.items.map(async (order) => {
            const food = await foodModel.findById(order._id);
            food.countInStock = food.countInStock - order.quantity;
            food.totalSell = food.totalSell + order.quantity;
            await food.save();
        });

        res.json({ success: true, order: createOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//online payment sslcommerz
const onlinePayment = async (req, res) => {
    try {
        const tran_id = new ObjectId().toString();
        const order = await orderModel.findById(req.body._id);

        order.tranId = tran_id;
        await order.save();

        const cusName = order.address.firstName + " " + order.address.lastName;

        const data = {
            total_amount: order.totalAmount,
            currency: "BDT",
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `http://localhost:4000/api/orders/payment/success/${tran_id}`,
            fail_url: "http://localhost:3030/fail",
            cancel_url: "http://localhost:3030/cancel",
            ipn_url: "http://localhost:3030/ipn",
            shipping_method: "Courier",
            product_name: "Computer.",
            product_category: "Electronic",
            product_profile: "general",
            cus_name: cusName,
            cus_email: order.address.email,
            cus_add1: order.address.address,
            cus_add2: "Dhaka",
            cus_city: order.address.city,
            cus_state: "Dhaka",
            cus_postcode: order.address.zipcode,
            cus_country: order.address.country,
            cus_phone: order.address.phone || " ",
            cus_fax: "01711111111",
            ship_name: cusName,
            ship_add1: order.address.address,
            ship_add2: "Dhaka",
            ship_city: order.address.city,
            ship_state: "Dhaka",
            ship_postcode: order.address.zipcode,
            ship_country: order.address.country,
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then((apiResponse) => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL, order });
            console.log("Redirecting to: ", GatewayPageURL);
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//online payment successs sslcommerz
const paymentSuccess = async (req, res) => {
    try {
        const updateOrder = await orderModel.findOne({ tranId: req.params.tranId });

        if (!updateOrder) {
            return res.status(404).json({ message: "Order is not found" });
        }

        updateOrder.isPaid = true;
        await updateOrder.save();
        res.redirect(`http://localhost:5173/order-success/${updateOrder._id}`);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//Find order by id
const orderById = async (req, res) => {
    try {
        const orderDetails = await orderModel.findById({ _id: req.params.id });

        if (!orderDetails) {
            res.json({ success: false, message: "Order is not found" });
        }

        res.json({ success: true, orderDetails });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// find all orders of users
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }).sort({
            updatedAt: -1,
            createdAt: -1,
        });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// find all orders of website
const allOrders = async (req, res) => {
    try {
        const allOrders = await orderModel.find({}).sort({
            createdAt: -1,
            updatedAt: -1,
        });
        res.json({ success: true, allOrders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//update a order
const updateOrder = async (req, res) => {
    try {
        const order = await orderModel.findById({ _id: req.params.id });
        console.log(order)

        if (req.body.status === "Delivered") {
            order.orderStatus = req.body.status;
            order.isPaid = true;
            await order.save();
            res.json({ success: true, message: "Order has been updated" });
        } else if (req.body.status === "Out-For-Delivery") {
            order.orderStatus = req.body.status;
            await order.save();
            let deliveryUrl = `http://localhost:5173/admin/assign-delivery-man/${req.params.id}`;
            res.json({ url: deliveryUrl });
        } else {
            order.orderStatus = req.body.status;
            await order.save();
            res.json({ success: true, message: "Order has been updated" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, onlinePayment, paymentSuccess, orderById, userOrders, allOrders, updateOrder };
