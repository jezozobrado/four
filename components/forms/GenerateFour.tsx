"use client";

import { createFour } from "@/lib/actions/four.actions";
import { counterMap, defaultValuesFour, fourMap } from "@/lib/constants";
import { fourByFourSchema } from "@/lib/validations/four";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const GenerateFour = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof fourByFourSchema>>({
    resolver: zodResolver(fourByFourSchema),
    defaultValues: defaultValuesFour,
  });

  const handleSubmit = async (values: z.infer<typeof fourByFourSchema>) => {
    let fourByFour: { category?: string; list?: string[] }[] = [];

    // accepts object of words, filter by "aaa" etc
    fourMap.map((f) => {
      const oneCategory = Object.fromEntries(
        Object.entries(values).filter(([key, _]) => key.includes(f))
      );
      fourByFour.push({
        category: Object.values(oneCategory).pop()?.toLowerCase(),
        list: Object.values(oneCategory)
          ?.slice(0, -1)
          .sort()
          .map((word) => word.toLowerCase()),
      });
    });

    await createFour({ fourByFour });

    router.push("/");
  };

  const counter = counterMap.map((c, i) => ({
    name: c,
    placeholder: `${c.includes("category") ? `Category ${i / 5 + 1}` : ""}`,
  }));

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl m-0 p-0 w-full"
      >
        <div className="flex gap-2 white flex-wrap justify-evenly">
          {counter.map((f: any) => (
            <FormField
              control={form.control}
              name={f.name}
              key={f.name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={f.placeholder}
                      {...field}
                      className="w-32 h-12 text-center"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit" className="mt-5 ">
            Generate Custom Four
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default GenerateFour;
