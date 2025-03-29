import type { CollectionEntry } from "astro:content";
import Og from "@/components/Og";
import { getCollectionPaths } from "@/lib/collectionHelpers";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import type { APIRoute } from "astro";
import React from "react";

export const GET: APIRoute = async ({ props }) => {
	try {
		const page = props?.data as CollectionEntry<"pages">;
		return new ImageResponse(
			React.createElement(Og, {
				subtitle: page?.data?.seo?.title,
			}),
			{
				width: 1200,
				height: 630,
			},
		);
	} catch (error) {
		console.error(error);
		return new Response("Failed to generate image", { status: 500 });
	}
};

export const getStaticPaths = getCollectionPaths("pages");
