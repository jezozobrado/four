"use server";
import Four from "../models/four.model";
import connectToDB from "../mongoose";

export async function createFour({ fourByFour }: any) {
  connectToDB();
  try {
    const x = await Four.create({
      fourByFour,
    });
  } catch (error) {
    console.log(error);
  }
}
