import { Schema as S } from "@effect/schema";

import { RegisterValuesSchema } from "./RegisterValuesSchema";
import { Role } from "./enums";

export interface SignInData {
	email: string;
	picture?: string | undefined;
}

export type RegisterValues = S.Schema.Type<typeof RegisterValuesSchema>;

export type UserData = RegisterValues &
	SignInData & {
		roles: Role[];
		songs: string[];
	};
export type UserDocData = Omit<UserData, "email">;
