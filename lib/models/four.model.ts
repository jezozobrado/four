import mongoose from "mongoose";
import User from "./user.model";

const FourSchema = new mongoose.Schema({
  category: { type: String, required: true },
  list: { type: [String], required: true },
});

const FourGroupSchema = new mongoose.Schema({
  group: { type: [FourSchema], required: true },
  createdBy: { type: User }, // make this required
});

const Four =
  mongoose.models.FourGroupSchema || mongoose.model("Four", FourGroupSchema);

export default Four;
