"use client";

import { AuthModal } from "./enums";
import { useAuth } from "./useAuth";

export const ManageAccountButton = () => {
	const { userData, setOpenAuthModal } = useAuth();

	return (
		<button
			onClick={() => {
				setOpenAuthModal(AuthModal.MANAGE_ACCOUNT);
			}}
		>
			{userData?.username}
		</button>
	);
};
