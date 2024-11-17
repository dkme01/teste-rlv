import {IconProps} from "@/app/assets/icons/types";

const LayoutGrid = ({size, strokeWidth}: IconProps) => {
	return (
		<svg width={size ? size : "32"} height={size ? size : "32"} viewBox="0 0 32 32" fill="none"
		     xmlns="http://www.w3.org/2000/svg">
			<path d="M5.33331 16H26.6666M5.33331 8H26.6666M5.33331 24H26.6666" stroke="#191E29"
			      strokeWidth={strokeWidth ? strokeWidth : "2"}
			      strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};

export default LayoutGrid;

