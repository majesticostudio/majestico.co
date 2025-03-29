// markdoc.config.ts
import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
	nodes: {
		document: {
			...nodes.document,
			render: undefined,
		},
	},
	tags: {
		HeroVideo: {
			attributes: {
				imageUrl: { type: String },
				startDate: { type: String },
				endDate: { type: String },
				desktopVideoUrl: { type: String },
				mobileVideoUrl: { type: String },
			},
			render: component("./src/components/HeroVideo.astro"),
		},
		Banner: {
			attributes: {
				subtitle: { type: String },
				dateRange: { type: String },
				hours: { type: Object },
				location: { type: Object },
				imageUrl: { type: String },
			},
			render: component("./src/components/Banner.astro"),
		},
		Magazine: {
			attributes: {
				artists: { type: Object },
				magazineButtons: { type: Array },
			},
			render: component("./src/components/Magazine.astro"),
		},
		TitleImage: {
			attributes: {
				title: { type: String },
				subtitle: { type: String },
				description: { type: String },
				imageUrl: { type: String },
			},
			render: component("./src/components/TitleImage.astro"),
		},
		LineSeparator: {
			render: component("./src/components/LineSeparator.astro"),
		},
	},
});
