"use server";

import { Either } from "effect";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

import { RegisterErrorsSchema } from "@/features/auth/RegisterErrorsSchema";
import { SESSION_COOKIE_NAME } from "@/features/auth/consts";
import { encodeSessionToken } from "@/features/auth/encodeSessionToken";
import { RegisterFormFieldKey, RegisterResult } from "@/features/auth/enums";
import { getSessionCookieOptions } from "@/features/auth/getSessionCookieOptions";
import { RegisterValues, SignInData, UserData } from "@/features/auth/types";
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
		const userData: UserData = {
			...registerValues,
			...signInData,
			songs: [],
			roles: [],
		};
		// eslint-disable-next-line destructuring/no-rename
		const { email: _email, ...userDataOmitEmail } = userData;

		await setDoc(doc(db, "users", signInData.email), userDataOmitEmail);
		await setDoc(doc(db, "usernames", username), {
			email: signInData.email,
		});

		const sessionToken = await encodeSessionToken(userData);

		cookies().set(SESSION_COOKIE_NAME, sessionToken, getSessionCookieOptions());

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
