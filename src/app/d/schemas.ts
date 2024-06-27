import { Schema as S } from "@effect/schema";

import { DashboardStateKey, SelectCellToSet } from "./enums";
import { degrees } from "@/features/music/degrees";

export const SongLibrarySchema = S.Record(
	S.String,
	S.Struct({
		songId: S.String,
		songName: S.String,
		credits: S.String,
		lyrics: S.String,
		translation: S.String,
		keyNote: S.String,
		scale: S.Array(S.String),
		owner: S.String,
	}),
);

export const ChordSchema = S.Array(S.String);
export const InstrumentTuningSchema = S.Union(S.String, S.Undefined);
export const TuningSchema = S.Array(S.String);
export const KeyNoteSchema = S.Union(S.String, S.Undefined);
export const ScaleSchema = S.Array(S.String);
export const PositionSchema = S.Array(S.Union(S.Number, S.Literal("x")));
export const ChordScaleDegreeSchema = S.Union(
	S.Literal(...Object.values(degrees)),
	S.Undefined,
);

export const dashboardSchemaOption = {
	[DashboardStateKey.INSTRUMENT_TUNING]: InstrumentTuningSchema,
	[DashboardStateKey.TUNING]: TuningSchema,
	[DashboardStateKey.KEY_NOTE]: KeyNoteSchema,
	[DashboardStateKey.SCALE]: ScaleSchema,
	[DashboardStateKey.CHORD]: ChordSchema,
	[DashboardStateKey.CHORD_SCALE_DEGREE]: ChordScaleDegreeSchema,
	[DashboardStateKey.POSITION]: PositionSchema,
	[DashboardStateKey.OPEN_ACCORDION_IDS]: S.Array(S.String),
	[DashboardStateKey.SONG_NAME]: S.Union(S.String, S.Undefined),
	[DashboardStateKey.SONG_ID]: S.Union(S.String, S.Undefined),

	[DashboardStateKey.INSTRUMENT]: S.Union(S.String, S.Undefined),
	[DashboardStateKey.CREDITS]: S.Union(S.String, S.Undefined),
	[DashboardStateKey.LYRICS]: S.Union(S.String, S.Undefined),
	[DashboardStateKey.TRANSLATION]: S.Union(S.String, S.Undefined),
	[DashboardStateKey.MAX_FRETS]: S.Number,
	[DashboardStateKey.SELECT_CELL_TO_SET]: S.Literal(
		...Object.values(SelectCellToSet),
	),
	[DashboardStateKey.IS_SAVING_SONG]: S.Boolean,
	[DashboardStateKey.SONG_LIBRARY]: SongLibrarySchema,
};
