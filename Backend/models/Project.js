import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true,},
  title: { type: String, required: true,  unique: true },
  createdDate: { type: Date, default: Date.now },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

export default mongoose.model("Project", ProjectSchema);