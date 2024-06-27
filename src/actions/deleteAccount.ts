"use server";

import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

import { checkSignIn } from "./checkSignIn";
import { SESSION_COOKIE_NAME } from "@/features/auth/consts";
import { DeleteAccountResult } from "@/features/auth/enums";
import { UserDocData } from "@/features/auth/types";
import { db } from "@/features/firebase/firebase";

export const deleteAccount = async () => {
	try {
		const checkSignInResult = await checkSignIn();

		if (!checkSignInResult) {
			return DeleteAccountResult.ERROR;
		}

		const { username, email } = checkSignInResult;

		const userDocRef = await getDoc(doc(db, "users", email));
		const userDocData = userDocRef.data() as UserDocData;
		if (userDocData === undefined) {
			return {
				result: "ERROR",
				message: "User does not exist",
			};
		}

		const songs = userDocData.songs;
		const deleteSongPromises = songs.map((song) =>
			deleteDoc(doc(db, "songs", song)),
		);
		const songDeleteResult = await Promise.allSettled(deleteSongPromises);

		// check to see if any of the song deletes failed
		const failedDeletes = songDeleteResult.filter(
			(result) => result.status === "rejected",
		);
		if (failedDeletes.length > 0) {
			return {
				result: "ERROR",
				message: "Failed to delete songs",
			};
		}

		await deleteDoc(doc(db, "users", email));
		await deleteDoc(doc(db, "usernames", username));

		cookies().delete(SESSION_COOKIE_NAME);

		return DeleteAccountResult.SUCCESS;
	} catch (error) {
		console.error({ error });
		return DeleteAccountResult.ERROR;
	}
};
