"use server";

import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/features/auth/consts";
import { decodeSessionToken } from "@/features/auth/decodeSessionToken";
import { UserData } from "@/features/auth/types";

export const checkSignIn = async () => {
	try {
		const sessionCookie = cookies().get(SESSION_COOKIE_NAME);

		if (!sessionCookie) {
			return null;
		}

		const sessionToken = sessionCookie.value;

		const userData = (await decodeSessionToken(sessionToken))
			?.payload as unknown as UserData | null;

		return userData;
	} catch (error) {
		console.error("Error decoding session token", error);
		return null;
	}
};
