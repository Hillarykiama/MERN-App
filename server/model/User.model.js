import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        required : [true,"Please provide unique username"],
        unique:[true,"Username Exist"]
    },
    password: {
       type: String,
        required:[true,"Please provide a Password"],
        unique : false,
    },
    email:{
        type:String,
        required: [true, "Please provide a unique Email"],
        unique:true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : {type : Number},
    address: { type: String},
    profile: { type: String},

})

export default mongoose.model.Users || mongoose.model('User', UserSchema);