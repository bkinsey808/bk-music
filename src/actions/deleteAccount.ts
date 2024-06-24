"use server";

import { deleteDoc, doc } from "firebase/firestore";
import { cookies } from "next/headers";

import { checkSignIn } from "./checkSignIn";
import { SESSION_COOKIE_NAME } from "@/features/auth/consts";
import { DeleteAccountResult } from "@/features/auth/enums";
import { db } from "@/features/firebase/firebase";

export const deleteAccount = async () => {
	try {
		const checkSignInResult = await checkSignIn();

		if (!checkSignInResult) {
			return DeleteAccountResult.ERROR;
		}

		const { username, email } = checkSignInResult;

		await deleteDoc(doc(db, "users", email));
		await deleteDoc(doc(db, "usernames", username));

		cookies().delete(SESSION_COOKIE_NAME);

		return DeleteAccountResult.SUCCESS;
	} catch (error) {
		console.error({ error });
		return DeleteAccountResult.ERROR;
	}
};
