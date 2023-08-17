import { fetchFour } from "@/lib/actions/four.actions";

const page = async () => {
  const data = await fetchFour();

  if (!data) return;
  const answer = data[Math.floor(Math.random() * data.length)];

  const answerArray = answer.fourByFour.map((a) => [...a.list, a.category]);
  console.log("answeR", answerArray);

  return <div className="mt-28">{answer.fourByFour[0].category}</div>;
};

export default page;
