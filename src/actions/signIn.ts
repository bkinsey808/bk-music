"use server";

import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { SignJWT } from "jose";

import { UserStatus } from "@/features/auth/userStatus";
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
		const existingUser = existingUserDocRef.data();
		console.log("existing user:", existingUser);

		const sessionPrivateKey = process.env.SESSION_PRIVATE_KEY;

		if (!sessionPrivateKey) {
			throw new Error("SESSION_PRIVATE_KEY is not defined");
		}

		const jwtKey = new TextEncoder().encode(sessionPrivateKey);

		const sessionToken = await new SignJWT(existingUser)
			.setProtectedHeader({ alg: "ES256" })
			.setIssuedAt()
			.setExpirationTime("2h")
			.sign(jwtKey);

		return {
			userStatus: UserStatus.EXISTING,
			sessionToken,
		};
	}
	console.log("No existing user");

	return { userStatus: UserStatus.NEW };
};
