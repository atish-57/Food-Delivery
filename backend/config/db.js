import mongoose from "mongoose";

export const connectDB = async () => {
        mongoose.connect(`${process.env.MONGODB_URI}/tomato`)
                .then(() => console.log("DB connected successully"))
}