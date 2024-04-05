import { getPositions } from "./get-positions";

describe("getPositions", () => {
	it("returns correct positions for C major chord", () => {
		const tuning = "E4-A4-D5-G5-B5-E6";
		const keyNote = "C";
		const chord = "ii-3-5";

		const positions = getPositions({ tuning, keyNote, chord });
		console.log(positions);
	});
});
