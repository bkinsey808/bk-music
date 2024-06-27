import { Dispatch, useContext } from "react";

import { DashboardActionType, DashboardStateKey } from "./enums";
import { DashboardAction, DashboardState } from "./types";
import { saveSong as saveSongAction } from "@/actions/saveSong";
import { fromAppStateGetUrl } from "@/features/app-state/fromAppStateGetUrl";
import { AppStateContext } from "@/features/app-state/useAppState";
import { Section } from "@/features/sections/sections";

export const dashboardInitialPath = "/d";

export const dashboardStateKeys: DashboardStateKey[] =
	Object.values(DashboardStateKey);

export interface DashboardStateContextProps {
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
	setValues: (values: Partial<DashboardState>) => void;
	getUrl: <K extends Partial<DashboardState>>(partialState: K) => string;
	getAppUrl: () => string;
	getState: () => DashboardState;
	resetState: () => void;
	saveSong: () => void;
}

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

		// const chordsFromPosition = getChordsFromPosition({
		// 	tuning: context.appState[DashboardStateKey.TUNING],
		// 	position: context.appState[DashboardStateKey.POSITION],
		// 	keyNote: context.appState[DashboardStateKey.KEY_NOTE],
		// });

		// console.log({ chordsFromPosition });

		// const preferredChord = chordsFromPosition?.find(
		// 	({ preferred }) => preferred,
		// );

		// const chord = preferredChord ?? chordsFromPosition?.[0];

		// if (chord == undefined) {
		// 	return;
		// }

		// context.dispatch({
		// 	type: DashboardActionType.SET_KEY_VALUE,
		// 	payload: { key: DashboardStateKey.CHORD, value: chord.chordSpelling },
		// });

		// context.dispatch({
		// 	type: DashboardActionType.SET_KEY_VALUE,
		// 	payload: {
		// 		key: DashboardStateKey.CHORD_SCALE_DEGREE,
		// 		value: chord.scaleDegree,
		// 	},
		// });
	};

	const getValue = <K extends keyof DashboardState>(
		key: K,
	): DashboardState[K] => {
		return context.appState[key];
	};

	const getValues = <K extends DashboardStateKey[]>(
		keys: [...K],
	): { [I in keyof K]: DashboardState[K[I]] } =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
		keys.map((key) => context.appState[key]) as any;

	const setValue = (key: DashboardStateKey, value: unknown) => {
		context.dispatch({
			type: DashboardActionType.SET_KEY_VALUE,
			payload: { key, value },
		});
	};

	const setValues = (values: Partial<DashboardState>) => {
		context.dispatch({
			type: DashboardActionType.SET_VALUES,
			payload: values,
		});
	};

	// take an object that takes a new state and return a string
	const getUrl = <K extends Partial<DashboardState>>(partialState: K) => {
		const newState = {
			...context.appState,
			...partialState,
		};
		return fromDashboardStateGetUrl(newState);
	};

	const getAppUrl = () => fromDashboardStateGetUrl(context.appState);

	const getState = () => context.appState;
	const resetState = () => {
		context.dispatch({
			type: DashboardActionType.RESET_STATE,
		});
	};

	const saveSong = () => {
		void (async () => {
			setValue(DashboardStateKey.IS_SAVING_SONG, true);
			const [songName, songId, credits, lyrics, translation, keyNote, scale] =
				getValues([
					DashboardStateKey.SONG_NAME,
					DashboardStateKey.SONG_ID,
					DashboardStateKey.CREDITS,
					DashboardStateKey.LYRICS,
					DashboardStateKey.TRANSLATION,
					DashboardStateKey.KEY_NOTE,
					DashboardStateKey.SCALE,
				]);

			const result = await saveSongAction({
				songName,
				songId,
				credits,
				lyrics,
				translation,
				keyNote,
				scale,
			});

			if (result.songId) {
				setValues({
					[DashboardStateKey.SONG_ID]: result.songId,
				});
			}
			setValue(DashboardStateKey.IS_SAVING_SONG, false);
		})();
	};

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
		setValues,
		getUrl,
		getAppUrl,
		getState,
		resetState,
		saveSong,
	};
};
