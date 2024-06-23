"use client";

import { useAuth } from "./useAuth";

export const LoginRegisterButton = () => {
	const { signInClientSide } = useAuth();

	return <button onClick={signInClientSide}>Sign in / Register</button>;
};
