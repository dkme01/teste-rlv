import {IconProps} from "@/app/assets/icons/types";

const FileX = ({size, strokeWidth, color}: IconProps) => {
	return (
		<svg width={!!size ? size : "32"} height={!!size ? size : "32"} viewBox="0 0 32 32" fill="none"
		     xmlns="http://www.w3.org/2000/svg">
			<path
				d="M18.6666 2.66666V10.6667H26.6666M12.6666 16.6667L19.3333 23.3333M19.3333 16.6667L12.6666 23.3333M19.3333 2.66666H7.99998C7.29274 2.66666 6.61446 2.94762 6.11436 3.44771C5.61426 3.94781 5.33331 4.62609 5.33331 5.33333V26.6667C5.33331 27.3739 5.61426 28.0522 6.11436 28.5523C6.61446 29.0524 7.29274 29.3333 7.99998 29.3333H24C24.7072 29.3333 25.3855 29.0524 25.8856 28.5523C26.3857 28.0522 26.6666 27.3739 26.6666 26.6667V10L19.3333 2.66666Z"
				stroke={!!color ? color : "#191E29"} strokeWidth={!!strokeWidth ? strokeWidth : "2"} strokeLinecap="round"
				strokeLinejoin="round"/>
		</svg>
	
	);
};

export default FileX;