export const enum DashboardActionType {
	TOGGLE_ACCORDION = "toggleAccordion",
	TOGGLE_SCALE_DEGREE = "toggleScaleDegree",
	TOGGLE_POSITION_ELEMENT = "togglePositionElement",
	TOGGLE_CHORD_DEGREE = "toggleChordDegree",
	SET_KEY_VALUE = "setKeyValue",
	SET_VALUES = "setValues",
	RESET_STATE = "resetState",
}

export enum DashboardStateKey {
	SONG_NAME = "s",
	SONG_ID = "sid",
	IS_SAVING_SONG = "iss",
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
	SELECT_CELL_TO_SET = "sct",
	SONG_LIBRARY = "sl",
}

export enum SelectCellToSet {
	SCALE = "scale",
	POSITION = "position",
	TONE = "tone",
}
