"use client";

import { useCallback } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { AuthModal } from "./enums";
import { useAuth } from "./useAuth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const DeleteAccountConfirmModal = () => {
	const {
		deleteAccountClientSide,
		deleteAccountError,
		deletingAccount,
		openAuthModal,
		setOpenAuthModal,
	} = useAuth();

	const setOpen = useCallback(
		(open: boolean) => {
			setOpenAuthModal(open ? AuthModal.DELETE_ACCOUNT_CONFIRM : undefined);
		},
		[setOpenAuthModal],
	);

	return (
		<Modal
			heading="Confirm Delete Account"
			open={openAuthModal === AuthModal.DELETE_ACCOUNT_CONFIRM}
			setOpen={setOpen}
		>
			<ModalContent>
				{deleteAccountError ? (
					<Alert variant="destructive">{deleteAccountError}</Alert>
				) : null}
				<p>
					Are you sure you want to delete your account? This cannot be undone.
				</p>
			</ModalContent>

			<ModalFooter>
				<Button
					variant="destructive"
					disabled={deletingAccount}
					onClick={deleteAccountClientSide}
				>
					Delete Account
				</Button>

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
