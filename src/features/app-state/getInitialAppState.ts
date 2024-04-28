import { decompressFromEncodedURIComponent } from "lz-string";
import { useParams, useSearchParams } from "next/navigation";

export const getInitialAppState = <AppState>({
	searchParams,
	appStateKeys: appStateKeyArray,
	appSchemaOption,
}: {
	params: ReturnType<typeof useParams>;
	searchParams: ReturnType<typeof useSearchParams>;
	appStateKeys: (keyof AppState)[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	appSchemaOption: Record<keyof AppState, any>;
}) => {
	console.log("called");
	const emptyAppState = appStateKeyArray.reduce((acc, key) => {
		const schemaOptionType = appSchemaOption[key];
		const value = schemaOptionType.ast._tag === "TupleType" ? [] : "";

		return { ...acc, [key]: value };
	}, {} as AppState);

	const s = searchParams.get("s");
	if (!s) {
		return emptyAppState;
	}
	try {
		const appState = JSON.parse(
			decompressFromEncodedURIComponent(s),
		) as AppState;
		return { ...emptyAppState, ...appState };
	} catch (e) {
		console.error(e);
	}
	return emptyAppState;
};
