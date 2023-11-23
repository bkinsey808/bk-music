// "use client";
import { css } from "@kuma-ui/core";

// import { useRouter } from "next/navigation";

interface ScaleProps {
	key: string;
	scale: string;
}

export const Scale = ({ key, scale }: ScaleProps) => {
	return (
		<section>
			<h2>Scale</h2>
			<div
				className={css`
					display: flex;
					flex-direction: column;
				`}
			>
				Key: {key}
				<br />
				Scale: {scale}
			</div>
		</section>
	);
};
