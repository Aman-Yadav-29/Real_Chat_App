 import mongoose from 'mongoose'

 const UserSchema = mongoose.Schema({
    Email: {type: String, required: true, unique: true},
    FullName: {type: String, required: true},
    Password: {type: String, required: true, minlength: 6},
    profilePic: {type: String, default: ""},
    bio: {type: String},
 }, {timestamps: true});

 const User = mongoose.model("User", UserSchema);

 export default User;