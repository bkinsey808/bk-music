"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { FormErrors } from "../design-system/form/types";
import { getKeys } from "../global/getKeys";
import { RegisterForm } from "./RegisterForm";
import { SignInData } from "./types";
import { Button } from "@/components/ui/button";

const FORM_ID = "register-form";

export const RegisterModal = ({
	open,
	setOpen,
	signInData,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	signInData?: SignInData | undefined;
}) => {
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitting, setSubmitting] = useState(false);

	if (!signInData) {
		return null;
	}

	return (
		<Modal heading="Welcome to Song Share!" open={open} setOpen={setOpen}>
			<ModalContent>
				<p>Create a user name to get started</p>
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
