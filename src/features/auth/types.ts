import { Schema as S } from "@effect/schema";

import { RegisterValuesSchema } from "./RegisterValuesSchema";

export type SignInData = {
	email: string;
	picture: string | null;
};

export type RegisterValues = S.Schema.Type<typeof RegisterValuesSchema>;

export type UserData = RegisterValues & SignInData;
export type UserDataOmitEmail = Omit<UserData, "email">;
