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
import { AccountType, useAccounts } from "@/contexts/AccountContext";
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
									{getTransactionLabel(transaction.type)}
								</div>
								<div className="text-[#8E8E93] text-base">
									{formatDate(transaction.date)}
								</div>
							</div>
							<div
								className={`text-xl font-normal ${
									transaction.amount >= 0 ? "text-[#34C759]" : "text-foreground"
								}`}
							>
								{transaction.amount >= 0 ? "+ " : "- "}£{" "}
								{Math.abs(transaction.amount).toFixed(2)}
							</div>
						</div>
					))}
				</div>
			</div>

			<BottomNavigation />
		</div>
	);
};

export default Transactions;
