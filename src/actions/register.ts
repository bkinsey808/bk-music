"use server";

import { RegistrationFormValues } from "@/features/auth/registrationForm";
import { SignInData } from "@/features/auth/signInData";

export const register = async (serializedRegistrationData: string) => {
	const registrationData = JSON.parse(
		serializedRegistrationData,
	) as SignInData & RegistrationFormValues;
	console.log({ registrationData });
};
