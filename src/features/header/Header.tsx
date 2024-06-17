"use client";

import { LoginRegisterButton } from "../auth/LoginRegisterButton";
import { ManageAccountButton } from "../auth/ManageAccountButton";
import { useAuth } from "../auth/useAuth";
import "@/features/firebase/firebase";

export const Header = () => {
	const { userData } = useAuth();

	return (
		<header className="flex justify-between bg-[var(--color-header-background)] p-[0.5rem] text-[hsl(var(--background))]">
			<h1 className="text-4xl font-bold">Song Share</h1>
			{userData ? <ManageAccountButton /> : <LoginRegisterButton />}
		</header>
	);
};
