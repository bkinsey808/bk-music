import { useContext } from "react";

import { AuthContext } from "./AuthContext";
import { Role } from "./enums";
import "@/features/firebase/firebase";

export const useAuth = () => {
	const {
		userData,
		setUserData,
		setLastSignInCheck,
		signInClientSide,
		openAuthModal,
		setOpenAuthModal,
		deleteAccountClientSide,
		deleteAccountError,
		deletingAccount,
	} = useContext(AuthContext);

	const isAdmin = userData?.roles?.includes(Role.ADMIN) ?? false;

	return {
		userData,
		setUserData,
		setLastSignInCheck,
		isAdmin,
		signInClientSide,
		openAuthModal,
		setOpenAuthModal,
		deleteAccountClientSide,
		deleteAccountError,
		deletingAccount,
	};
};
