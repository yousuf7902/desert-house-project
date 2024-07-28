import mongoose from "mongoose"

export const connectDB= async () =>{
await mongoose
    .connect("mongodb://localhost:27017/desertDB")
    .then(() => console.log("DB is connected"))
    .catch((error) => {
        console.log("DB is not connected");
        console.log(error);
        process.exit(1);
    });
}