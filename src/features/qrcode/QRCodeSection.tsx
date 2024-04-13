"use client";

import QRCode from "react-qr-code";

import { DashboardProps } from "@/app/d/dashboardUrl";

export const QRCodeSection = ({
	dashboardProps: _dashboardProps,
}: {
	dashboardProps: DashboardProps;
}) => {
	return (
		<div className="bg-white p-[2rem]">
			<QRCode
				size={256}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				/** @see https://github.com/vercel/next.js/discussions/42319#discussioncomment-4033667 */
				value={window?.location.href.replace(
					"localhost:3000",
					"bk-music.vercel.app",
				)}
			/>
		</div>
	);
};
