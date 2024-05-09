import { Schema as S } from "@effect/schema";
import { Dispatch, useContext } from "react";

import { fromAppStateGetUrl } from "@/features/app-state/fromAppStateGetUrl";
import { toggleArrayItem } from "@/features/app-state/toggleArrayItem";
import { AppStateContext } from "@/features/app-state/useAppState";
import { degrees } from "@/features/music/degrees";
import { Section } from "@/features/sections/sections";

export const dashboardInitialPath = "/d";
export const enum DashboardActionType {
	TOGGLE_ACCORDION = "toggleAccordion",
	TOGGLE_SCALE_DEGREE = "toggleScaleDegree",
	TOGGLE_POSITION_ELEMENT = "togglePositionElement",
	TOGGLE_CHORD_DEGREE = "toggleChordDegree",
	SET_KEY_VALUE = "setKeyValue",
}

export enum DashboardStateKey {
	SONG = "s",
	CREDITS = "cr",
	LYRICS = "l",
	TRANSLATION = "tr",
	OPEN_ACCORDION_IDS = "o",
	INSTRUMENT = "i",
	INSTRUMENT_TUNING = "it",

	TUNING = "t",
	KEY_NOTE = "k",
	SCALE = "sc",
	CHORD = "c",
	CHORD_SCALE_DEGREE = "csd",
	POSITION = "p",
	MAX_FRETS = "mf",
	SELECT_CELL_TO_SET = "scts",
}

export enum SelectCellToSet {
	SCALE = "scale",
	POSITION = "position",
	TONE = "tone",
}

export const dashboardSchemaOption = {
	[DashboardStateKey.INSTRUMENT_TUNING]: S.String,
	[DashboardStateKey.TUNING]: S.Array(S.String),
	[DashboardStateKey.KEY_NOTE]: S.String,
	[DashboardStateKey.SCALE]: S.Array(S.String),
	[DashboardStateKey.CHORD]: S.Array(S.String),
	[DashboardStateKey.CHORD_SCALE_DEGREE]: S.Literal(...Object.values(degrees)),
	[DashboardStateKey.POSITION]: S.Array(S.Union(S.Literal("x"), S.Int)),
	[DashboardStateKey.OPEN_ACCORDION_IDS]: S.Array(S.String),
	[DashboardStateKey.SONG]: S.String,
	[DashboardStateKey.INSTRUMENT]: S.String,
	[DashboardStateKey.CREDITS]: S.String,
	[DashboardStateKey.LYRICS]: S.String,
	[DashboardStateKey.TRANSLATION]: S.String,
	[DashboardStateKey.MAX_FRETS]: S.Number,
	[DashboardStateKey.SELECT_CELL_TO_SET]: S.Literal(
		...Object.values(SelectCellToSet),
	),
};

export type Position = S.Schema.Type<
	(typeof dashboardSchemaOption)[DashboardStateKey.POSITION]
>;
export type Tuning = S.Schema.Type<
	(typeof dashboardSchemaOption)[DashboardStateKey.TUNING]
>;

export type Degree = S.Schema.Type<
	(typeof dashboardSchemaOption)[DashboardStateKey.CHORD_SCALE_DEGREE]
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const guard = (key: DashboardStateKey, value: any) => {
	const schema = dashboardSchemaOption[key];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return S.is(schema as any)(value)
		? (value as S.Schema.Type<typeof schema>)
		: undefined;
};

const DashboardStateSchema = S.Struct(dashboardSchemaOption);

export type DashboardState = S.Schema.Type<typeof DashboardStateSchema>;
export type Scale = DashboardState[DashboardStateKey.SCALE];
export type Chord = DashboardState[DashboardStateKey.CHORD];

export type DashboardAction =
	| {
			type: DashboardActionType.TOGGLE_ACCORDION;
			payload: { section: Section; open?: boolean | undefined };
	  }
	| {
			type: DashboardActionType.TOGGLE_SCALE_DEGREE;
			payload: { degree: string };
	  }
	| {
			type: DashboardActionType.TOGGLE_POSITION_ELEMENT;
			payload: { fret: number; course: number };
	  }
	| {
			type: DashboardActionType.TOGGLE_CHORD_DEGREE;
			payload: { degree: string };
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
				id: action.payload.section,
				open: action.payload.open,
			});

		case DashboardActionType.TOGGLE_SCALE_DEGREE:
			return toggleArrayItem({
				state,
				key: DashboardStateKey.SCALE,
				id: action.payload.degree,
				sorter: (a: (typeof degrees)[number], b: (typeof degrees)[number]) => {
					const aDegreeNumber = degrees.indexOf(a);
					const bDegreeNumber = degrees.indexOf(b);
					return aDegreeNumber - bDegreeNumber;
				},
			});

		case DashboardActionType.TOGGLE_CHORD_DEGREE:
			return toggleArrayItem({
				state,
				key: DashboardStateKey.CHORD,
				id: action.payload.degree,
				sorter: (a: (typeof degrees)[number], b: (typeof degrees)[number]) => {
					const aDegreeNumber = degrees.indexOf(a);
					const bDegreeNumber = degrees.indexOf(b);
					return aDegreeNumber - bDegreeNumber;
				},
			});

		case DashboardActionType.TOGGLE_POSITION_ELEMENT:
			return {
				...state,
				[DashboardStateKey.POSITION]: state[DashboardStateKey.POSITION].map(
					(positionElement, index) => {
						if (index !== action.payload.course) {
							return positionElement;
						}

						return positionElement === action.payload.fret
							? "x"
							: action.payload.fret;
					},
				),
			};

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
	isAccordionOpen: (section: Section) => boolean;
	toggleAccordion: (section: Section, open?: boolean) => void;
	isScaleDegreeInScale: (scaleDegree: string) => boolean;
	toggleScaleDegree: (degree: string | undefined) => void;
	toggleChordDegree: (degree: string | undefined) => void;
	togglePositionElement: (fret: number, course: number) => void;
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

	const isAccordionOpen = (section: Section) =>
		context.appState[DashboardStateKey.OPEN_ACCORDION_IDS]?.includes(section);

	const toggleAccordion = (section: Section, open?: boolean) => {
		context.dispatch({
			type: DashboardActionType.TOGGLE_ACCORDION,
			payload: { section, open },
		});
	};

	const isScaleDegreeInScale = (degree: string) =>
		context.appState[DashboardStateKey.SCALE]?.includes(degree);

	const toggleScaleDegree = (degree: string | undefined) => {
		if (degree === undefined) {
			return;
		}

		context.dispatch({
			type: DashboardActionType.TOGGLE_SCALE_DEGREE,
			payload: { degree },
		});
	};

	const toggleChordDegree = (degree: string | undefined) => {
		if (degree === undefined) {
			return;
		}

		context.dispatch({
			type: DashboardActionType.TOGGLE_CHORD_DEGREE,
			payload: { degree },
		});
	};

	const togglePositionElement = (fret: number, course: number) => {
		context.dispatch({
			type: DashboardActionType.TOGGLE_POSITION_ELEMENT,
			payload: { fret, course },
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
		togglePositionElement,
		toggleChordDegree,
		getValue,
		getValues,
		setValue,
		getUrl,
		getAppUrl,
	};
};
