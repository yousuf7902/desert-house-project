import mongoose from "mongoose"

export const connectDB= async () =>{
await mongoose
    .connect(
        "mongodb+srv://yousuf7902:1234567tyttyt@cluster0.r0oggqp.mongodb.net/desertDB"
    )
    .then(() => console.log("DB is connected"))
    .catch((error) => {
        console.log("DB is not connected");
        console.log(error);
        process.exit(1);
    });
}