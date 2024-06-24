"use client";

import { useCallback, useState } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { FormErrors } from "../design-system/form/types";
import { getKeys } from "../global/getKeys";
import { RegisterForm } from "./RegisterForm";
import { AuthModal } from "./enums";
import { SignInData } from "./types";
import { useAuth } from "./useAuth";
import { Button } from "@/components/ui/button";

const FORM_ID = "register-form";

export const RegisterModal = ({
	signInData,
}: {
	signInData?: SignInData | undefined;
}) => {
	const { openAuthModal, setOpenAuthModal } = useAuth();
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitting, setSubmitting] = useState(false);

	const setOpen = useCallback(
		(open: boolean) => {
			setOpenAuthModal(open ? AuthModal.REGISTER : undefined);
		},
		[setOpenAuthModal],
	);

	if (!signInData) {
		return null;
	}

	return (
		<Modal
			heading="Create a user name to get started"
			open={openAuthModal === AuthModal.REGISTER}
			setOpen={setOpen}
		>
			<ModalContent>
				<RegisterForm
					id={FORM_ID}
					errors={errors}
					setErrors={setErrors}
					setSubmitting={setSubmitting}
					signInData={signInData}
					setOpen={setOpen}
				/>
			</ModalContent>

			<ModalFooter>
				<Button
					type="submit"
					form={FORM_ID}
					disabled={
						!!(
							errors?.fieldErrors && getKeys(errors?.fieldErrors).length > 0
						) || submitting
					}
				>
					Register
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
