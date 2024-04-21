export const toggleArrayItem = <AppState extends object>(
	state: AppState,
	key: keyof AppState,
	id: string,
) => {
	const previousArray = state[key] as readonly string[];

	if (Array.isArray(previousArray) === false) {
		throw new Error("Array expected");
	}

	const previousIdFound = previousArray?.includes(id);

	const newState = {
		...state,
		[key]: previousIdFound
			? previousArray?.filter((previousArrayId) => previousArrayId !== id)
			: [...previousArray, id].sort(),
	};

	return newState as AppState;
};
