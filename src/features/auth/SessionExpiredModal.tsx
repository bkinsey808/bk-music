import { useCallback } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { AuthModal } from "./enums";
import { useAuth } from "./useAuth";
import { Button } from "@/components/ui/button";

export const SessionExpiredModal = () => {
	const { signInClientSide, openAuthModal, setOpenAuthModal } = useAuth();

	const setOpen = useCallback(
		(open: boolean) => {
			setOpenAuthModal(open ? AuthModal.SESSION_EXPIRED : undefined);
		},
		[setOpenAuthModal],
	);

	return (
		<Modal
			heading="Session Expired"
			open={openAuthModal === AuthModal.SESSION_EXPIRED}
			setOpen={setOpen}
		>
			<ModalContent>
				<p>Your session has expired</p>
			</ModalContent>
			<ModalFooter>
				<Button
					onClick={() => {
						signInClientSide();
						setOpen(false);
					}}
				>
					Sign In
				</Button>
				<Button
					onClick={() => {
						setOpen(false);
					}}
				>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};
