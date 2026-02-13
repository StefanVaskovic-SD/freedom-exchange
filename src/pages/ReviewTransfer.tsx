import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccounts, AccountType } from "@/contexts/AccountContext";

export const ReviewTransfer: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { accounts, transferFunds } = useAccounts();

	const {
		amount,
		sourceAccount,
		destinationAccount,
		currency = "GBP",
	} = location.state as {
		amount: number;
		sourceAccount: AccountType;
		destinationAccount: AccountType;
		currency?: string;
	};

	const source = accounts[sourceAccount];
	const destination = accounts[destinationAccount];

	const newSourceBalance = source.balance - amount;
	const newDestinationBalance = destination.balance + amount;

	// Show retirement impact warning only if pension is involved
	const showRetirementWarning = sourceAccount === "pension";
	const retirementImpact = amount * 1.64;

	const handleBack = () => {
		navigate("/move-funds", {
			state: { sourceAccount, destinationAccount },
		});
	};

	const handleMoveFunds = () => {
		// If source account is 'savings', show warning first
		if (sourceAccount === "savings") {
			navigate("/savings-warning", {
				state: {
					amount,
					sourceAccount,
					destinationAccount,
					currency,
				},
			});
		} else {
			// For other accounts, go directly to PIN confirmation
			navigate("/pin-confirmation", {
				state: {
					amount,
					sourceAccount,
					destinationAccount,
					currency,
				},
			});
		}
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
					<h1 className="flex-1 text-center text-lg font-normal pr-12 text-foreground">
						Review transfer
					</h1>
				</header>

				{/* Amount Display */}
				<div className="">
					<p className="text-foreground text-lg mb-2">Amount to move</p>
					<div className="flex items-center justify-between">
						<p className="text-foreground text-4xl font-normal">
							£
							{amount.toLocaleString("en-GB", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</p>
						<div className="flex items-center gap-2">
							<span className="text-2xl">🇬🇧</span>
							<span className="text-foreground text-sm">GBP (£)</span>
						</div>
					</div>
				</div>

        <div className="w-full h-px mt-6 mb-6" style={{ background: 'rgba(33, 30, 30, 0.15)' }}/>

				{/* Transfer Summary Cards */}
				<div className="">
					{/* Move From Card */}
					<div className="mb-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div
									className="w-12 h-12 flex items-center justify-center bg-[#211E1E] dark:bg-[#211E1E] rounded-[4px]"
									style={{ color: source.color }}
								>
									<span className="text-2xl">{source.icon}</span>
								</div>
								<div>
									<p className="text-[#716860] text-base">Move from</p>
									<p className="text-foreground text-xl font-normal">
										{source.name}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-[#716860] text-base">Balance after transfer</p>
								<p className="text-foreground text-xl font-normal">
									£
									{newSourceBalance.toLocaleString("en-GB", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</p>
							</div>
						</div>
					</div>

					{/* Move To Card */}
					<div className="">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div
									className="w-12 h-12 flex items-center justify-center bg-[#211E1E] dark:bg-[#211E1E] rounded-[4px]"
									style={{ color: destination.color }}
								>
									<span className="text-2xl">{destination.icon}</span>
								</div>
								<div>
									<p className="text-[#716860] text-base">Move to</p>
									<p className="text-foreground text-xl font-normal">
										{destination.name}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-[#716860] text-base">Balance after transfer</p>
								<p className="text-foreground text-xl font-normal">
									£
									{newDestinationBalance.toLocaleString("en-GB", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</p>
							</div>
						</div>
					</div>
				</div>

        <div className="w-full h-px mt-6 mb-6" style={{ background: 'rgba(33, 30, 30, 0.15)' }}/>

				{/* Retirement Impact Warning - Only show if pension is involved */}
				{showRetirementWarning && (
					<div className="bg-white dark:bg-[#211E1E] rounded-lg p-4 mb-6">
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0">
								<AlertTriangle className="w-6 h-6 text-[#E4B33D]" />
							</div>
							<div>
								<h3 className="text-foreground text-base font-normal mb-2">
									Retirement impact
								</h3>
								<p className="text-[#716860] text-sm leading-relaxed mb-2">
									Taking £
									{amount.toLocaleString("en-GB", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}{" "}
									now equals £
									{retirementImpact.toLocaleString("en-GB", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}{" "}
									less at retirement due to lost growth
								</p>
								<a
									href="/learn/3"
									className="inline-flex items-center gap-1 text-sm text-foreground underline hover:opacity-70 transition-opacity"
								>
									Learn more
									<ExternalLink className="w-3.5 h-3.5" />
								</a>
							</div>
						</div>
					</div>
				)}

				{/* Move Funds Button */}
				<div className="">
					<Button
						onClick={handleMoveFunds}
						className="w-full h-14 bg-[#A488F5] hover:bg-[#9575e8] text-white font-normal text-xl rounded-lg"
					>
						Move funds
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ReviewTransfer;
