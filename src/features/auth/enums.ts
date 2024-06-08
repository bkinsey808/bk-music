export enum RegisterFormFieldKey {
	Username = "username",
	AcceptTermsAndConditions = "acceptTermsAndConditions",
}

export enum MessageKey {
	UsernameRequired = "Username required",
	UsernameMaxLength = "Username must be less than 20 characters",
	UsernameAlphanumeric = "Username must only contain alphanumeric characters",
	TermsAndConditionsRequired = "You must accept the terms and conditions",
}

export const enum UserStatus {
	NEW,
	EXISTING,
}

export enum RegisterResult {
	ERROR = "ERROR",
	SUCCESS = "SUCCESS",
}
