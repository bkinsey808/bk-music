"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";

import { UserData } from "./types";
import { checkSignIn } from "@/actions/checkSignIn";

export const AuthContext = createContext<{
	userData?: UserData | undefined;
	setUserData: Dispatch<SetStateAction<UserData | undefined>>;
}>({
	userData: undefined,
	setUserData: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<UserData>();

	const handleRefresh = useCallback(
		() =>
			void (async () => {
				const userData = await checkSignIn();

				if (userData) {
					setUserData(userData);
				}
			}),
		[],
	);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<AuthContext.Provider value={{ userData, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};
