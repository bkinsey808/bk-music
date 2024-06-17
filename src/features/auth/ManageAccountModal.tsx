"use client";

import { Dispatch, SetStateAction } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { Button } from "@/components/ui/button";

export const ManageAccountModal = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<Modal heading="Welcome to Song Share!" open={open} setOpen={setOpen}>
			<ModalContent>
				<p>Manage your account</p>
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
