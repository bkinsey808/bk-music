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
	CREDITS = "cr",
	LYRICS = "l",
	TRANSLATION = "tr",
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
	[DashboardStateKey.CREDITS]: S.String,
	[DashboardStateKey.LYRICS]: S.String,
	[DashboardStateKey.TRANSLATION]: S.String,
};

const DashboardStateSchema = S.Struct(dashboardSchemaOption);

export type DashboardState = S.Schema.Type<typeof DashboardStateSchema>;
export type Scale = DashboardState[DashboardStateKey.SCALE];
export type Chord = DashboardState[DashboardStateKey.CHORD];

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
	isAccordionOpen: (id: string) => boolean;
	toggleAccordion: (id: string) => void;
	isScaleDegreeInScale: (scaleDegree: string) => boolean;
	toggleScaleDegree: (scaleDegree: string) => void;
	getValue: <K extends keyof DashboardState>(key: K) => DashboardState[K];
	getValues: <K extends DashboardStateKey[]>(
		keys: [...K],
	) => { [I in keyof K]: DashboardState[K[I]] };
	setValue: <K extends keyof DashboardState>(
		key: K,
		value: DashboardState[K],
	) => void;
	getUrl: <K extends keyof DashboardState>(
		key: K,
		value: DashboardState[K],
	) => string;
	getAppUrl: () => string;
};

const fromDashboardStateGetUrl = (state: DashboardState) =>
	fromAppStateGetUrl({
		appState: state,
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

	const getValue = <K extends keyof DashboardState>(
		key: K,
	): DashboardState[K] => {
		return context.appState[key];
	};

	const getValues = <K extends DashboardStateKey[]>(
		keys: [...K],
	): { [I in keyof K]: DashboardState[K[I]] } =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		keys.map((key) => context.appState[key]) as any;

	const setValue = (key: DashboardStateKey, value: unknown) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key, value },
		});
	};

	const getUrl = <K extends keyof DashboardState>(
		key: K,
		value: DashboardState[K],
	) => {
		const newState = {
			...context.appState,
			[key]: value,
		};

		return fromDashboardStateGetUrl(newState);
	};

	const getAppUrl = () => fromDashboardStateGetUrl(context.appState);

	return {
		...context,
		isAccordionOpen,
		toggleAccordion,
		isScaleDegreeInScale,
		toggleScaleDegree,
		getValue,
		getValues,
		setValue,
		getUrl,
		getAppUrl,
	};
};
