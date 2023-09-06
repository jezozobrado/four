import mongoose from "mongoose";

export interface IFour {
  category: string;
  list: string[];
}

export interface IFourGroup {
  fourByFour: IFour[];
}

const FourSchema = new mongoose.Schema<IFour>({
  category: { type: String, required: true },
  list: { type: [String], required: true },
});

const FourGroupSchema = new mongoose.Schema<IFourGroup>({
  fourByFour: { type: [FourSchema], required: true },
});

const Four = mongoose.models.Four || mongoose.model("Four", FourGroupSchema);

export default Four;
