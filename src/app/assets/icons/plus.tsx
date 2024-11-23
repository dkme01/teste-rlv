import {IconProps} from "@/app/assets/icons/types";

const Plus = ({size, strokeWidth, color}: IconProps) => {
	return (
		<svg width={!!size ? size : "32"} height={!!size ? size : "32"} viewBox="0 0 32 32" fill="none"
		     xmlns="http://www.w3.org/2000/svg">
			<path d="M6.66666 16H25.3333M16 6.66666V25.3333" stroke={color ? color : "#191E29"}
			      strokeWidth={!!strokeWidth ? strokeWidth : "2"}
			      strokeLinecap="round"
			      strokeLinejoin="round"/>
		</svg>
	);
};

export default Plus;