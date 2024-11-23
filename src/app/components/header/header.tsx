import { EPaperHorizontal, LayoutGrid } from "@/app/assets";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import Image from "next/image";
import ButtonSidebarTrigger from "@/app/components/buttons/button-sidebar-trigger";
import Link from "next/link";

const Header = () => {
	return (
		<header className="flex fixed top-0 w-full bg-neutral-50 z-[50] h-16 shrink-0 items-center gap-2 border-b px-4">
			<ButtonSidebarTrigger />
			<Link href="/">
				<Image src={EPaperHorizontal} alt="Logo" width="121" height='12' />
			</Link>
			<Separator orientation="vertical" className="mr-2 h-8" />
			<div className="flex items-center gap-2">
				<LayoutGrid size="24" />
				<p className="hidden sm:block">
					Soluções
				</p>
			</div>
		</header>
	);
};

export default Header;
