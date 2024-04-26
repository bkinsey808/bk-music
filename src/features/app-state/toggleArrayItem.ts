export const toggleArrayItem = <AppState extends object>({
	state,
	key,
	id,
	sorter,
}: {
	state: AppState;
	key: keyof AppState;
	id: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sorter?: (a: any, b: any) => number;
}) => {
	const previousArray = state[key] as readonly string[];

	if (Array.isArray(previousArray) === false) {
		throw new Error("Array expected");
	}

	const previousIdFound = previousArray?.includes(id);

	const newState = {
		...state,
		[key]: previousIdFound
			? previousArray?.filter((previousArrayId) => previousArrayId !== id)
			: [...previousArray, id].sort(sorter),
	};

	return newState as AppState;
};
