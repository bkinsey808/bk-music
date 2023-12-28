// "use client";
import { css } from "@kuma-ui/core";

// import { useRouter } from "next/navigation";

interface ScaleProps {
	keyNote: string;
	scale: string;
}

export const Scale = ({ keyNote, scale }: ScaleProps) => {
	return (
		<section>
			<h2>Scale</h2>
			<div
				className={css`
					display: flex;
					flex-direction: column;
				`}
			>
				Key: {keyNote}
				<br />
				Scale: {scale}
			</div>
		</section>
	);
};
