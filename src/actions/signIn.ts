"use server";

import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

import { encodeSessionToken } from "@/features/auth/encodeSessionToken";
import { UserStatus } from "@/features/auth/enums";
import { UserData, UserDataOmitEmail } from "@/features/auth/types";
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
		const userDataOmitEmail = existingUserDocRef.data() as UserDataOmitEmail;

		const userData: UserData = {
			email,
			...userDataOmitEmail,
		};

		const sessionToken = await encodeSessionToken(userData);

		cookies().set("session", sessionToken, {
			maxAge: 60 * 60 * 2,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
		});

		return {
			userStatus: UserStatus.EXISTING,
			sessionToken,
		};
	}
	console.log("No existing user");

	return { userStatus: UserStatus.NEW };
};
