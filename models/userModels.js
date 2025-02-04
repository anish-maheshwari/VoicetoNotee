// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   lastName: {
//     type: String,
//     default: 'lastName',
//   },
//   location: {
//     type: String,
//     default: 'my city',
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },

//   avatar: String,
//     avatarPublicId: String,

//   });

// UserSchema.methods.toJSON = function () {
//   var obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

// export default mongoose.model('User', UserSchema);



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  

}, { timestamps: true });



// Remove password field from JSON responses
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User2", UserSchema, "user2");