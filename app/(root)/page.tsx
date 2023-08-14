import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
      <Button>
        <Link href="/four">Play four</Link>
      </Button>
      <Button>
        <Link href="/four/generate">Generate Four</Link>
      </Button>
    </div>
  );
};

export default page;
