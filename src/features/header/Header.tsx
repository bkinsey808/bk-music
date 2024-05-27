import { LoginRegisterButton } from "../auth/LoginRegisterButton";
import "@/features/firebase/firebase";

export const Header = () => {
	return (
		<header className="flex justify-between bg-[var(--color-header-background)] p-[0.5rem] text-[hsl(var(--background))]">
			<h1 className="text-4xl font-bold">Song Share</h1>
			<LoginRegisterButton />
		</header>
	);
};
