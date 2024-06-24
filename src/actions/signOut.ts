"use server";

import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/features/auth/consts";

export const signOut = () => {
	console.log("sign out");
	cookies().delete(SESSION_COOKIE_NAME);
};
