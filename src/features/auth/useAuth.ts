import { useContext } from "react";

import { AuthContext } from "./AuthContext";
import { Role } from "./enums";

export const useAuth = () => {
	const { userData, setUserData } = useContext(AuthContext);

	const isAdmin = userData?.roles?.includes(Role.ADMIN) ?? false;

	return {
		userData,
		setUserData,
		isAdmin,
	};
};
