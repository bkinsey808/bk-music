"use server";

import { doc, setDoc } from "firebase/firestore";

import { RegistrationFormValues, SignInData } from "@/features/auth/types";
import { db } from "@/features/firebase/firebase";

export const register = async (serializedRegistrationData: string) => {
	const registrationData = JSON.parse(
		serializedRegistrationData,
	) as SignInData & RegistrationFormValues;
	console.log({ registrationData });
	try {
		const result = setDoc(
			doc(db, "users", registrationData.email),
			registrationData,
		);
		console.log({ result });
	} catch (error) {
		console.error({ error });
	}
};
