"use client";

import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useState,
} from "react";

import { useInterval } from "../global/useInterval";
import { RegisterModal } from "./RegisterModal";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { SESSION_POLLING_INTERVAL_SECONDS } from "./consts";
import { UserStatus } from "./enums";
import { SignInData, UserData } from "./types";
import { checkSignIn } from "@/actions/checkSignIn";
import { signIn } from "@/actions/signIn";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext<{
	userData?: UserData | undefined;
	setUserData: Dispatch<SetStateAction<UserData | undefined>>;
	setLastSignInCheck: Dispatch<SetStateAction<number>>;
	signInClientSide: () => void;
}>({
	userData: undefined,
	setUserData: () => undefined,
	setLastSignInCheck: () => 0,
	signInClientSide: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<UserData>();
	const [lastSignInCheck, setLastSignInCheck] = useState(0);
	const [openSessionExpiredModal, setOpenSessionExpiredModal] = useState(false);
	const [openRegisterModal, setOpenRegisterModal] = useState(false);
	const [signInData, setSignInData] = useState<SignInData>();

	const checkSignInClientSide = useCallback(async () => {
		const checkSignInResult = await checkSignIn();

		if (userData && checkSignInResult) {
			return checkSignInResult;
		}

		return false;
	}, [userData]);

	const intervalFn = useCallback(async () => {
		// we only need to poll if we haven't recently checked
		if (
			Date.now() - lastSignInCheck <
			SESSION_POLLING_INTERVAL_SECONDS * 1000
		) {
			return;
		}

		const checkSignInClientSideResult = await checkSignInClientSide();
		if (checkSignInClientSideResult) {
			setUserData(checkSignInClientSideResult);
			setLastSignInCheck(Date.now());
		} else {
			setUserData(undefined);
			setLastSignInCheck(0);
			setOpenSessionExpiredModal(true);
		}
	}, [lastSignInCheck, checkSignInClientSide]);

	useInterval(
		() => {
			void intervalFn();
		},
		userData ? SESSION_POLLING_INTERVAL_SECONDS * 1000 : null,
	);

	const signInClientSide = useCallback(
		() =>
			void (async () => {
				try {
					const auth = getAuth();
					const userCredential = await signInWithPopup(auth, provider);
					const email = userCredential.user.email;

					if (!email) {
						throw new Error("Email is not defined");
					}

					setSignInData({
						email,
						picture: userCredential.user.photoURL ?? undefined,
					});

					const signInResult = await signIn(email);

					switch (signInResult.userStatus) {
						case UserStatus.NEW:
							setOpenRegisterModal(true);
							break;
						case UserStatus.EXISTING:
							setUserData(signInResult.userData);
							setLastSignInCheck(0);

							break;
						default:
							console.error("Unknown user status", signInResult.userStatus);
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
			})(),
		[setUserData, setLastSignInCheck, setOpenRegisterModal],
	);

	return (
		<AuthContext.Provider
			value={{
				userData,
				setUserData,
				setLastSignInCheck,
				signInClientSide,
			}}
		>
			<RegisterModal
				key={openRegisterModal.toString()}
				open={openRegisterModal}
				setOpen={setOpenRegisterModal}
				signInData={signInData}
			/>

			<SessionExpiredModal
				open={openSessionExpiredModal}
				setOpen={setOpenSessionExpiredModal}
			/>
			{children}
		</AuthContext.Provider>
	);
};
