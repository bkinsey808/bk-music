import { getKeys } from "../global/getKeys";

export const fromAppStateGetUrl = <
	AppStateType extends {
		[key: string]: string | readonly string[];
	},
>({
	appState,
	appStateKeys,
	appParamKeys,
	initialPath,
}: {
	appState: AppStateType;
	appStateKeys: (keyof AppStateType)[];
	appParamKeys: (keyof AppStateType)[];
	initialPath: string;
}): string => {
	const searchParamKeys = appStateKeys.filter(
		(key) => !appParamKeys.includes(key),
	);

	const flattenedObject = Object.fromEntries(
		getKeys(appState).map((key) => {
			const rawValue = appState[key];
			const value = Array.isArray(rawValue)
				? rawValue.join("-")
				: (rawValue as string);
			return [key, value];
		}),
	) as Record<keyof AppStateType, string>;

	const paramUrl = appParamKeys.reduce((acc: string, key) => {
		const value = flattenedObject[key] ?? appState[key];
		return `${acc}/${value === "" ? "-" : value}`;
	}, initialPath);

	const searchParamUrl = searchParamKeys
		.reduce((acc, key) => {
			const value = flattenedObject[key];

			if (value == undefined || value === "") {
				acc.delete(key as string);
			} else {
				acc.set(key as string, value);
			}

			return acc;
		}, new URLSearchParams())
		.toString();

	return `${paramUrl}${searchParamUrl ? `?${searchParamUrl}` : ""}`;
};
