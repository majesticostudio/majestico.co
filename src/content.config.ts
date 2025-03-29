import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pagesCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdoc", base: "./src/data/collections/pages" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			createdAt: z.date(),
			lastUpdatedAt: z.optional(z.date()),
			hideHeader: z.optional(z.boolean()),
			hideFooter: z.optional(z.boolean()),
			hidden: z.optional(z.boolean()),
			seo: z.object({
				title: z.string(),
				description: z.string(),
				author: z.string(),
				ogImage: z.optional(z.string()),
			}),
		}),
});

const projectsCollection = defineCollection({
	loader: glob({
		pattern: "**/*.mdoc",
		base: "./src/data/collections/projects",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			createdAt: z.date(),
			lastUpdatedAt: z.optional(z.date()),
			hidden: z.optional(z.boolean()),
		}),
});

export const collections = {
	pages: pagesCollection,
	projects: projectsCollection,
};
