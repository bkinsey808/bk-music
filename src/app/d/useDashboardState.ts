import { Schema as S } from "@effect/schema";
import { Dispatch, useContext } from "react";

import { fromAppStateGetUrl } from "@/features/app-state/fromAppStateGetUrl";
import { toggleArrayItem } from "@/features/app-state/toggleArrayItem";
import { AppStateContext } from "@/features/app-state/useAppState";
import { scaleDegrees } from "@/features/music/scaleDegrees";

export const dashboardInitialPath = "/d";
export const enum DashboardActionType {
	TOGGLE_ACCORDION = "toggleAccordion",
	TOGGLE_SCALE_DEGREE = "toggleScaleDegree",
	SET_KEY_VALUE = "setKeyValue",
}

export enum DashboardStateKey {
	SONG = "s",
	LYRICS = "l",
	OPEN_ACCORDION_IDS = "o",

	TUNING = "t",
	KEY_NOTE = "k",
	SCALE = "sc",
	CHORD = "c",
	POSITION = "p",
}

export const dashboardSchemaOption = {
	[DashboardStateKey.TUNING]: S.String,
	[DashboardStateKey.KEY_NOTE]: S.String,
	[DashboardStateKey.SCALE]: S.Array(S.String),
	[DashboardStateKey.CHORD]: S.Array(S.String),
	[DashboardStateKey.POSITION]: S.String,
	[DashboardStateKey.OPEN_ACCORDION_IDS]: S.Array(S.String),
	[DashboardStateKey.SONG]: S.String,
	[DashboardStateKey.LYRICS]: S.String,
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
			type: DashboardActionType.TOGGLE_SCALE_DEGREE;
			payload: { scaleDegree: string };
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
			return toggleArrayItem({
				state,
				key: DashboardStateKey.OPEN_ACCORDION_IDS,
				id: action.payload.id,
			});

		case DashboardActionType.TOGGLE_SCALE_DEGREE:
			return toggleArrayItem({
				state,
				key: DashboardStateKey.SCALE,
				id: action.payload.scaleDegree,
				sorter: (
					a: (typeof scaleDegrees)[number],
					b: (typeof scaleDegrees)[number],
				) => {
					const aScaleDegreeNumber = scaleDegrees.indexOf(a);
					const bScaleDegreeNumber = scaleDegrees.indexOf(b);
					return aScaleDegreeNumber - bScaleDegreeNumber;
				},
			});

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
	song: string;
	lyrics: string;
	keyNote: string;
	scale: readonly string[];
	chord: readonly string[];
	tuning: string;
	position: string;
	isAccordionOpen: (id: string) => boolean;
	toggleAccordion: (id: string) => void;
	isScaleDegreeInScale: (scaleDegree: string) => boolean;
	toggleScaleDegree: (scaleDegree: string) => void;
	setSong: (song: string) => void;
	setLyrics(lyrics: string): void;
	setChord: (chord: readonly string[]) => void;
	getChordUrl: (chord: readonly string[]) => string;
	setPosition: (position: string) => void;
	getPositionUrl: (position: string) => string;
	setKeyNote: (keyNote: string) => void;
	getKeyNoteUrl: (keyNote: string) => string;
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

	const isAccordionOpen = (id: string) =>
		context.appState[DashboardStateKey.OPEN_ACCORDION_IDS]?.includes(id);

	const toggleAccordion = (id: string) => {
		context.dispatch({
			type: DashboardActionType.TOGGLE_ACCORDION,
			payload: { id },
		});
	};

	const isScaleDegreeInScale = (scaleDegree: string) =>
		context.appState[DashboardStateKey.SCALE]?.includes(scaleDegree);

	const toggleScaleDegree = (scaleDegree: string) => {
		context.dispatch({
			type: DashboardActionType.TOGGLE_SCALE_DEGREE,
			payload: { scaleDegree },
		});
	};

	const setSong = (song: string) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key: DashboardStateKey.SONG, value: song },
		});
	};

	const setLyrics = (lyrics: string) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key: DashboardStateKey.LYRICS, value: lyrics },
		});
	};

	const setChord = (chord: readonly string[]) => {
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

	const getChordUrl = (chord: readonly string[]) => {
		const newState = {
			...context.appState,
			[DashboardStateKey.POSITION]: "",
			[DashboardStateKey.CHORD]: chord,
		};

		return fromDashboardStateGetUrl(newState);
	};

	const getKeyNoteUrl = (keyNote: string) => {
		const newState = {
			...context.appState,
			[DashboardStateKey.KEY_NOTE]: keyNote,
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

	const setKeyNote = (keyNote: string) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key: DashboardStateKey.KEY_NOTE, value: keyNote },
		});
	};

	return {
		...context,
		song: context.appState[DashboardStateKey.SONG],
		lyrics: context.appState[DashboardStateKey.LYRICS],
		keyNote: context.appState[DashboardStateKey.KEY_NOTE],
		scale: context.appState[DashboardStateKey.SCALE],
		chord: context.appState[DashboardStateKey.CHORD],
		tuning: context.appState[DashboardStateKey.TUNING],
		position: context.appState[DashboardStateKey.POSITION],
		isAccordionOpen,
		toggleAccordion,
		setSong,
		setLyrics,
		setChord,
		getChordUrl,
		setPosition,
		getPositionUrl,
		setKeyNote,
		getKeyNoteUrl,
		isScaleDegreeInScale,
		toggleScaleDegree,
	};
};
