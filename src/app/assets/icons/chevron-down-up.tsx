import {IconProps} from "@/app/assets/icons/types";

const ChevronDownUp = ({size, strokeWidth}: IconProps) => {
	return (
		<svg width={!!size ? size : "32"} height={!!size ? size : "32"} viewBox="0 0 32 32" fill="none"
		     xmlns="http://www.w3.org/2000/svg">
			<path d="M9.33331 26.6667L16 20L22.6666 26.6667M9.33331 5.33334L16 12L22.6666 5.33334" stroke="#191E29"
			      strokeWidth={!!strokeWidth ? strokeWidth : "2"} strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};

export default ChevronDownUp;