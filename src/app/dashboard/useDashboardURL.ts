import { useParams, useRouter } from "next/navigation";

export const useDashboardURL = () => {
	const router = useRouter();
	const params = useParams();

	const setURL = (key: string, value: string) => {
		const newParams = {
			...params,
			[key]: value,
		};

		const newPathname = `/dashboard/${newParams.tuning}/${newParams.keyScale}/${newParams.chord}`;

		router.push(newPathname);
	};

	return setURL;
};
