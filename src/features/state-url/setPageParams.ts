import { PagePropsGeneric } from "./types";

export const setPageParams = <PageProps extends PagePropsGeneric>(
	pageProps: PageProps,
	keyValues: Partial<PageProps["params"]>,
) => {
	const newParams = {
		...pageProps.params,
		...keyValues,
	};

	return newParams;
};
