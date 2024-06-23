"use server";

import { cookies } from "next/headers";

export const signOut = () => {
	console.log("sign out");
	cookies().delete("session");
};
