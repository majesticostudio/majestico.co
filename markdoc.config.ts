// markdoc.config.ts
import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

interface Project {
	title: string;
	image: string;
	isAlternate: boolean;
}

export default defineMarkdocConfig({
	nodes: {
		document: {
			...nodes.document,
			render: undefined,
		},
	},
	tags: {
		HomeSlider: {
			attributes: {
				projects: { type: Array },
			},
			render: component("./src/components/HomeSlider.astro"),
		},
	},
});
