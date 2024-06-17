import { JWTPayload, SignJWT } from "jose";

import { UserData } from "./types";

const sessionPrivateKey = process.env.SESSION_PRIVATE_KEY;

export const encodeSessionToken = async (userData: UserData) => {
	if (!sessionPrivateKey) {
		throw new Error("SESSION_PRIVATE_KEY is not defined");
	}

	const jwtKey = new TextEncoder().encode(sessionPrivateKey);

	const sessionToken = await new SignJWT(userData as unknown as JWTPayload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("2h")
		.sign(jwtKey);

	return sessionToken;
};
