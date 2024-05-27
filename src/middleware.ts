import { NextRequest } from "next/server";

export async function middleware(_request: NextRequest) {
	console.log("middleware called");
	return;
}
