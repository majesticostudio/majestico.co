import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import yaml from "@rollup/plugin-yaml";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import svgr from "vite-plugin-svgr";
import settings from "./src/data/singletons/settings.json";

// https://astro.build/config
export default defineConfig({
	site: settings.domain,
	adapter: cloudflare({
		imageService: "compile",
	}),
	compressHTML: true,
	redirects: {
		"/admin": "/keystatic",
	},
	vite: {
		plugins: [tailwindcss(), yaml(), svgr()],
		resolve: {
			// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
			alias: import.meta.env.PROD
				? {
						"react-dom/server": "react-dom/server.edge",
					}
				: {},
		},
		build: {
			chunkSizeWarningLimit: 3000,
		},
	},
	integrations: [
		react(),
		markdoc(),
		keystatic(),
		sitemap(),
		robotsTxt(),
		icon(),
	],
});
