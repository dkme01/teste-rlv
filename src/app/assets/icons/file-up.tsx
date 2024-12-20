import {IconProps} from "@/app/assets/icons/types";

const FileUp = ({size, strokeWidth, color}: IconProps) => {
	return (
		<svg width={!!size ? size : "32"} height={!!size ? size : "32"} viewBox="0 0 32 32" fill="none"
		     xmlns="http://www.w3.org/2000/svg">
			<path
				d="M18.6667 2.66666V10.6667H26.6667M16 16V24M16 16L20 20M16 16L12 20M19.3333 2.66666H7.99999C7.29275 2.66666 6.61447 2.94762 6.11438 3.44771C5.61428 3.94781 5.33333 4.62609 5.33333 5.33333V26.6667C5.33333 27.3739 5.61428 28.0522 6.11438 28.5523C6.61447 29.0524 7.29275 29.3333 7.99999 29.3333H24C24.7072 29.3333 25.3855 29.0524 25.8856 28.5523C26.3857 28.0522 26.6667 27.3739 26.6667 26.6667V10L19.3333 2.66666Z"
				stroke={!!color ? color : "#191E29"} strokeWidth={!!strokeWidth ? strokeWidth : "2"} strokeLinecap="round"
				strokeLinejoin="round"/>
		</svg>
	
	);
};

export default FileUp;