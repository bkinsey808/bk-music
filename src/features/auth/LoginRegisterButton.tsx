"use client";

import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { LoginRegisterModal } from "./LoginRegisterModal";
import { SignInData } from "./signInData";
import { UserStatus } from "./userStatus";
import { signIn } from "@/actions/signIn";
import "@/features/firebase/firebase";

const provider = new GoogleAuthProvider();

export const LoginRegisterButton = () => {
	const [open, setOpen] = useState(false);
	const [signInData, setSignInData] = useState<SignInData>();

	return (
		<>
			<LoginRegisterModal
				open={open}
				setOpen={setOpen}
				signInData={signInData}
			/>
			<button
				onClick={async () => {
					try {
						const auth = getAuth();
						const userCredential = await signInWithPopup(auth, provider);
						const email = userCredential.user.email;

						if (!email) {
							throw new Error("Email is not defined");
						}

						setSignInData({
							email,
							picture: userCredential.user.photoURL,
						});

						const signInResult = await signIn(email);
						if (signInResult.userStatus === UserStatus.NEW) {
							console.log("New user");
							setOpen(true);
						}
					} catch (error) {
						if (error instanceof FirebaseError) {
							const errorCode = error?.code;
							const errorMessage = error?.message;
							// The email of the user's account used.
							const email = error.customData?.email;
							// The AuthCredential type that was used.
							const credential = GoogleAuthProvider.credentialFromError(error);
							console.error({ errorCode, errorMessage, email, credential });
						} else {
							console.error({ error });
						}
					}
				}}
			>
				Sign in / Register
			</button>
		</>
	);
};
