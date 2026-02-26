import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "./StatusBar";
import { Header } from "./Header";
import { AccountCard } from "./AccountCard";
import { PromotionCard } from "./PromotionCard";
import { LearningResourceCard } from "./LearningResourceCard";
import { BottomNavigation } from "./BottomNavigation";
import { CreditCard } from "./CreditCard";
import { AccountActions } from "./AccountActions";
import { useAccounts, PROVIDERS } from "@/contexts/AccountContext";
import { useNavigate } from "react-router-dom";
import { currentAccountActions } from "@/pages/AccountDetail";
import { ArrowRight } from "lucide-react";
import { useAccountCardsStagger } from "@/hooks/useAccountCardsStagger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const mockArticles = [
	{
		id: "1",
		title: "Why £1 Today Could Mean £1.60 Less Tomorrow",
		image: "/placeholder.svg",
	},
	{
		id: "2",
		title: "Questions to ask about drawing down",
    image: "/content-hub/woman-with-smile.webp",
	},
	{
    id: "3",
		title: "The Secret to Growing Your Retirement Fund",
    image: "/content-hub/happy-couple.webp",
	},
	{
		id: "4",
		title: "Should I Really Touch My Pension? A Guide for the Under-55s",
		image: "/content-hub/man-smiling.webp",
	},
];

