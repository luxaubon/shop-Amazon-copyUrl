import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  pid: { type: String, required: true },
  title: { type: String, required: true },
  detail: { type: String, required: true },
  like: {type: Number, default: 0},
  loglike: {type: Array, default: []},
  commentid: {type: String, default: null},
  reply: {type: String, default: null},
  date: { type: Date, default: Date.now },
  
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;