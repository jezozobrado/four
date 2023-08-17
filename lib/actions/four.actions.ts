"use server";
import Four, { IFourGroup } from "../models/four.model";
import connectToDB from "../mongoose";

export async function createFour({ fourByFour }: any) {
  connectToDB();
  try {
    await Four.create({
      fourByFour,
    });
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchFour() {
  connectToDB();
  try {
    const answer = (await Four.find()) as unknown as IFourGroup[];

    return answer;
  } catch (error: any) {
    console.log(error);
  }
}
