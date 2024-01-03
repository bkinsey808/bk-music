// "use client";
// import { useRouter } from "next/navigation";

interface TuningProps {
	tuning: string;
}

export const Tuning = ({ tuning }: TuningProps) => {
	return (
		<section>
			<h2>Tuning</h2>
			<div
				className={`
					flex 
					flex-col
				`}
			>
				Tuning
			</div>
		</section>
	);
};
