import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar:{
    type:String,
    default:"https://cdn.vectorstock.com/i/2000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif"
  },
  
},{
  timestamps: true});

const User = mongoose.model('User', userSchema); //name of the model 

export default User;
