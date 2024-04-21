import { useParams, useSearchParams } from "next/navigation";

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

const extractString = <AppState>({
	key,
	params,
	searchParams,
}: {
	key: keyof AppState;
	params: ReturnType<typeof useParams>;
	searchParams: ReturnType<typeof useSearchParams>;
}) => (params[key] ?? searchParams.get(key as string) ?? "") as string;

const getArrayOfStrings = (rawValue: string) =>
	rawValue ? rawValue.split("-") : [];

export const getInitialAppState = <AppState>({
	params,
	searchParams,
	appStateKeys: appStateKeyArray,
	appSchemaOption,
}: {
	params: ReturnType<typeof useParams>;
	searchParams: ReturnType<typeof useSearchParams>;
	appStateKeys: (keyof AppState)[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	appSchemaOption: Record<keyof AppState, any>;
}) => {
	// iterate thru appStateKeys and get the values from the params and searchParams
	const appState = appStateKeyArray.reduce((acc, key) => {
		const schemaOptionType = appSchemaOption[key];
		const rawValue = extractString({
			key,
			params,
			searchParams,
		});
		const value =
			schemaOptionType.ast._tag === "TupleType"
				? getArrayOfStrings(rawValue)
				: rawValue;

		return { ...acc, [key]: value };
	}, {} as DeepWriteable<AppState>);

	return appState as AppState;
};
