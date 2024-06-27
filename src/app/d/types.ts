import { Schema as S } from "@effect/schema";

import { DashboardActionType, DashboardStateKey } from "./enums";
import {
	ChordScaleDegreeSchema,
	ChordSchema,
	InstrumentTuningSchema,
	KeyNoteSchema,
	PositionSchema,
	ScaleSchema,
	SongLibrarySchema,
	TuningSchema,
	dashboardSchemaOption,
} from "./schemas";
import { Section } from "@/features/sections/sections";

export type Chord = S.Schema.Type<typeof ChordSchema>;
export type SongLibrary = S.Schema.Type<typeof SongLibrarySchema>;
export type InstrumentTuning = S.Schema.Type<typeof InstrumentTuningSchema>;
export type Tuning = S.Schema.Type<typeof TuningSchema>;

export type Position = S.Schema.Type<typeof PositionSchema>;

export type ChordScaleDegree = S.Schema.Type<typeof ChordScaleDegreeSchema>;

const DashboardStateSchema = S.Struct(dashboardSchemaOption);

export type Scale = S.Schema.Type<typeof ScaleSchema>;
export type KeyNote = S.Schema.Type<typeof KeyNoteSchema>;

export type DashboardState = S.Schema.Type<typeof DashboardStateSchema>;

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
	  }
	| {
			type: DashboardActionType.SET_VALUES;
			payload: Partial<DashboardState>;
	  }
	| {
			type: DashboardActionType.RESET_STATE;
	  };
