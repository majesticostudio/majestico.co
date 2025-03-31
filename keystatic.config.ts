// keystatic.config.ts
import { collection, config, fields } from "@keystatic/core";
import {
	type ContentComponent,
	block,
	wrapper,
} from "@keystatic/core/content-components";
import React from "react";
import Logo from "./src/assets/style/logo.svg?react";

export const components: Record<string, ContentComponent> = {
	Projects: block({
		label: "Home Slider",
		schema: {
			projects: fields.array(
				fields.object({
					title: fields.text({
						label: "Project Title",
						validation: { isRequired: true },
					}),
					image: fields.image({
						label: "Project Image",
						description: "Upload an image for this project",
						directory: "public/images/projects",
						publicPath: "/images/projects/",
						validation: { isRequired: true },
					}),
					isAlternate: fields.checkbox({
						label: "Alternate Layout",
						description: "Check this to alternate the layout of this project",
						defaultValue: false,
					}),
				}),
				{
					label: "Projects",
					itemLabel: (props) => props.fields?.title?.value || "Project",
				},
			),
		},
	}),
};

export default config({
	storage: {
		kind: import.meta.env.PROD ? "cloud" : "local",
	},
	cloud: {
		project: "art-act/art-act",
	},
	ui: {
		brand: {
			name: "Art-Act",
			mark(props) {
				return React.createElement(Logo, {
					width: 24,
					height: 24,
					color: props.colorScheme === "dark" ? "#ffffff" : "#000000",
				});
			},
		},
	},
	collections: {
		pages: collection({
			label: "Pages",
			slugField: "title",
			path: "src/data/collections/pages/*",
			previewUrl: "/{slug}",
			columns: ["title", "createdAt", "lastUpdatedAt"],
			format: { contentField: "content" },
			schema: {
				title: fields.slug({
					name: {
						label: "Title",
						validation: {
							isRequired: true,
						},
					},
				}),
				createdAt: fields.date({
					label: "Created At",
					defaultValue: {
						kind: "today",
					},
				}),
				lastUpdatedAt: fields.date({
					label: "Last Update Date",
					defaultValue: {
						kind: "today",
					},
				}),
				hideHeader: fields.checkbox({
					label: "Hide Header",
					description: "Hide the header from this page",
					defaultValue: false,
				}),
				hideFooter: fields.checkbox({
					label: "Hide Footer",
					description: "Hide the footer from this page",
					defaultValue: false,
				}),
				hidden: fields.checkbox({
					label: "Hidden",
					description: "Hide this page from navigation and search",
					defaultValue: false,
				}),
				seo: fields.object(
					{
						title: fields.text({
							label: "SEO Title",
							description:
								"Around 65 characters, it should include the primary keyword",
							validation: {
								isRequired: true,
							},
						}),
						description: fields.text({
							label: "SEO Description",
							description:
								"Around 155 characters, it should include the primary keyword",
							multiline: true,
							validation: {
								isRequired: true,
							},
						}),
						author: fields.text({
							label: "Author",
							description: "The author of the page or the Company name",
						}),
						ogImage: fields.image({
							label: "OG Image",
							description:
								"This is the preview that appear when sharing the page in social media",
							directory: "public/og",
							publicPath: "/og/",
						}),
					},
					{
						label: "SEO Settings",
						description: "Optimize the page for search engines",
					},
				),
				content: fields.markdoc({
					label: "Content",
					components: components,
				}),
			},
		}),
	},
	singletons: {
		settings: {
			label: "Settings",
			path: "src/data/singletons/settings",
			format: { data: "json" },
			schema: {
				organization: fields.text({
					label: "Organization Name",
					validation: { isRequired: true },
				}),
				domain: fields.url({
					label: "Website Domain",
					description:
						"The domain of the website, should be in this format: https://example.com",
					validation: { isRequired: true },
				}),
				adminEmail: fields.text({
					label: "Admin Email",
					description:
						"This is the email where the admin will receive notifications",
					validation: { isRequired: true },
				}),
				defaultSeo: fields.object(
					{
						title: fields.text({
							label: "Default SEO Title",
							description:
								"Around 65 characters, it should include the primary keyword",
							validation: { isRequired: true },
						}),
						description: fields.text({
							label: "Default SEO Description",
							description:
								"Around 155 characters, it should include the primary keyword",
							multiline: true,
							validation: { isRequired: true },
						}),
						author: fields.text({
							label: "Default SEO Author",
							description: "The main author of the pages or the Company name",
							validation: { isRequired: true },
						}),
						ogImage: fields.image({
							label: "OG Image",
							description: "Upload an image to use as the OG image",
							directory: "public/og",
							publicPath: "/og/",
						}),
					},
					{
						label: "Default SEO Settings",
						description:
							"These settings will be used for all the pages that don't have their own SEO settings",
					},
				),
				tracking: fields.object(
					{
						umami: fields.text({
							label: "Umami Tracking ID",
							description:
								"Access at https://umami.majestico.co/share/xDsk7hrzH03Az5l0/art-act.it",
						}),
					},
					{
						label: "Tracking Settings",
					},
				),
				style: fields.object(
					{
						logo: fields.image({
							label: "Logo",
							description:
								"Upload an svg to use as the logo, must be an svg without style tag inside",
							directory: "src/assets",
							publicPath: "/src/assets/",
						}),
						primaryColor: fields.text({
							label: "Primary Color",
							description: "Hex color code for primary brand color",
							validation: { isRequired: true },
						}),
						secondaryColor: fields.text({
							label: "Secondary Color",
							description: "Hex color code for secondary brand color",
							validation: { isRequired: true },
						}),
					},
					{
						label: "Style Settings",
					},
				),
			},
		},
		header: {
			label: "Header",
			path: "src/data/singletons/header",
			format: { data: "json" },
			schema: {
				logo: fields.image({
					label: "Logo Image",
					description: "The main logo in the left side of the header",
					directory: "src/assets/header",
					publicPath: "/src/assets/header/",
				}),
				menuItems: fields.array(
					fields.object({
						label: fields.text({
							label: "Menu Item Label",
							validation: { isRequired: true },
						}),
						href: fields.url({
							label: "Menu Item URL",
							validation: { isRequired: true },
						}),
					}),
					{
						label: "Menu Items",
						itemLabel: (props) => props.fields?.label?.value || "Menu Item",
					},
				),
				contacts: fields.array(
					fields.object({
						label: fields.text({
							label: "Contact Label",
							validation: { isRequired: true },
						}),
						href: fields.url({
							label: "Contact URL",
							validation: { isRequired: true },
						}),
					}),
					{
						label: "Contacts",
						itemLabel: (props) => props.fields?.label?.value || "Contact",
					},
				),
				socials: fields.array(
					fields.object({
						label: fields.text({
							label: "Social Label",
							validation: { isRequired: true },
						}),
						href: fields.url({
							label: "Social URL",
							validation: { isRequired: true },
						}),
					}),
					{
						label: "Socials",
						itemLabel: (props) => props.fields?.label?.value || "Social",
					},
				),
			},
		},
		footer: {
			label: "Footer",
			path: "src/data/singletons/footer",
			format: { data: "json" },
			schema: {
				email: fields.text({
					label: "Email Address",
					validation: { isRequired: true },
				}),
				address: fields.object(
					{
						link: fields.url({
							label: "Address Link",
							description: "Optional link for the address (e.g., Google Maps)",
						}),
						text: fields.text({
							label: "Address Text",
							description: "The physical address text",
							validation: { isRequired: true },
						}),
					},
					{
						label: "Physical Address",
						description: "The physical address with optional link",
					},
				),
				legalInfo: fields.text({
					label: "Legal Information",
					description: "P.IVA, tax ID, or other legal information",
					validation: { isRequired: true },
				}),
				socialLinks: fields.array(
					fields.object({
						platform: fields.select({
							label: "Platform",
							options: [
								{ label: "Facebook", value: "facebook" },
								{ label: "Instagram", value: "instagram" },
								{ label: "Twitter", value: "twitter" },
								{ label: "LinkedIn", value: "linkedin" },
								{ label: "YouTube", value: "youtube" },
							],
							defaultValue: "instagram",
						}),
						url: fields.url({
							label: "URL",
							validation: { isRequired: true },
						}),
						icon: fields.image({
							label: "Social Media Icon",
							description: "Upload an icon for this social media platform",
							directory: "src/assets/icons",
							publicPath: "/src/assets/icons/",
						}),
					}),
					{
						label: "Social Media Links",
						itemLabel: (props) =>
							props.fields?.platform?.value || "Social Link",
					},
				),
			},
		},
	},
});
