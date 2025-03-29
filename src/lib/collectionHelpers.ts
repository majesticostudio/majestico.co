import { type AnyEntryMap, getCollection } from "astro:content";

export function getCollectionPaths<T extends keyof AnyEntryMap>(
	collectionName: T,
) {
	return async () => {
		const entries = await getCollection(collectionName);

		return entries
			.filter((entry) => !entry.data.hidden)
			.flatMap((entry) => {
				// For special pages (index and home), create multiple paths
				if (entry.id === "index" || entry.id === "home") {
					return [
						{ params: { slug: undefined }, props: { data: entry } },
						{ params: { slug: "index" }, props: { data: entry } },
						{ params: { slug: "home" }, props: { data: entry } },
					];
				}

				// For regular pages, just use the entry ID
				return [{ params: { slug: entry.id }, props: { data: entry } }];
			});
	};
}

export function getCollectionPathsWithPrevNext<T extends keyof AnyEntryMap>(
	collectionName: T,
) {
	return async () => {
		const entries = await getCollection(collectionName);

		const visibleEntries = entries.filter((entry) => !entry.data.hidden);

		const sortedEntries = [...visibleEntries].sort(
			(a, b) => a.data.createdAt.getTime() - b.data.createdAt.getTime(),
		);

		return sortedEntries.flatMap((entry, index) => {
			// Make navigation circular
			const prevProject =
				index > 0
					? sortedEntries[index - 1]
					: sortedEntries[sortedEntries.length - 1];
			const nextProject =
				index < sortedEntries.length - 1
					? sortedEntries[index + 1]
					: sortedEntries[0];

			// Special cases for index and home
			if (entry.id === "index" || entry.id === "home") {
				return [
					{
						params: { slug: undefined },
						props: { data: entry, prevProject, nextProject },
					},
					{
						params: { slug: "index" },
						props: { data: entry, prevProject, nextProject },
					},
					{
						params: { slug: "home" },
						props: { data: entry, prevProject, nextProject },
					},
				];
			}

			// Regular pages
			return [
				{
					params: { slug: entry.id },
					props: { data: entry, prevProject, nextProject },
				},
			];
		});
	};
}
