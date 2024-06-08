"use server";

import { Either } from "effect";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

import { RegisterErrorsSchema } from "@/features/auth/RegisterErrorsSchema";
import { encodeSessionToken } from "@/features/auth/encodeSessionToken";
import { RegisterFormFieldKey, RegisterResult } from "@/features/auth/enums";
import { RegisterValues, SignInData } from "@/features/auth/types";
import { validateValues } from "@/features/design-system/form/validateValues";
import { db } from "@/features/firebase/firebase";

export const register = async ({
	serializedRegisterValues,
	serializedSignInData,
}: {
	serializedRegisterValues: string;
	serializedSignInData: string;
}) => {
	try {
		const registerValues = JSON.parse(
			serializedRegisterValues,
		) as RegisterValues;

		// server side validation same as client side validation!
		const result = validateValues(RegisterErrorsSchema)(registerValues);

		if (Either.isLeft(result)) {
			return {
				result: RegisterResult.ERROR,
				fieldErrors: result.left,
			};
		}

		const username = registerValues[RegisterFormFieldKey.Username];

		const existingUsernameDocRef = await getDoc(doc(db, "usernames", username));
		if (existingUsernameDocRef.exists()) {
			return {
				result: RegisterResult.ERROR,
				fieldErrors: {
					[RegisterFormFieldKey.Username]: ["Username is already taken"],
				},
			};
		}

		const signInData = JSON.parse(serializedSignInData) as SignInData;
		const userData = {
			...registerValues,
			...signInData,
		};
		const { email: _email, ...userDataOmitEmail } = userData;

		await setDoc(doc(db, "users", signInData.email), userDataOmitEmail);
		await setDoc(doc(db, "usernames", username), {
			email: signInData.email,
		});

		const sessionToken = await encodeSessionToken(userData);

		cookies().set("session", sessionToken, {
			maxAge: 60 * 60 * 2,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
		});

		return {
			result: RegisterResult.SUCCESS,
			sessionToken,
		};
	} catch (error) {
		console.error({ error });
		return {
			result: RegisterResult.ERROR,
			formError: "Failed to register",
		};
	}
};
