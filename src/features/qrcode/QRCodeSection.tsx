"use client";

import QRCode from "react-qr-code";

import { getFullUrl } from "./getFullUrl";

export const QRCodeSection = () => {
	return (
		<div className="bg-white p-[2rem]">
			<QRCode
				size={256}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				value={getFullUrl() ?? ""}
			/>
		</div>
	);
};
