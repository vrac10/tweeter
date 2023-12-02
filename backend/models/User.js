import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type : String,
        required: true,
    },
    password: {
        type : String,
        required: true,
    },
    age : {
        type : String,
        required: true,
    }
})

const userModel = mongoose.model('User', userSchema);

export default userModel;