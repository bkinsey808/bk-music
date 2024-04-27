"use client";

import { Suspense } from "react";

import {
	dashboardInitialPath,
	dashboardParamKeys,
	dashboardSchemaOption,
	dashboardStateKeys,
	dashboardStateReducer,
} from "./useDashboardState";
import { AppStateProvider } from "@/features/app-state/useAppState";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Suspense>
			<AppStateProvider
				initialPath={dashboardInitialPath}
				appSchemaOption={dashboardSchemaOption}
				appStateKeys={dashboardStateKeys}
				appParamKeys={dashboardParamKeys}
				appStateReducer={dashboardStateReducer}
			>
				{children}
			</AppStateProvider>
		</Suspense>
	);
}