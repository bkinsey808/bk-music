"use client";

import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";

import { useInterval } from "../global/useInterval";
import { DeleteAccountConfirmModal } from "./DeleteAccountConfirmModal";
import { ManageAccountModal } from "./ManageAccountModal";
import { RegisterModal } from "./RegisterModal";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { SESSION_POLLING_INTERVAL_SECONDS } from "./consts";
import { AuthModal, DeleteAccountResult, UserStatus } from "./enums";
import { SignInData, UserData } from "./types";
import { checkSignIn } from "@/actions/checkSignIn";
import { deleteAccount } from "@/actions/deleteAccount";
import { signIn } from "@/actions/signIn";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext<{
	userData?: UserData | undefined;
	setUserData: Dispatch<SetStateAction<UserData | undefined>>;
	setLastSignInCheck: Dispatch<SetStateAction<number>>;
	signInClientSide: () => void;
	deleteAccountClientSide: () => void;
	openAuthModal: AuthModal | undefined;
	setOpenAuthModal: Dispatch<SetStateAction<AuthModal | undefined>>;
	deleteAccountError?: string | undefined;
	deletingAccount: boolean;
}>({
	userData: undefined,
	setUserData: () => undefined,
	setLastSignInCheck: () => 0,
	signInClientSide: () => undefined,
	deleteAccountClientSide: () => undefined,
	openAuthModal: undefined,
	setOpenAuthModal: () => undefined,
	deleteAccountError: undefined,
	deletingAccount: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<UserData>();
	const [lastSignInCheck, setLastSignInCheck] = useState(0);
	const [openAuthModal, setOpenAuthModal] = useState<AuthModal>();
	const [signInData, setSignInData] = useState<SignInData>();
	const [deleteAccountError, setDeleteAccountError] = useState<string>();
	const [deletingAccount, setDeletingAccount] = useState(false);

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
			setOpenAuthModal(AuthModal.SESSION_EXPIRED);
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
							setOpenAuthModal(AuthModal.REGISTER);
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
		[setUserData, setLastSignInCheck, setOpenAuthModal],
	);

	const deleteAccountClientSide = useCallback(
		() =>
			void (async () => {
				try {
					setDeletingAccount(true);
					const deleteAccountResult = await deleteAccount();

					switch (deleteAccountResult) {
						case DeleteAccountResult.SUCCESS:
							setUserData(undefined);
							setLastSignInCheck(0);
							setDeletingAccount(false);
							setOpenAuthModal(undefined);
							return;
						case DeleteAccountResult.ERROR:
							setDeletingAccount(false);
							setDeleteAccountError("Error deleting account");
							return;
					}
				} catch (error) {
					console.error({ error });
				}
				setDeleteAccountError("Unknown delete account result");
			})(),
		[setUserData, setLastSignInCheck],
	);

	const handleRefresh = useCallback(async () => {
		const checkSignInResult = await checkSignIn();

		if (checkSignInResult) {
			setUserData(checkSignInResult);
			setLastSignInCheck(Date.now());
		}
	}, []);

	useEffect(() => {
		void handleRefresh();
	}, [handleRefresh]);

	return (
		<AuthContext.Provider
			value={{
				userData,
				setUserData,
				setLastSignInCheck,
				signInClientSide,
				deleteAccountClientSide,
				openAuthModal,
				setOpenAuthModal,
				deleteAccountError,
				deletingAccount,
			}}
		>
			<RegisterModal
				key={`register-modal-${(openAuthModal === AuthModal.REGISTER).toString()}`}
				signInData={signInData}
			/>

			<SessionExpiredModal />

			<ManageAccountModal />

			<DeleteAccountConfirmModal
				key={`delete-account-${deletingAccount.toString()}`}
			/>

			{children}
		</AuthContext.Provider>
	);
};
