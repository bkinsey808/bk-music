// "use client";

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
				className={`
					flex 
					flex-col
				`}
			>
				Key: {keyNote}
				<br />
				Scale: {scale}
			</div>
		</section>
	);
};
