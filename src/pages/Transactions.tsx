import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Search,
	SlidersHorizontal,
	ArrowDown,
	ArrowUp,
	ArrowRightLeft,
} from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AccountType, useAccounts, CURRENCY_INFO } from "@/contexts/AccountContext";
import { useTransactionCardsStagger } from "@/hooks/useTransactionCardsStagger";

const Transactions: React.FC = () => {
	const [selectedAccount, setSelectedAccount] =
		useState<AccountType>("currentAccount");
	const { transactions } = useAccounts();
	const navigate = useNavigate();

	const containerRef = useRef<HTMLDivElement>(null);
	useTransactionCardsStagger(containerRef, selectedAccount);

	const accountLabels: Record<AccountType, string> = {
		currentAccount: "Current account",
		savings: "Savings",
		pension: "Pension",
	};

	const accountColors: Record<AccountType, string> = {
		pension: "#211E1E",
		savings: "#A488F5",
		currentAccount: "#E4B33D",
	};

	const filteredTransactions = transactions
		.filter((t) => t.account === selectedAccount)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const formatDate = (date: Date) => {
		const day = date.getDate().toString().padStart(2, "0");
		const month = date.toLocaleString("en-GB", { month: "short" });
		const year = date.getFullYear();
		const time = date.toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
		return `${day} ${month} ${year}, ${time}`;
	};

	const ExchangeArrowsIcon: React.FC<{ className?: string }> = ({ className }) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none" className={className}>
			<path d="M17.2258 10.9001C17.3132 10.9872 17.3825 11.0907 17.4298 11.2046C17.4772 11.3186 17.5015 11.4407 17.5015 11.5641C17.5015 11.6875 17.4772 11.8097 17.4298 11.9236C17.3825 12.0376 17.3132 12.1411 17.2258 12.2282L15.3508 14.1032C15.1747 14.2793 14.9358 14.3783 14.6867 14.3783C14.4376 14.3783 14.1988 14.2793 14.0227 14.1032C13.8465 13.9271 13.7476 13.6882 13.7476 13.4391C13.7476 13.1901 13.8465 12.9512 14.0227 12.7751L14.2969 12.5008H11.5625C11.4135 12.501 11.2666 12.4657 11.134 12.3977C11.0014 12.3298 10.8869 12.2312 10.8 12.1102L4.82969 3.75085H0.9375C0.68886 3.75085 0.450403 3.65207 0.274587 3.47626C0.0987721 3.30044 0 3.06199 0 2.81335C0 2.5647 0.0987721 2.32625 0.274587 2.15043C0.450403 1.97462 0.68886 1.87585 0.9375 1.87585H5.3125C5.46149 1.87568 5.60838 1.91103 5.74098 1.97896C5.87359 2.0469 5.98809 2.14545 6.075 2.26647L12.0453 10.6258H14.2969L14.0219 10.3516C13.8458 10.1755 13.7468 9.93664 13.7468 9.68756C13.7468 9.43849 13.8458 9.19962 14.0219 9.0235C14.198 8.84738 14.4369 8.74844 14.6859 8.74844C14.935 8.74844 15.1739 8.84738 15.35 9.0235L17.2258 10.9001ZM7.0625 9.11335C6.96232 9.04178 6.84902 8.99065 6.72908 8.96288C6.60913 8.9351 6.48489 8.93123 6.36345 8.95147C6.24201 8.97171 6.12574 9.01567 6.02129 9.08084C5.91684 9.14602 5.82625 9.23113 5.75469 9.33131L4.82969 10.6258H0.9375C0.68886 10.6258 0.450403 10.7246 0.274587 10.9004C0.0987721 11.0762 0 11.3147 0 11.5633C0 11.812 0.0987721 12.0504 0.274587 12.2263C0.450403 12.4021 0.68886 12.5008 0.9375 12.5008H5.3125C5.46149 12.501 5.60838 12.4657 5.74098 12.3977C5.87359 12.3298 5.98809 12.2312 6.075 12.1102L7.28047 10.4235C7.3524 10.3232 7.40382 10.2098 7.4318 10.0896C7.45978 9.96941 7.46376 9.84489 7.4435 9.72317C7.42325 9.60145 7.37917 9.48492 7.31379 9.38028C7.24841 9.27563 7.16302 9.18492 7.0625 9.11335ZM9.8125 5.26335C9.91268 5.33491 10.026 5.38604 10.1459 5.41381C10.2659 5.44159 10.3901 5.44547 10.5116 5.42523C10.633 5.40499 10.7493 5.36102 10.8537 5.29585C10.9582 5.23067 11.0488 5.14556 11.1203 5.04538L12.0453 3.75085H14.2969L14.0219 4.02506C13.8458 4.20118 13.7468 4.44005 13.7468 4.68913C13.7468 4.9382 13.8458 5.17707 14.0219 5.35319C14.198 5.52931 14.4369 5.62825 14.6859 5.62825C14.935 5.62825 15.1739 5.52931 15.35 5.35319L17.225 3.47819C17.3124 3.39109 17.3817 3.2876 17.4291 3.17364C17.4764 3.05969 17.5007 2.93751 17.5007 2.81413C17.5007 2.69074 17.4764 2.56856 17.4291 2.45461C17.3817 2.34065 17.3124 2.23716 17.225 2.15006L15.35 0.275064C15.1739 0.0989432 14.935 -5.24879e-09 14.6859 0C14.4369 5.2488e-09 14.198 0.0989435 14.0219 0.275064C13.8458 0.451184 13.7468 0.690054 13.7468 0.939126C13.7468 1.1882 13.8458 1.42707 14.0219 1.60319L14.2969 1.87585H11.5625C11.4135 1.87568 11.2666 1.91103 11.134 1.97896C11.0014 2.0469 10.8869 2.14545 10.8 2.26647L9.59453 3.95397C9.52273 4.05421 9.4714 4.16762 9.44349 4.28772C9.41558 4.40782 9.41163 4.53225 9.43188 4.65388C9.45213 4.7755 9.49617 4.89194 9.56148 4.99652C9.62679 5.10111 9.7121 5.19178 9.8125 5.26335Z" fill="currentColor"/>
		</svg>
	);

	const getTransactionIcon = (type: string) => {
		switch (type) {
			case "withdrawal":
				return <ArrowDown className="w-5 h-5 text-[#211E1E] dark:text-white" />;
			case "topup":
				return <ArrowUp className="w-5 h-5 text-[#211E1E] dark:text-white" />;
			case "transfer":
				return (
					<ArrowRightLeft className="w-5 h-5 text-[#211E1E] dark:text-white" />
				);
			case "exchange":
				return <ExchangeArrowsIcon className="text-[#211E1E] dark:text-white" />;
			default:
				return null;
		}
	};

	const getTransactionLabel = (type: string) => {
		switch (type) {
			case "withdrawal":
				return "Withdrawal";
			case "topup":
				return "Top up";
			case "transfer":
				return "Transfer";
			default:
				return "";
		}
	};

	return (
		<div className="items-stretch flex max-w-[480px] w-full flex-col overflow-hidden bg-[#F3F3F3] dark:bg-black mx-auto min-h-screen pb-20">
			{/* Status Bar */}
			<div className="px-4 pt-6 pb-6">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-[28px] font-normal">Transactions</h1>
					<div className="flex gap-3">
						<button className="w-12 h-12 rounded-full bg-white dark:bg-[#1C1C1E] flex items-center justify-center">
							<Search className="w-5 h-5" />
						</button>
						<button className="w-12 h-12 rounded-full bg-white dark:bg-[#1C1C1E] flex items-center justify-center">
							<SlidersHorizontal className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Account Filter Tabs */}
				<div className="pb-6 flex gap-2">
					{(Object.keys(accountLabels) as AccountType[]).map((account) => (
						<button
							key={account}
							onClick={() => setSelectedAccount(account)}
							className={`px-4 py-2 rounded-lg text-base font-normal transition-colors ${
								selectedAccount === account
									? account === "pension"
										? "text-white dark:!bg-white dark:!text-black"
										: "text-white"
									: "bg-white dark:bg-[#1C1C1E] text-foreground"
							}`}
							style={
								selectedAccount === account && account !== "pension"
									? { backgroundColor: accountColors[account] }
									: selectedAccount === account && account === "pension"
									? { backgroundColor: accountColors[account] }
									: undefined
							}
						>
							{accountLabels[account]}
						</button>
					))}
				</div>

				{/* Transactions List */}
				<div className="" ref={containerRef}>
					{filteredTransactions.map((transaction) => (
						<div
							key={transaction.id}
							className="flex items-center gap-4 py-[12px] border-b border-[#E5E5EA] dark:border-[#2C2C2E] cursor-pointer hover:bg-[#E5E5EA] dark:hover:bg-[#1C1C1E]/30 transition-colors transaction-item"
							onClick={() => {
								/* Could navigate to transaction detail */
							}}
						>
							<div className="w-12 h-12 rounded-lg bg-white dark:bg-[#2C2C2E] flex items-center justify-center flex-shrink-0">
								{getTransactionIcon(transaction.type)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-xl font-normal text-foreground">
									{transaction.type === 'exchange' && transaction.fromCurrency && transaction.toCurrency ? (
										<span className="inline-flex items-center gap-1.5">
											{transaction.fromCurrency} <ExchangeArrowsIcon className="text-[#716860] inline-block" /> {transaction.toCurrency}
										</span>
									) : getTransactionLabel(transaction.type)}
								</div>
								<div className="text-[#8E8E93] text-base">
									{formatDate(transaction.date)}
								</div>
							</div>
							{transaction.type === 'exchange' && transaction.fromCurrency && transaction.toCurrency ? (
								<div className="text-right">
									<div className="text-foreground text-lg font-normal">
										- {CURRENCY_INFO[transaction.fromCurrency]?.symbol}{' '}
										{(transaction.fromAmount || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
									</div>
									<div className="text-[#34C759] text-sm font-normal">
										+ {transaction.toCurrency}{' '}
										{(transaction.toAmount || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
									</div>
								</div>
							) : (
								<div
									className={`text-xl font-normal ${
										transaction.amount >= 0 ? "text-[#34C759]" : "text-foreground"
									}`}
								>
									{transaction.amount >= 0 ? "+ " : "- "}£{" "}
									{Math.abs(transaction.amount).toFixed(2)}
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<BottomNavigation />
		</div>
	);
};

export default Transactions;
