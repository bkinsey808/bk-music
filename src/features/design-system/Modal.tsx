import {
	DialogHTMLAttributes,
	ReactNode,
	forwardRef,
	useEffect,
	useRef,
} from "react";

import { cn } from "@/lib/utils";

type ModalProps = DialogHTMLAttributes<HTMLDialogElement> & {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	heading?: string;
};

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
	(
		{ open, setOpen, className, heading, children, ...dialogProps },
		forwardedRef,
	) => {
		/** @see https://stackoverflow.com/questions/66067697/cannot-assign-to-read-only-property-current-in-react-useref#71574359 */
		const mutableDialogRef = useRef<HTMLDialogElement | null>(null);

		// open/close the dialog when the open prop changes
		useEffect(() => {
			if (open) {
				mutableDialogRef.current?.showModal();
			} else {
				mutableDialogRef.current?.close();
			}
		}, [open]);

		// keep state in sync with dialog open state
		useEffect(() => {
			const dialog = mutableDialogRef.current;
			dialog?.addEventListener("close", () => {
				setOpen(false);
			});
			return () => {
				dialog?.removeEventListener("close", () => {
					setOpen(false);
				});
			};
		}, [setOpen]);
		const dialog = mutableDialogRef.current;

		// clicking outside the dialog should close the dialog
		useEffect(() => {
			if (!dialog) {
				return;
			}
			const handleClick = (event: MouseEvent) => {
				const rect = dialog.getBoundingClientRect();
				const isInDialog =
					rect.top <= event.clientY &&
					event.clientY <= rect.top + rect.height &&
					rect.left <= event.clientX &&
					event.clientX <= rect.left + rect.width;

				if (!isInDialog) {
					setOpen(false);
				}
			};
			document.addEventListener("click", handleClick);
			return () => {
				document.removeEventListener("click", handleClick);
			};
		}, [setOpen, dialog]);

		return (
			<dialog
				className={cn(
					"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
					className,
				)}
				ref={(element) => {
					mutableDialogRef.current = element;
					if (forwardedRef) {
						if (typeof forwardedRef === "function") {
							forwardedRef(element);
						} else {
							forwardedRef.current = element;
						}
					}
				}}
				{...dialogProps}
			>
				{heading ? (
					<header className="p-[1rem]">
						<h2>{heading}</h2>
					</header>
				) : null}
				{children}
			</dialog>
		);
	},
);

Modal.displayName = "Modal";

export const ModalContent = ({ children }: { children: ReactNode }) => {
	return (
		<div className="h-full overflow-auto">
			<section className="p-[1rem]">{children}</section>
		</div>
	);
};

export const ModalFooter = ({ children }: { children: ReactNode }) => {
	return <footer className="p-[1rem]">{children}</footer>;
};
