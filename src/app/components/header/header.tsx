import {EPaperHorizontal, LayoutGrid} from "@/app/assets";
import {Separator} from "@/components/ui/separator";
import * as React from "react";
import Image from "next/image";
import ButtonSidebarTrigger from "@/app/components/buttons/button-sidebar-trigger";

const Header = () => {
	return (
		<header className="flex fixed w-full bg-neutral-50 z-40 h-16 shrink-0 items-center gap-2 border-b px-4">
			<ButtonSidebarTrigger/>
			<Image src={EPaperHorizontal} alt="Logo" width="121" height='12'/>
			<Separator orientation="vertical" className="mr-2 h-8"/>
			<div className="flex items-center gap-2">
				<LayoutGrid size="24"/>
				Soluções
			</div>
		
		</header>
	);
};

export default Header;