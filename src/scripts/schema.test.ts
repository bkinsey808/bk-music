import { Schema as S } from "@effect/schema";
import { Either } from "effect";

describe("effect ts schema test", () => {
	it("validate a form", () => {
		const Positive = S.Number.pipe(
			S.filter((n) => (n > 0 ? undefined : "must be positive")),
		);

		const MyStruct = S.Struct({
			name: S.String.pipe(S.nonEmpty({ message: () => "Username required" })),
			x: Positive,
		});

		const validateForm = S.decodeEither(MyStruct, { errors: "all" });

		const result = validateForm({
			name: "",
			x: -11,
		});

		// if (Either.isLeft(result)) {
		// 	console.log(ArrayFormatter.formatErrorSync(result.left));
		// }

		expect(Either.isLeft(result)).toBe(true);
	});
});
