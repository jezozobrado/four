import Four from "../models/four.model";
import { connectToDB } from "../mongoose";

export async function createFour({ group, user }: any) {
  try {
    connectToDB();

    const generatedFour = await Four.create({
      group,
      createdBy: user,
    });
  } catch (error) {}
}
