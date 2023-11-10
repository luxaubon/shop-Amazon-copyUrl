import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  repassword: { type: String},
  logHistory: [
    { 
      data: { type: String},
      date: { type: Date, default: Date.now }
    },
  ],
  favoritelog: {type: Array, default: []},
  
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;