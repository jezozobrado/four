import FourGame from "@/components/FourGame";
import { fetchFour } from "@/lib/actions/four.actions";

const page = async () => {
  const data = await fetchFour();

  if (!data) return;
  const answer = data[Math.floor(Math.random() * data.length)];

  const rawSolution = answer.fourByFour.map((a) => [...a.list, a.category]);

  return <FourGame rawSolution={rawSolution} />;
};

export default page;
