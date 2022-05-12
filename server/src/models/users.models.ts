import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 20
  },
  phone: {
    type: String,
    required: false,
    minlength: 10
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  bio: {
    type: String
  },
  photo: {
    type: String
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});


// encrypt password
UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.hash = async function(password:string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}


const signOptions: SignOptions = {
  expiresIn: process.env.JWT_EXPIRES
}

// sign JWT and return
UserSchema.methods.getJWT = function() {
  const jwtsecret: string = process.env.JWT_SECRET || "";
  const payload = {
    id: this._id,
    email: this.email,
    iat: Date.now(),
  }
  return jwt.sign(payload, jwtsecret, signOptions);
}

//  verify password during login
UserSchema.methods.comparePass = async function(password: string){
  return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("graphqlusers", UserSchema);
export default userModel;