import * as sci from "../sci.json";

describe("sci", () => {
	it("matches the snapshot", () => {
		const sciArray = Object.keys(sci)
			.map((key) => sci[key as unknown as number])
			.filter(
				(sci) =>
					sci.numNote === 4 && sci.booPrefer === 1 && sci.numHalfStepsInRow < 3,
			);

		// console.log(sciArray);
	});
});
