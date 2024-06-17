"use server";

import { cookies } from "next/headers";

import { decodeSessionToken } from "@/features/auth/decodeSessionToken";
import { UserData } from "@/features/auth/types";

export const checkSignIn = async () => {
	try {
		const sessionCookie = cookies().get("session");
		if (!sessionCookie) {
			return null;
		}

		const sessionToken = sessionCookie.value;

		const data = (await decodeSessionToken(sessionToken))
			?.payload as UserData | null;

		return data;
	} catch (error) {
		console.error("Error decoding session token", error);
		return null;
	}
};