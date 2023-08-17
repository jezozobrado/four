import * as z from "zod";

export const fourSchema = z.object({
  four: z.array(z.string()),
  category: z.string(),
});

export const fourByFourSchema = z.object({
  aaa1: z.string().nonempty({ message: "This is required." }),
  aaa2: z.string().nonempty({ message: "This is required." }),
  aaa3: z.string().nonempty({ message: "This is required." }),
  aaa4: z.string().nonempty({ message: "This is required." }),
  bbb1: z.string().nonempty({ message: "This is required." }),
  bbb2: z.string().nonempty({ message: "This is required." }),
  bbb3: z.string().nonempty({ message: "This is required." }),
  bbb4: z.string().nonempty({ message: "This is required." }),
  ccc1: z.string().nonempty({ message: "This is required." }),
  ccc2: z.string().nonempty({ message: "This is required." }),
  ccc3: z.string().nonempty({ message: "This is required." }),
  ccc4: z.string().nonempty({ message: "This is required." }),
  ddd1: z.string().nonempty({ message: "This is required." }),
  ddd2: z.string().nonempty({ message: "This is required." }),
  ddd3: z.string().nonempty({ message: "This is required." }),
  ddd4: z.string().nonempty({ message: "This is required." }),
  "aaa-category": z.string().nonempty({ message: "This is required." }),
  "bbb-category": z.string().nonempty({ message: "This is required." }),
  "ccc-category": z.string().nonempty({ message: "This is required." }),
  "ddd-category": z.string().nonempty({ message: "This is required." }),
});
