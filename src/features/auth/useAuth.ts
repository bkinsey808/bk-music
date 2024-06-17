import { useContext } from "react";

import { AuthContext } from "./AuthContext";
import { Role } from "./enums";

export const useAuth = () => {
	const { user, setUser } = useContext(AuthContext);

	const isAdmin = user?.roles?.includes(Role.ADMIN) ?? false;

	return {
		user,
		setUser,
		isAdmin,
	};
};
