import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/header";
import { AppSidebar } from "@/app/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import * as React from "react";
import { cn } from "@/lib/utils";
import Footer from "./components/footer/footer";

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
				<SidebarProvider defaultOpen={false}>
					<Header />
					<AppSidebar collapsible='icon' />
					<SidebarInset className="flex overflow-x-auto flex-col h-screen w-full m-auto relative">
						<div className="relative flex flex-1 pt-20 flex-col gap-4 p-4">
							{children}
							<Footer />
						</div>
					</SidebarInset>
				</SidebarProvider>
			</body>
		</html>
	);
}
