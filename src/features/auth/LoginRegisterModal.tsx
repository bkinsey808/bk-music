"use client";

import { Schema as S } from "@effect/schema";
import { useState } from "react";

import { Field } from "../design-system/Field";
import { Form } from "../design-system/Form";
import { Input } from "../design-system/Input";
import { Modal, ModalContent, ModalFooter } from "../design-system/Modal";
import { getKeys } from "../global/getKeys";
import { RegistrationSchema, registrationFormFieldMessageMap } from "./consts";
import { RegisterFormFieldKey } from "./enums";
import {
	RegistrationFormErrors,
	RegistrationFormValues,
	SignInData,
} from "./types";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";

const FORM_ID = "register-form";

export const LoginRegisterModal = ({
	open,
	setOpen,
	signInData,
}: {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	signInData?: SignInData | undefined;
}) => {
	const [values, setValues] = useState<RegistrationFormValues>({
		[RegisterFormFieldKey.Username]: "",
		[RegisterFormFieldKey.AcceptTermsAndConditions]: false,
	});
	const [errors, setErrors] = useState<RegistrationFormErrors>(
		{} as RegistrationFormErrors,
	);

	return (
		<Modal heading="Welcome to Song Share!" open={open} setOpen={setOpen}>
			<ModalContent>
				<p>Create a user name to get started</p>

				<Form
					id={FORM_ID}
					values={values}
					errors={errors}
					setValues={setValues}
					setErrors={setErrors}
					messageMap={registrationFormFieldMessageMap}
					schema={
						RegistrationSchema as S.Schema<
							RegistrationFormValues,
							RegistrationFormErrors
						>
					}
					onSubmit={() => {
						register(
							JSON.stringify({
								...values,
								...signInData,
							}),
						);
					}}
				>
					<Field fieldKey={RegisterFormFieldKey.Username} label="User name">
						<Input
							name={RegisterFormFieldKey.Username}
							type="text"
							placeholder="User name"
						/>
					</Field>

					<Field
						fieldKey={RegisterFormFieldKey.AcceptTermsAndConditions}
						label="I agree to the terms and conditions"
						checkbox={true}
					>
						<Input
							name={RegisterFormFieldKey.AcceptTermsAndConditions}
							type="checkbox"
						/>
					</Field>
				</Form>
			</ModalContent>

			<ModalFooter>
				<Button
					type="submit"
					form={FORM_ID}
					disabled={getKeys(errors).length > 0}
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
