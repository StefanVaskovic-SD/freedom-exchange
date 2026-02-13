import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, AlertTriangle, TrendingDown, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SavingsWarning: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { amount, sourceAccount, destinationAccount, currency } =
		location.state || {};

	const handleBack = () => {
		navigate("/review-transfer", {
			state: {
				amount,
				sourceAccount,
				destinationAccount,
				currency,
			},
		});
	};

	const handleContinue = () => {
		navigate("/pin-confirmation", {
			state: {
				amount,
				sourceAccount,
				destinationAccount,
				currency,
			},
		});
	};

	return (
		<div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col">
			<div className="px-4 py-6 flex flex-col flex-1">
				{/* Header */}
				<header className="flex items-center mb-8">
					<button
						onClick={handleBack}
						className="w-12 h-12 rounded-full bg-white dark:bg-[#211E1E] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#2a2626] transition-colors text-foreground"
						aria-label="Go back"
					>
						<ArrowLeft className="w-6 h-6" />
					</button>
				</header>

				{/* Warning Icon */}
				<div className="flex justify-center mb-6">
						<div className="w-20 h-20 bg-[#A488F5] rounded-lg flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
							>
								<path
									d="M20 3.75C16.7861 3.75 13.6443 4.70305 10.972 6.48862C8.29969 8.27419 6.21689 10.8121 4.98696 13.7814C3.75704 16.7507 3.43524 20.018 4.06225 23.1702C4.68926 26.3224 6.23692 29.2179 8.50952 31.4905C10.7821 33.7631 13.6776 35.3107 16.8298 35.9378C19.982 36.5648 23.2493 36.243 26.2186 35.013C29.1879 33.7831 31.7258 31.7003 33.5114 29.028C35.297 26.3557 36.25 23.2139 36.25 20C36.2455 15.6916 34.5319 11.561 31.4855 8.51454C28.439 5.46806 24.3084 3.75455 20 3.75ZM19.375 11.25C19.7458 11.25 20.1084 11.36 20.4167 11.566C20.725 11.772 20.9654 12.0649 21.1073 12.4075C21.2492 12.7501 21.2863 13.1271 21.214 13.4908C21.1416 13.8545 20.9631 14.1886 20.7008 14.4508C20.4386 14.713 20.1045 14.8916 19.7408 14.964C19.3771 15.0363 19.0001 14.9992 18.6575 14.8573C18.3149 14.7154 18.022 14.475 17.816 14.1667C17.61 13.8584 17.5 13.4958 17.5 13.125C17.5 12.6277 17.6976 12.1508 18.0492 11.7992C18.4008 11.4475 18.8777 11.25 19.375 11.25ZM21.25 28.75C20.587 28.75 19.9511 28.4866 19.4822 28.0178C19.0134 27.5489 18.75 26.913 18.75 26.25V20C18.4185 20 18.1005 19.8683 17.8661 19.6339C17.6317 19.3995 17.5 19.0815 17.5 18.75C17.5 18.4185 17.6317 18.1005 17.8661 17.8661C18.1005 17.6317 18.4185 17.5 18.75 17.5C19.413 17.5 20.0489 17.7634 20.5178 18.2322C20.9866 18.7011 21.25 19.337 21.25 20V26.25C21.5815 26.25 21.8995 26.3817 22.1339 26.6161C22.3683 26.8505 22.5 27.1685 22.5 27.5C22.5 27.8315 22.3683 28.1495 22.1339 28.3839C21.8995 28.6183 21.5815 28.75 21.25 28.75Z"
									fill="white"
								/>
							</svg>
						</div>
				</div>

				{/* Main Heading */}
				<h2 className="text-2xl font-normal text-center mb-6 leading-tight">
					Moving from Savings to
					<br />
					Current account
				</h2>

				{/* Important Information Section */}
				<div className="">
					<h3 className="text-base font-normal text-center text-[#716860]">
						You're moving £2,500 from your high-
            <br />
            interest savings to your spending account.
					</h3>

          <div className="w-full h-px mt-8 mb-8" style={{ background: 'rgba(33, 30, 30, 0.15)' }}/>

					<div className="space-y-4 mb-6">
						{/* Item 1 */}
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 flex-shrink-0">
								<TrendingDown className="w-8 h-8 text-[#A488F5]" />
							</div>
							<p className="text-xl pt-1">
								You'll stop earning 4.2% interest on this amount once
								transferred.
							</p>
						</div>
					</div>

          <button
            onClick={() => navigate("/learn/2")}
						className="w-auto inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-md bg-[#211E1E] hover:bg-[#211E1E]/80 transition-colors text-white"
					>
						<span className="text-lg">Learn more about this topic</span>
						<ExternalLink className="w-4 h-4" />
					</button>
				</div>

				{/* Bottom Actions */}
				<div className="space-y-4 pt-4">
					{/* Continue Button */}
					<Button
						onClick={handleContinue}
						className="w-full h-14 bg-[#A488F5] hover:bg-[#9575e8] text-white font-normal text-xl rounded-lg"
					>
						Submit request
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SavingsWarning;
