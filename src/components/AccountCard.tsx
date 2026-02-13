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
					<span className="text-base text-black">
						Funds available to spend
					</span>
					<button
						className="flex items-center gap-1 text-sm text-white font-normal"
						onClick={(e) => {
							e.stopPropagation();
							onClick();
						}}
					>
						<div className="w-10 h-10 bg-black flex items-center justify-center rounded-full">
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
						</div>
					</button>
				</div>
			)}
		</article>
	);
};
