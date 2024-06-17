"use client";

import { useState } from "react";

import { ManageAccountModal } from "./ManageAccountModal";
import { useAuth } from "./useAuth";

export const ManageAccountButton = () => {
	const [open, setOpen] = useState(false);
	const { user } = useAuth();

	return (
		<>
			<ManageAccountModal open={open} setOpen={setOpen} />
			<button
				onClick={() => {
					setOpen(true);
				}}
			>
				{user?.username}
			</button>
		</>
	);
};
