import { compressToEncodedURIComponent } from "lz-string";

export const fromAppStateGetUrl = <
	AppStateType extends Record<string, unknown>,
>({
	appState,
	initialPath,
}: {
	appState: AppStateType;
	initialPath: string;
}): string =>
	`${initialPath}?s=${compressToEncodedURIComponent(JSON.stringify(appState))}`;
