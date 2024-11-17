import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/header";
import {AppSidebar} from "@/app/components/sidebar/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import * as React from "react";
import {cn} from "@/lib/utils";

const roboto = Roboto({
	weight: ['400', '700'],
	style: ['normal'],
	variable: "--font-sans",
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: "e-paper",
	description: "",
};

export default function RootLayout({
	                                   children,
                                   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="br">
		<body
			className={cn(`${roboto.className} antialiased`)}
		>
		<SidebarProvider>
			<Header/>
			<AppSidebar
			/>
			<SidebarInset>
				<div className="flex flex-1 pt-20 flex-col gap-4 p-4">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
		</body>
		</html>
	);
}
