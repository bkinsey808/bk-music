import { Schema as S } from "@effect/schema";
import { Dispatch, useContext } from "react";

import { fromAppStateGetUrl } from "@/features/app-state/fromAppStateGetUrl";
import { toggleArrayItem } from "@/features/app-state/toggleArrayItem";
import { AppStateContext } from "@/features/app-state/useAppState";

export const dashboardInitialPath = "/d";
export const enum DashboardActionType {
	TOGGLE_ACCORDION = "toggleAccordion",
	SET_KEY_VALUE = "setKeyValue",
}

export enum DashboardStateKey {
	SONG = "s",
	OPEN_ACCORDION_IDS = "o",

	TUNING = "t",
	KEY_SCALE = "ks",
	CHORD = "c",
	POSITION = "p",
}

export const dashboardSchemaOption = {
	[DashboardStateKey.TUNING]: S.String,
	[DashboardStateKey.KEY_SCALE]: S.String,
	[DashboardStateKey.CHORD]: S.String,
	[DashboardStateKey.POSITION]: S.String,
	[DashboardStateKey.OPEN_ACCORDION_IDS]: S.Array(S.String),
	[DashboardStateKey.SONG]: S.String,
};

const DashboardStateSchema = S.Struct(dashboardSchemaOption);

export type DashboardState = S.Schema.Type<typeof DashboardStateSchema>;

export type DashboardAction =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| {
			type: DashboardActionType.TOGGLE_ACCORDION;
			payload: { id: string };
	  }
	| {
			type: DashboardActionType.SET_KEY_VALUE;
			payload: { key: DashboardStateKey; value: unknown };
	  };

export const dashboardStateKeys: DashboardStateKey[] =
	Object.values(DashboardStateKey);
export const dashboardParamKeys: DashboardStateKey[] = [
	// DashboardStateKey.TUNING,
	// DashboardStateKey.KEY_SCALE,
	// DashboardStateKey.CHORD,
	// DashboardStateKey.POSITION,
];

export const dashboardStateReducer = (
	state: DashboardState,
	action: DashboardAction,
): DashboardState => {
	switch (action.type) {
		case DashboardActionType.TOGGLE_ACCORDION:
			return toggleArrayItem(
				state,
				DashboardStateKey.OPEN_ACCORDION_IDS,
				action.payload.id,
			);

		case DashboardActionType.SET_KEY_VALUE:
			return {
				...state,
				[action.payload.key]: action.payload.value,
			};

		default:
			return state;
	}
};

export type DashboardStateContextProps = {
	appState: DashboardState;
	dispatch: Dispatch<DashboardAction>;
	isAccordionOpen: (id: string) => boolean;
	toggleAccordion: (id: string) => void;
	song: string;
	setSong: (song: string) => void;
	keyScale: string;
	chord: string;
	setChord: (chord: string) => void;
	getChordUrl: (chord: string) => string;
	tuning: string;
	position: string;
	setPosition: (position: string) => void;
	getPositionUrl: (position: string) => string;
};

const fromDashboardStateGetUrl = (state: DashboardState) =>
	fromAppStateGetUrl({
		appState: state,
		appStateKeys: dashboardStateKeys,
		appParamKeys: dashboardParamKeys,
		initialPath: dashboardInitialPath,
	});

export const useDashboardState = (): DashboardStateContextProps => {
	const context = useContext(AppStateContext) as
		| { appState: DashboardState; dispatch: Dispatch<DashboardAction> }
		| undefined;

	if (context === undefined) {
		throw new Error(
			"useDashboardState must be used within an AppStateProvider",
		);
	}

	const song = context.appState[DashboardStateKey.SONG];
	const keyScale = context.appState[DashboardStateKey.KEY_SCALE];
	const chord = context.appState[DashboardStateKey.CHORD];
	const tuning = context.appState[DashboardStateKey.TUNING];
	const position = context.appState[DashboardStateKey.POSITION];

	const isAccordionOpen = (id: string) =>
		context.appState[DashboardStateKey.OPEN_ACCORDION_IDS]?.includes(id);

	const toggleAccordion = (id: string) => {
		context.dispatch({
			type: DashboardActionType.TOGGLE_ACCORDION,
			payload: { id },
		});
	};

	const setSong = (song: string) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key: DashboardStateKey.SONG, value: song },
		});
	};

	const setChord = (chord: string) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key: DashboardStateKey.CHORD, value: chord },
		});

		if (context.appState[DashboardStateKey.POSITION]) {
			context.dispatch({
				type: DashboardActionType.SET_KEY_VALUE,
				payload: { key: DashboardStateKey.POSITION, value: "" },
			});
		}
	};

	const getChordUrl = (chord: string) => {
		const newState = {
			...context.appState,
			[DashboardStateKey.POSITION]: "",
			[DashboardStateKey.CHORD]: chord,
		};

		return fromDashboardStateGetUrl(newState);
	};

	const setPosition = (position: string) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key: DashboardStateKey.POSITION, value: position },
		});
	};

	const getPositionUrl = (position: string) => {
		const newState = {
			...context.appState,
			[DashboardStateKey.POSITION]: position,
		};

		return fromDashboardStateGetUrl(newState);
	};

	return {
		...context,
		isAccordionOpen,
		toggleAccordion,
		song,
		setSong,
		keyScale,
		chord,
		setChord,
		getChordUrl,
		tuning,
		position,
		setPosition,
		getPositionUrl,
	};
};
