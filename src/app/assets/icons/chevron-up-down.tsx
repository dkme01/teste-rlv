import {IconProps} from "@/app/assets/icons/types";

const ChevronUpDown = ({size, strokeWidth}: IconProps) => {
	return (
		<svg width={!!size ? size : "32"} height={!!size ? size : "32"} viewBox="0 0 32 32" fill="none"
		     xmlns="http://www.w3.org/2000/svg">
			<path d="M9.33337 20L16 26.6667L22.6667 20M9.33337 12L16 5.33334L22.6667 12" stroke="#191E29"
			      strokeWidth={!!strokeWidth ? strokeWidth : "2"} strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};

export default ChevronUpDown;
