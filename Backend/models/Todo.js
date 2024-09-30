import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'complete'], default: 'pending' },
},
{ timestamps: true });


export default mongoose.model("Todo", TodoSchema);