export const HomeDark: React.FC = () => {
	const [showAllPromotions, setShowAllPromotions] = useState(false);
	const [providerDrawerOpen, setProviderDrawerOpen] = useState(false);
	const { accounts, currentProvider, switchProvider } = useAccounts();
	const navigate = useNavigate();
	const accountsSectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

	const { replay: replayCardsStagger } = useAccountCardsStagger(accountsSectionRef);

	const playEntryAnimation = () => {
		if (!mainRef.current) return;
		gsap.fromTo(
			mainRef.current,
			{ y: 100, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
		);
	};

  useGSAP(() => {
		playEntryAnimation();
	}, []);

	const handleSwitchProvider = (id: string) => {
		switchProvider(id);
		setProviderDrawerOpen(false);
		setTimeout(() => {
			playEntryAnimation();
			replayCardsStagger();
		}, 50);
	};

	const formatBalance = (balance: number) => {
		const parts = balance
			.toLocaleString("en-GB", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
			.split(".");

		const wholePart = parts[0].replace("£", "");
		const decimalPart = parts[1];

		return (
			<span>
				<span
					style={{
						fontSize: "24px",
						letterSpacing: "1.2px",
						lineHeight: "105%",
					}}
				>
					£{wholePart}
				</span>
				.
				<span style={{ fontSize: "17px", letterSpacing: "0.34px" }}>
					{decimalPart}
				</span>
			</span>
		);
	};

	const handleSeeAllPromotions = () => {
		// setShowAllPromotions(!showAllPromotions);
		console.log();
	};

	const handleNavigateToLearn = () => {
		navigate("/learn");
	};

	const handleResourceClick = (articleId: string) => {
		navigate(`/learn/${articleId}`);
	};

	return (
		<div className="justify-center items-stretch flex max-w-[480px] w-full flex-col overflow-hidden bg-[#F3F3F3] dark:bg-black mx-auto min-h-screen pb-20">
			<div className="w-full">
				{/* <StatusBar /> */}

				<div ref={headerRef}>
					<Header />
				</div>

			<main ref={mainRef} className="w-full mt-4 px-4">
				{/* Provider switcher bar */}
				<button
					className="w-full flex items-center justify-between mb-4 px-3 py-2.5 rounded-[9px] bg-white dark:bg-[#1A1A1A] active:opacity-80 transition-opacity"
					onClick={() => setProviderDrawerOpen(true)}
				>
					<div className="flex items-center gap-2.5">
						{currentProvider.iconUrl
							? <img src={currentProvider.iconUrl} alt={currentProvider.name} className="w-7 h-7 rounded-full object-contain" />
							: <div className="w-7 h-7 rounded-full bg-[#A488F5] flex items-center justify-center text-white text-xs font-semibold">
									{currentProvider.name.charAt(0)}
								</div>
						}
						<span className="text-foreground text-sm font-medium">{currentProvider.name}</span>
					</div>
					<span className="text-[14px] font-normal" style={{ color: '#A488F5' }}>Switch provider</span>
				</button>

				<section
					ref={accountsSectionRef}
					aria-label="Account overview"
					className="w-full"
				>
					<div className="mb-[-32px]">
						<AccountCard
							type="pension"
							accountName="Pension"
							subtitle=""
							balance={formatBalance(accounts.pension.balance)}
							onClick={() => navigate("/account/pension")}
							providerLogoUrl={currentProvider.logoUrl}
						/>
					</div>

					<div className="mb-[-32px]">
						<AccountCard
							type="savings"
							accountName="Savings"
							subtitle=""
							balance={formatBalance(accounts.savings.balance)}
							onClick={() => navigate("/account/savings")}
							providerLogoUrl={currentProvider.logoUrl}
						/>
					</div>

					<div className="mt-0">
						<AccountCard
							type="current"
							accountName="Current Account"
							subtitle=""
							balance={formatBalance(accounts.currentAccount.currencyBalances?.GBP ?? accounts.currentAccount.balance)}
							onClick={() => navigate("/account/currentAccount")}
							onMoveFunds={() => navigate("/pension-warning")}
							providerLogoUrl={currentProvider.logoUrl}
						/>
					</div>
				</section>

				{/* Provider switcher drawer — dismissible=false disables drag-to-close so inner scroll works */}
				<Drawer open={providerDrawerOpen} onOpenChange={setProviderDrawerOpen} dismissible={false}>
					<DrawerContent
						className="bg-[#1C1C1E] border-0 rounded-t-[20px] [&>div:first-child]:hidden flex flex-col"
						style={{ height: 'calc(82 * 1svh)' }}
					>
						{/* Fixed header */}
						<div className="flex items-center justify-between px-4 pt-6 pb-4 shrink-0">
							<h2 className="text-white font-semibold" style={{ fontSize: '28px' }}>My providers</h2>
							<button
								className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2C2C2E] text-white"
								onClick={() => setProviderDrawerOpen(false)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
									<path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</button>
						</div>

						{/* Scrollable list */}
						<div
							className="overflow-y-scroll flex-1 min-h-0 px-4 pb-8"
							ref={el => {
								if (el && providerDrawerOpen) el.scrollTop = 0;
							}}
						>
							<div className="flex flex-col gap-2">
								{PROVIDERS.map(provider => {
									const isActive = currentProvider.id === provider.id;
									return (
										<button
											key={provider.id}
											className={`flex items-center justify-between px-4 py-3.5 rounded-[12px] transition-colors border ${
												isActive ? 'border-[#716860]' : 'border-transparent'
											}`}
											onClick={() => handleSwitchProvider(provider.id)}
										>
											<div className="flex items-center gap-3">
												{provider.iconUrl
													? <img src={provider.iconUrl} alt={provider.name} className="w-8 h-8 rounded-full object-contain" />
													: <div className="w-8 h-8 rounded-full bg-[#A488F5] flex items-center justify-center text-white text-sm font-semibold">
															{provider.name.charAt(0)}
														</div>
												}
												<span className="text-white text-base font-normal">{provider.name}</span>
											</div>
											{isActive && (
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
													<path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
												</svg>
											)}
										</button>
									);
								})}
							</div>
						</div>
					</DrawerContent>
				</Drawer>

					<div className="mb-6">
						<div className="mt-4">
						<AccountActions actions={currentAccountActions.map(action => 
							action.label === 'Exchange' 
								? { ...action, onClick: () => navigate('/exchange') } 
								: action
						)} />
						</div>

					</div>

					<section className="w-full pb-6" aria-label="Promotions">
						<div className="flex w-full items-center gap-[40px_100px] leading-none justify-between">
							<h2 className="text-foreground text-[18px] font-normal self-stretch my-auto">
								Rewards
							</h2>
							<button
								className="self-stretch flex items-center gap-1 text-lg text-[#A488F5] font-normal my-auto hover:text-[#9575e8] transition-colors"
								onClick={handleSeeAllPromotions}
								aria-expanded={showAllPromotions}
							>
								<span className="text-[#A488F5] self-stretch my-auto">
									{showAllPromotions ? "Show less" : "See all"}
								</span>
								<img
									src="https://api.builder.io/api/v1/image/assets/TEMP/c7bef006abc66b8f7fa6574d6a4853ed2994e5d2?placeholderIfAbsent=true"
									className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
									alt=""
								/>
							</button>
						</div>

						<div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mt-4">
							<PromotionCard
								title="Maximise your retirement potential"
								backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/77d83e8891b893820180d5c1091f1c417adaa71d?placeholderIfAbsent=true"
								isWide={true}
							/>
							<PromotionCard
								title="Save for your dream holiday"
								backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/ca2cd3deda67d27f0470bffdcaa474fd18a319eb?placeholderIfAbsent=true"
								isWide={true}
							/>
							{showAllPromotions && (
								<>
									<PromotionCard
										title="Exclusive Investment Opportunities"
										backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/77d83e8891b893820180d5c1091f1c417adaa71d?placeholderIfAbsent=true"
										isWide={true}
									/>
									<PromotionCard
										title="Premium Account Benefits"
										backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/ca2cd3deda67d27f0470bffdcaa474fd18a319eb?placeholderIfAbsent=true"
										isWide={true}
									/>
								</>
							)}
						</div>
					</section>

					<section
						className="w-full pb-6 mt-6"
						aria-label="Learning resources"
					>
						<div className="flex w-full items-center justify-between mb-4">
							<h2 className="text-foreground text-[19px] font-normal">
								Content hub
							</h2>
							<button
								onClick={handleNavigateToLearn}
								className="flex items-center gap-1 text-lg text-[#A488F5] font-normal hover:text-[#9575e8] transition-colors"
								aria-label="See all learning resources"
							>
								<span>See all</span>
								<img
									src="https://api.builder.io/api/v1/image/assets/TEMP/c7bef006abc66b8f7fa6574d6a4853ed2994e5d2?placeholderIfAbsent=true"
									className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
									alt=""
								/>
							</button>
						</div>

						<div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide mt-4">
							{mockArticles.slice(1, 4).map((article) => (
								<LearningResourceCard
									key={article.id}
									title={article.title}
									image={article.image}
									onClick={() => handleResourceClick(article.id)}
								/>
							))}
						</div>
					</section>
				</main>

				<BottomNavigation />
			</div>
		</div>
	);
};

export default HomeDark;
