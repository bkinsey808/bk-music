export const toggleArrayItem = <AppState extends object>({
	state,
	key,
	id,
	sorter,
	open,
}: {
	state: AppState;
	key: keyof AppState;
	id: string;
	open?: boolean | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sorter?: (a: any, b: any) => number;
}) => {
	const previousArray = state[key] as readonly string[];

	if (Array.isArray(previousArray) === false) {
		throw new Error("Array expected");
	}

	const previousIdFound = previousArray?.includes(id);
	const newOpen = open ?? !previousIdFound;

	const newState = {
		...state,
		[key]: newOpen
			? [...previousArray, id].sort(sorter)
			: previousArray?.filter((previousArrayId) => previousArrayId !== id),
	};

	return newState as AppState;
};
