import { Dispatch, SetStateAction } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { useAuth } from "./useAuth";
import { Button } from "@/components/ui/button";

export const SessionExpiredModal = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const { signInClientSide } = useAuth();

	return (
		<Modal heading="Session Expired" open={open} setOpen={setOpen}>
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
