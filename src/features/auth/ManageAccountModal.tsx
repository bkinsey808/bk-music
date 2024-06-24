"use client";

import { useCallback } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { AuthModal } from "./enums";
import { useAuth } from "./useAuth";
import { signOut } from "@/actions/signOut";
import { Button } from "@/components/ui/button";

export const ManageAccountModal = () => {
	const { setUserData, openAuthModal, setOpenAuthModal } = useAuth();

	const setOpen = useCallback(
		(open: boolean) => {
			setOpenAuthModal(open ? AuthModal.MANAGE_ACCOUNT : undefined);
		},
		[setOpenAuthModal],
	);

	return (
		<Modal
			heading="Manage your account"
			open={openAuthModal === AuthModal.MANAGE_ACCOUNT}
			setOpen={setOpen}
		>
			<ModalContent>
				<Button
					onClick={() => {
						signOut();
						setUserData(undefined);
						setOpen(false);
					}}
				>
					Sign Out
				</Button>

				<Button
					variant="destructive"
					onClick={() => {
						setOpenAuthModal(AuthModal.DELETE_ACCOUNT_CONFIRM);
					}}
				>
					Delete Account
				</Button>
			</ModalContent>

			<ModalFooter>
				<Button
					className="w-full"
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
