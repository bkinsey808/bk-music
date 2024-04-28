"use client";

import { useParams, useSearchParams } from "next/navigation";
import React, {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useReducer,
} from "react";
import useDebouncedEffect from "use-debounced-effect";

import { fromAppStateGetUrl } from "./fromAppStateGetUrl";
import { getInitialAppState } from "./getInitialAppState";

// Create the context
export const AppStateContext = createContext(undefined);

// Create the provider component
export const AppStateProvider = <
	// eslint-disable-next-line @typescript-eslint/ban-types
	MyAppState extends {},
	MyAppAction extends {
		type: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		payload?: any;
	},
>({
	appSchemaOption,
	appStateKeys,
	appStateReducer,
	initialPath,
	children,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	appSchemaOption: { [key in keyof MyAppState]: any };
	appStateKeys: (keyof MyAppState)[];
	appStateReducer: (state: MyAppState, action: MyAppAction) => MyAppState;
	initialPath: string;
	children: ReactNode;
}) => {
	const searchParams = useSearchParams();
	const params = useParams();

	const initialAppState = getInitialAppState<MyAppState>({
		params,
		searchParams,
		appStateKeys,
		appSchemaOption,
	});

	const [appState, dispatch] = useReducer(appStateReducer, initialAppState);

	// update url based on state
	useDebouncedEffect(
		() => {
			const url = fromAppStateGetUrl({
				appState,
				initialPath,
			});

			history.pushState(null, "", url);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		1000,
		[appState],
	);

	type AppStateContextProps = {
		appState: MyAppState;
		dispatch: Dispatch<MyAppAction>;
	};

	const TypedAppStateContext = AppStateContext as React.Context<
		AppStateContextProps | undefined
	>;

	return (
		<TypedAppStateContext.Provider value={{ appState, dispatch }}>
			{children}
		</TypedAppStateContext.Provider>
	);
};

// Create the hook
export const useAppState = <AppStateContextProps,>(): AppStateContextProps => {
	const context = useContext(AppStateContext);

	if (context === undefined) {
		throw new Error("useAppState must be used within a AppStateProvider");
	}

	return context;
};
