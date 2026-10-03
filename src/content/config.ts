import { defineCollection, z } from 'astro:content';

export const questionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  shortMethod: z.string(),
});

export type Question = z.infer<typeof questionSchema>;

export const paperSchema = z.object({
  title: z.string(),
  language: z.string(),
  durationMinutes: z.number().default(60),
  description: z.string().optional(),
  seoDescription: z.string().optional(),
  category: z.string().optional(),
  questions: z.array(questionSchema),
});

export type PaperData = z.infer<typeof paperSchema>;

const papersCollection = defineCollection({
  type: 'content',
  schema: paperSchema,
});

export const collections = {
  papers: papersCollection,
};
