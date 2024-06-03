import { Schema as S } from "@effect/schema";

import { RegistrationSchema } from "./consts";

export type SignInData = {
	email: string;
	picture: string | null;
};

export type RegistrationFormValues = S.Schema.Type<typeof RegistrationSchema>;

export type RegistrationFormErrors = Record<
	keyof RegistrationFormValues,
	string
>;
