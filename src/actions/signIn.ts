"use server";

import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/features/auth/consts";
import { encodeSessionToken } from "@/features/auth/encodeSessionToken";
import { UserStatus } from "@/features/auth/enums";
import { getSessionCookieOptions } from "@/features/auth/getSessionCookieOptions";
import { UserData, UserDocData } from "@/features/auth/types";
import { db } from "@/features/firebase/firebase";

export const signIn = async (email: string) => {
	// const userCredential = JSON.parse(serializedUserCredential) as UserCredential;

	// This gives you a Google Access Token. You can use it to access the Google API.
	// const credential = GoogleAuthProvider.credentialFromResult(userCredential);
	// const token = credential?.accessToken;
	// The signed-in user info.
	// const user = userCredential.user;
	// const additionalUserInfo = getAdditionalUserInfo(userCredential);
	// ...
	// console.log({ user, additionalUserInfo, token });

	// const email = user?.email;

	const existingUserDocRef =
		email === null ? undefined : await getDoc(doc(db, "users", email));

	if (existingUserDocRef?.exists()) {
		const userDataOmitEmail = existingUserDocRef.data() as UserDocData;

		const userData: UserData = {
			email,
			...userDataOmitEmail,
		};

		const sessionToken = await encodeSessionToken(userData);

		cookies().set(SESSION_COOKIE_NAME, sessionToken, getSessionCookieOptions());

		return {
			userStatus: UserStatus.EXISTING,
			userData,
		};
	}
	console.log("No existing user");

	return { userStatus: UserStatus.NEW };
};
