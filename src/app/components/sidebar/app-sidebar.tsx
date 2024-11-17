"use client"

import * as React from "react"

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {FileText} from "@/app/assets";
import {usePathname} from "next/navigation";

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	
	return (
		<Sidebar {...props}>
			<SidebarContent className="pt-20">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton className="" asChild isActive={pathname === '/documents'}>
									<Link
										aria-label="Link para á página de documentos"
										href='/documents'
									>
										<FileText/>
										Documentos
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail/>
		</Sidebar>
	)
}
