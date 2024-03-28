import { useParams, useRouter, useSearchParams } from "next/navigation";

export const useDashboardURL = () => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	const searchParamsString = new URLSearchParams(searchParams).toString();

	const getURL = (key: string, value: string) => {
		const newParams = {
			...params,
			[key]: value,
		};

		return `/d/${newParams.tuning}/${newParams.keyScale}/${newParams.chord}?${searchParamsString}`;
	};

	const setURL = (key: string, value: string) => {
		router.push(getURL(key, value));
	};

	return { getURL, setURL };
};
