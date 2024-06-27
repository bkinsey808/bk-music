import {
	DashboardActionType,
	DashboardStateKey,
	SelectCellToSet,
} from "./enums";
import { DashboardAction, DashboardState, SongLibrary } from "./types";
import { toggleArrayItem } from "@/features/app-state/toggleArrayItem";
import { degrees } from "@/features/music/degrees";
import { getChordsFromPosition } from "@/features/music/getChordsFromPosition";

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
			// eslint-disable-next-line no-case-declarations
			const newPosition = state[DashboardStateKey.POSITION].map(
				(positionElement, index) => {
					if (index !== action.payload.course) {
						return positionElement;
					}

					return positionElement === action.payload.fret
						? "x"
						: action.payload.fret;
				},
			);

			// eslint-disable-next-line no-case-declarations
			const chordsFromPosition = getChordsFromPosition({
				tuning: state[DashboardStateKey.TUNING],
				position: newPosition,
				keyNote: state[DashboardStateKey.KEY_NOTE],
			});

			// eslint-disable-next-line no-case-declarations
			const preferredChord = chordsFromPosition?.find(
				({ preferred }) => preferred,
			);

			// eslint-disable-next-line no-case-declarations
			const chord = preferredChord ?? chordsFromPosition?.[0];

			if (chord == undefined) {
				return {
					...state,
					[DashboardStateKey.POSITION]: newPosition,
				};
			}

			return {
				...state,
				[DashboardStateKey.POSITION]: newPosition,
				[DashboardStateKey.CHORD]: chord.chordSpelling,
				[DashboardStateKey.CHORD_SCALE_DEGREE]: chord.scaleDegree,
			};

		case DashboardActionType.SET_KEY_VALUE:
			return {
				...state,
				[action.payload.key]: action.payload.value,
			};

		case DashboardActionType.SET_VALUES:
			return {
				...state,
				...action.payload,
			};

		case DashboardActionType.RESET_STATE:
			return {
				[DashboardStateKey.INSTRUMENT_TUNING]: undefined,
				[DashboardStateKey.TUNING]: [],
				[DashboardStateKey.KEY_NOTE]: undefined,
				[DashboardStateKey.SCALE]: [],
				[DashboardStateKey.CHORD]: [],
				[DashboardStateKey.CHORD_SCALE_DEGREE]: undefined,
				[DashboardStateKey.POSITION]: [],
				[DashboardStateKey.OPEN_ACCORDION_IDS]: [],
				[DashboardStateKey.SONG_NAME]: undefined,
				[DashboardStateKey.SONG_ID]: undefined,
				[DashboardStateKey.INSTRUMENT]: undefined,
				[DashboardStateKey.CREDITS]: undefined,
				[DashboardStateKey.LYRICS]: undefined,
				[DashboardStateKey.TRANSLATION]: undefined,
				[DashboardStateKey.MAX_FRETS]: 12,
				[DashboardStateKey.SELECT_CELL_TO_SET]:
					Object.values(SelectCellToSet)[0],
				[DashboardStateKey.IS_SAVING_SONG]: false,
				[DashboardStateKey.SONG_LIBRARY]: {} as SongLibrary,
			};

		default:
			return state;
	}
};
