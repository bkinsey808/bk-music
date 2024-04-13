"use server";

export interface DashboardProps {
	params: {
		tuning: string;
		keyScale: string;
		chord: string;
		position: string;
	};
	searchParams: {
		focus?: string;
		o?: string;
	};
}

export const getDashboardUrl = (dashboardProps: DashboardProps) => {
	const searchParamsString = new URLSearchParams(
		dashboardProps.searchParams,
	).toString();

	const { tuning, keyScale, chord, position } = dashboardProps.params;

	return `/d/${tuning}/${keyScale}/${chord}/${position}?${searchParamsString}`;
};
