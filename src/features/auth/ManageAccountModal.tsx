"use client";

import { Dispatch, SetStateAction } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { useAuth } from "./useAuth";
import { signOut } from "@/actions/signOut";
import { Button } from "@/components/ui/button";

export const ManageAccountModal = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const { setUserData } = useAuth();

	return (
		<Modal heading="Welcome to Song Share!" open={open} setOpen={setOpen}>
			<ModalContent>
				<p>Manage your account</p>

				<Button
					onClick={() => {
						signOut();
						setUserData(undefined);
						setOpen(false);
					}}
				>
					Sign Out
				</Button>

				<Button variant="destructive">Delete Account</Button>
			</ModalContent>

			<ModalFooter>
				<Button
					onClick={() => {
						setOpen(false);
					}}
				>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};
