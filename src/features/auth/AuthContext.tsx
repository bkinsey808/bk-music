"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

import { UserData } from "./types";

export const AuthContext = createContext<{
	user?: UserData | undefined;
	setUser: Dispatch<SetStateAction<UserData | undefined>>;
}>({
	user: undefined,
	setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserData>();

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
