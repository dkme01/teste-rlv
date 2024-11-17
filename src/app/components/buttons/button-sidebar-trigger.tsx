"use client";

import {Button} from "@/components/ui/button";
import {Menu} from "@/app/assets";
import {useSidebar} from "@/components/ui/sidebar";

const ButtonSidebarTrigger = () => {
	const {toggleSidebar} = useSidebar();
	
	return (
		<Button variant="secondary" className="rounded-sm text-neutral-900" size="icon" onClick={toggleSidebar}>
			<Menu size="24" strokeWidth="2"/>
		</Button>
	);
};

export default ButtonSidebarTrigger;