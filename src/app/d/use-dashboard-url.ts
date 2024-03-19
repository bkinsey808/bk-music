import { useParams, useRouter } from "next/navigation";

export const useDashboardURL = () => {
	const router = useRouter();
	const params = useParams();

	const getURL = (key: string, value: string) => {
		const newParams = {
			...params,
			[key]: value,
		};

		return `/d/${newParams.tuning}/${newParams.keyScale}/${newParams.chord}`;
	};

	const setURL = (key: string, value: string) => {
		router.push(getURL(key, value));
	};

	return { getURL, setURL };
};
