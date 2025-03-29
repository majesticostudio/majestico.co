import Logo from "@/assets/style/logo.svg?react";
import settings from "@/data/singletons/settings.json";
import React from "react";

interface OgProps {
	title?: string;
	subtitle?: string;
}

const Og = ({
	title = settings.organization,
	subtitle = settings.defaultSeo.title,
}: OgProps) => {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				gap: "20px",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				padding: "50px",
				backgroundColor: settings.style.primaryColor,
				color: "white",
			}}
		>
			<Logo width={60} height={60} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "10px",
				}}
			>
				<h1 style={{ fontSize: "64px", margin: 0 }}>{title}</h1>
				<p style={{ fontSize: "32px", margin: 0 }}>{subtitle}</p>
			</div>
		</div>
	);
};

export default Og;
