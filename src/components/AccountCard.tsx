import React from "react";
import { MercerLogo } from "./MercerLogo";
import { ArrowRight } from "lucide-react";

interface AccountCardProps {
	type: "current" | "savings" | "pension";
	accountName: string;
	subtitle: string;
	balance: React.ReactNode;
	onClick: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
	type,
	accountName,
	subtitle,
	balance,
	onClick,
}) => {
	const getBackgroundColor = () => {
		switch (type) {
			case "current":
				// return "bg-[#0066FF]";
				return "bg-[#E4B33D]";
			case "savings":
				// return "bg-[#641EE0]";
				return "bg-[#A488F5]";
			case "pension":
				// return "bg-[#0B3F2D]";
				return "bg-[rgba(33,30,30,1)]";
			default:
				return "bg-gray-500";
		}
	};

	const getTextColor = () => {
		// return type === "pension" ? "text-white" : "text-white";
		return type === "pension" ? "text-white" : "text-[#211E1E]";
	};

	const getPaddingClass = () => {
		if (type === "pension" || type === "savings") {
			return "p-4 pb-[40px]";
		}
		return "p-4";
	};

	const getZIndex = () => {
		switch (type) {
			case "pension":
				return "z-10";
			case "savings":
				return "z-20";
			case "current":
				return "z-30";
			default:
				return "z-0";
		}
	};

	return (
		<article
			onClick={onClick}
			onKeyPress={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
			role="button"
			tabIndex={0}
			className={`account-card w-full ${getBackgroundColor()} ${getPaddingClass()} ${getZIndex()} rounded-[9px] cursor-pointer transition-opacity relative will-change-[transform,opacity]`}
		>
			<div className="flex justify-between items-center">
				<div className="">
          <div className="mb-2.5">
					<MercerLogo
						className={getTextColor()}
						style={{ color: "#FFFFFF" }}
						// style={{ color: type === "pension" ? "#FFFFFF" : "#211E1E" }}
            />
          </div>
					<h2
						className={`${getTextColor()} text-[18px] font-normal leading-tight`}
					>
						{accountName}
					</h2>
					<p className={`${getTextColor()} text-sm mt-1 leading-tight`}>
						{subtitle}
					</p>
				</div>

				<div>
					<div
						className={`text-[20px] ${getTextColor()} font-normal leading-none tracking-[0.55px]`}
					>
						{balance}
					</div>
				</div>
			</div>

			{/* Bottom section: Only for Current Account */}
			{type === "current" && (
				<div className="flex justify-between items-center mt-3 pt-3">
					<button
						className="flex items-center gap-2 bg-black rounded-full px-4 py-2.5"
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M2.64652 5.35414C2.60003 5.30771 2.56315 5.25256 2.53799 5.19186C2.51283 5.13116 2.49988 5.0661 2.49988 5.00039C2.49988 4.93469 2.51283 4.86962 2.53799 4.80892C2.56315 4.74822 2.60003 4.69308 2.64652 4.64664L4.64652 2.64664C4.71645 2.57664 4.80558 2.52895 4.90262 2.50963C4.99966 2.4903 5.10026 2.50021 5.19167 2.53808C5.28308 2.57596 5.3612 2.64011 5.41613 2.7224C5.47107 2.8047 5.50035 2.90145 5.50027 3.00039V4.50039H13.0003C13.1329 4.50039 13.2601 4.55307 13.3538 4.64684C13.4476 4.74061 13.5003 4.86779 13.5003 5.00039C13.5003 5.133 13.4476 5.26018 13.3538 5.35395C13.2601 5.44772 13.1329 5.50039 13.0003 5.50039H5.50027V7.00039C5.50035 7.09934 5.47107 7.19609 5.41613 7.27838C5.3612 7.36068 5.28308 7.42483 5.19167 7.4627C5.10026 7.50058 4.99966 7.51048 4.90262 7.49116C4.80558 7.47183 4.71645 7.42415 4.64652 7.35414L2.64652 5.35414ZM13.354 10.6466L11.354 8.64664C11.2841 8.57664 11.195 8.52895 11.0979 8.50963C11.0009 8.4903 10.9003 8.50021 10.8089 8.53808C10.7175 8.57596 10.6393 8.64011 10.5844 8.7224C10.5295 8.8047 10.5002 8.90145 10.5003 9.00039V10.5004H3.00027C2.86766 10.5004 2.74049 10.5531 2.64672 10.6468C2.55295 10.7406 2.50027 10.8678 2.50027 11.0004C2.50027 11.133 2.55295 11.2602 2.64672 11.3539C2.74049 11.4477 2.86766 11.5004 3.00027 11.5004H10.5003V13.0004C10.5002 13.0993 10.5295 13.1961 10.5844 13.2784C10.6393 13.3607 10.7175 13.4248 10.8089 13.4627C10.9003 13.5006 11.0009 13.5105 11.0979 13.4912C11.195 13.4718 11.2841 13.4241 11.354 13.3541L13.354 11.3541C13.4005 11.3077 13.4374 11.2526 13.4626 11.1919C13.4877 11.1312 13.5007 11.0661 13.5007 11.0004C13.5007 10.9347 13.4877 10.8696 13.4626 10.8089C13.4374 10.7482 13.4005 10.6931 13.354 10.6466Z" fill="white"/>
						</svg>
						<span className="text-sm text-white font-normal">Move funds</span>
					</button>
					<div className="flex items-center gap-2">
						<span className="text-sm text-black font-normal">See more</span>
						<button
							className="w-10 h-10 bg-black flex items-center justify-center rounded-full"
							onClick={(e) => {
								e.stopPropagation();
								onClick();
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<path
									d="M15.9375 5V13.125C15.9375 13.3736 15.8387 13.6121 15.6629 13.7879C15.4871 13.9637 15.2486 14.0625 15 14.0625C14.7513 14.0625 14.5129 13.9637 14.3371 13.7879C14.1612 13.6121 14.0625 13.3736 14.0625 13.125V7.26562L5.66325 15.6633C5.48713 15.8394 5.24826 15.9383 4.99918 15.9383C4.75011 15.9383 4.51124 15.8394 4.33512 15.6633C4.159 15.4872 4.06006 15.2483 4.06006 14.9992C4.06006 14.7501 4.159 14.5113 4.33512 14.3352L12.7343 5.9375H6.87497C6.62633 5.9375 6.38787 5.83873 6.21205 5.66291C6.03624 5.4871 5.93747 5.24864 5.93747 5C5.93747 4.75136 6.03624 4.5129 6.21205 4.33709C6.38787 4.16127 6.62633 4.0625 6.87497 4.0625H15C15.2486 4.0625 15.4871 4.16127 15.6629 4.33709C15.8387 4.5129 15.9375 4.75136 15.9375 5Z"
									fill="white"
								/>
							</svg>
						</button>
					</div>
				</div>
			)}
		</article>
	);
};
