export interface DashboardProps {
	params: {
		tuning: string;
		keyScale: string;
		chord: string;
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

	const { tuning, keyScale, chord } = dashboardProps.params;

	return `/d/${tuning}/${keyScale}/${chord}?${searchParamsString}`;
};
