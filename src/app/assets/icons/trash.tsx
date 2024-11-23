import {IconProps} from "@/app/assets/icons/types";

const Trash = ({size, strokeWidth}: IconProps) => {
	return (
		<svg width={size ? size : "32"} height={size ? size : "32"} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4 8.00002H28M25.3333 8.00002V26.6667C25.3333 28 24 29.3334 22.6667 29.3334H9.33333C8 29.3334 6.66667 28 6.66667 26.6667V8.00002M10.6667 8.00002V5.33335C10.6667 4.00002 12 2.66669 13.3333 2.66669H18.6667C20 2.66669 21.3333 4.00002 21.3333 5.33335V8.00002"
				stroke="#191E29" strokeWidth={strokeWidth ? strokeWidth : "2"} strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	
	);
};

export default Trash;
