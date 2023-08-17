"use client";
import GenerateFour from "@/components/forms/GenerateFour";
import { Button } from "@/components/ui/button";
import connectToDB from "@/lib/mongoose";

const page = async () => {
  // connectToDB();
  // return (
  //   <Button
  //     className="mt-28"

  //   >
  //     Click
  //   </Button>
  // );
  return <GenerateFour />;
};

export default page;
