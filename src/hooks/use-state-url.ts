import { useParams, useRouter, useSearchParams } from "next/navigation";

/** @see https://www.totaltypescript.com/any-considered-harmful */
type GetGenericStateUrl = (pageProps: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchParams: any;
}) => string;

export const useStateUrl = <GetStateUrl extends GetGenericStateUrl>(
	getStateUrl: GetStateUrl,
) => {
	type PageProps = Parameters<GetStateUrl>[0];
	type PageParams = PageProps["params"];
	type PageSearchParams = PageProps["searchParams"];

	const router = useRouter();
	const currentParams: PageParams = useParams();
	const currentReadonlyURLSearchParams = useSearchParams();
	const currentSearchParams: PageSearchParams = Object.fromEntries(
		currentReadonlyURLSearchParams.entries(),
	);

	const setParams = (key: keyof PageParams, value: string) => {
		const newParams = {
			...currentParams,
			[key]: value,
		};

		return newParams;
	};

	const setSearchParams = (key: keyof PageSearchParams, value: string) => {
		const newSearchParams = {
			...currentSearchParams,
			[key]: value,
		};

		if (value === undefined || value === "") {
			delete newSearchParams[key];
		}

		return newSearchParams;
	};

	const setUrl = (pageProps: PageProps) => {
		router.push(getStateUrl(pageProps));
	};

	return { setParams, setSearchParams, setUrl };
};
