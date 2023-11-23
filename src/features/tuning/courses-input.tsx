"use client";

import { useRouter } from "next/navigation";

interface CoursesInputProps {
	courses: number;
	tuning: string;
}

export const CoursesInput = ({ courses, tuning }: CoursesInputProps) => {
	const router = useRouter();
	return (
		<input
			id="courses"
			autoFocus={true}
			type="number"
			value={courses}
			max={12}
			onChange={(e) => {
				const newCourses = e.target.valueAsNumber;
				const tuningArray = tuning.split("-");

				// newTuningArray should be truncated if less than newCourses, otherwise fill with last value of current tuningArray
				const newTuningArray =
					newCourses < tuningArray.length
						? tuningArray.slice(0, newCourses)
						: [
								...tuningArray,
								...Array(newCourses - tuningArray.length).fill(
									tuningArray[tuningArray.length - 1],
								),
						  ];

				router.push(`/dashboard/${e.target.value}/${newTuningArray.join("-")}`);
			}}
		/>
	);
};
