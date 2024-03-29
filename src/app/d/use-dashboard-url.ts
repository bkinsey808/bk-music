import { useParams, useRouter, useSearchParams } from "next/navigation";

import { DashboardProps } from "./[tuning]/[keyScale]/[chord]/page";

type DashboardParams = DashboardProps["params"];
type DashboardSearchParams = DashboardProps["searchParams"];
type DashboardUrlOptions = {
	params?: DashboardParams;
	searchParams?: DashboardSearchParams;
};

export const useDashboardURL = () => {
	const router = useRouter();
	const currentParams: DashboardParams = useParams();
	const currentReadonlyURLSearchParams = useSearchParams();
	const currentSearchParams: DashboardSearchParams = Object.fromEntries(
		currentReadonlyURLSearchParams.entries(),
	);

	const setParams = (key: keyof typeof currentParams, value: string) => {
		const newParams = {
			...currentParams,
			[key]: value,
		};

		return newParams;
	};

	const setSearchParams = (key: keyof DashboardSearchParams, value: string) => {
		const newSearchParams = {
			...currentSearchParams,
			[key]: value,
		};

		if (value === undefined || value === "") {
			delete newSearchParams[key];
		}

		return newSearchParams;
	};

	const getURL = ({
		params = currentParams,
		searchParams = currentSearchParams,
	}: DashboardUrlOptions) => {
		const searchParamsString = new URLSearchParams(searchParams).toString();

		return `/d/${params.tuning}/${params.keyScale}/${params.chord}?${searchParamsString}`;
	};

	const setURL = (options: DashboardUrlOptions) => {
		router.push(getURL(options));
	};

	return { setParams, setSearchParams, getURL, setURL };
};
