import mongoose from "mongoose";

const FourSchema = new mongoose.Schema({
  category: { type: String, required: true },
  list: { type: [String], required: true },
});

const FourGroupSchema = new mongoose.Schema({
  fourByFour: { type: [FourSchema], required: true },
});

const Four = mongoose.models?.Four || mongoose.model("Four", FourGroupSchema);

export default Four;
