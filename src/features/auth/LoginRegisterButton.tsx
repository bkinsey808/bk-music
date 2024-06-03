"use client";

import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { LoginRegisterModal } from "./LoginRegisterModal";
import { UserStatus } from "./enums";
import { SignInData } from "./types";
import { signIn } from "@/actions/signIn";
import "@/features/firebase/firebase";

const provider = new GoogleAuthProvider();

export const LoginRegisterButton = () => {
	const [open, setOpen] = useState(false);
	const [signInData, setSignInData] = useState<SignInData>();

	return (
		<>
			<LoginRegisterModal
				key={open.toString()}
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

						switch (signInResult.userStatus) {
							case UserStatus.NEW:
								setOpen(true);
								break;
							case UserStatus.EXISTING:
								break;
							default:
								// const decodedSession =
								console.error("Unknown user status");
						}
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
