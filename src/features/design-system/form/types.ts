export type FormValues<FieldKey extends string = string> = Record<
	FieldKey,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any
>;

export type FormErrors<FieldKey extends string = string> = {
	formError?: string;
	fieldErrors?: Record<FieldKey, string>;
};
