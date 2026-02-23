import React, { useState, useRef } from "react";
import { StatusBar } from "./StatusBar";
import { Header } from "./Header";
import { AccountCard } from "./AccountCard";
import { PromotionCard } from "./PromotionCard";
import { LearningResourceCard } from "./LearningResourceCard";
import { BottomNavigation } from "./BottomNavigation";
import { CreditCard } from "./CreditCard";
import { AccountActions } from "./AccountActions";
import { useAccounts } from "@/contexts/AccountContext";
import { useNavigate } from "react-router-dom";
import { currentAccountActions } from "@/pages/AccountDetail";
import { ArrowRight } from "lucide-react";
import { useAccountCardsStagger } from "@/hooks/useAccountCardsStagger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
	const { accounts } = useAccounts();
	const navigate = useNavigate();
	const accountsSectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

	useAccountCardsStagger(accountsSectionRef);

	// useGSAP(() => {
	// 	if (!headerRef.current) return;

	// 	gsap.fromTo(
	// 		headerRef.current,
	// 		{
	// 			y: "-100%",
	// 		},
	// 		{
	// 			y: "0%",
	// 			duration: 1,
	// 			ease: "power2.out",
  //       delay: 0.3, // Počinje nakon main animacije
	// 		}
	// 	);
	// }, []);

  useGSAP(() => {
		if (!mainRef.current) return;

		gsap.fromTo(
			mainRef.current,
			{
				y: 100,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 2,
				duration: 0.6,
				ease: "power2.out",
			}
		);
	}, []);

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
							/>
						</div>

						<div className="mb-[-32px]">
							<AccountCard
								type="savings"
								accountName="Savings"
								subtitle=""
								balance={formatBalance(accounts.savings.balance)}
								onClick={() => navigate("/account/savings")}
							/>
						</div>

						<div className="mt-0">
							<AccountCard
								type="current"
								accountName="Current Account"
								subtitle=""
								balance={formatBalance(accounts.currentAccount.currencyBalances?.GBP ?? accounts.currentAccount.balance)}
								onClick={() => navigate("/account/currentAccount")}
							/>
						</div>
					</section>

					<div className="mb-6">
						<div className="mt-4">
						<AccountActions actions={currentAccountActions.map(action => 
							action.label === 'Exchange' 
								? { ...action, onClick: () => navigate('/exchange') } 
								: action
						)} />
						</div>

						<button
							onClick={() => navigate('/pension-warning')}
							className="w-full py-4 rounded-lg mt-4 font-regular text-base flex items-center justify-center gap-2 bg-[#211E1E] text-white dark:bg-white dark:text-black"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M3.30806 6.69268C3.24995 6.63463 3.20385 6.5657 3.1724 6.48983C3.14095 6.41396 3.12476 6.33263 3.12476 6.25049C3.12476 6.16836 3.14095 6.08703 3.1724 6.01115C3.20385 5.93528 3.24995 5.86635 3.30806 5.8083L5.80806 3.3083C5.89547 3.2208 6.00688 3.16119 6.12818 3.13704C6.24948 3.11288 6.37523 3.12526 6.48949 3.1726C6.60376 3.21995 6.7014 3.30013 6.77007 3.403C6.83874 3.50587 6.87535 3.62681 6.87525 3.75049V5.62549H16.2502C16.416 5.62549 16.575 5.69134 16.6922 5.80855C16.8094 5.92576 16.8752 6.08473 16.8752 6.25049C16.8752 6.41625 16.8094 6.57522 16.6922 6.69243C16.575 6.80964 16.416 6.87549 16.2502 6.87549H6.87525V8.75049C6.87535 8.87418 6.83874 8.99511 6.77007 9.09798C6.7014 9.20085 6.60376 9.28104 6.48949 9.32838C6.37523 9.37573 6.24948 9.3881 6.12818 9.36395C6.00688 9.33979 5.89547 9.28019 5.80806 9.19268L3.30806 6.69268ZM16.6924 13.3083L14.1924 10.8083C14.105 10.7208 13.9936 10.6612 13.8723 10.637C13.751 10.6129 13.6253 10.6253 13.511 10.6726C13.3967 10.7199 13.2991 10.8001 13.2304 10.903C13.1618 11.0059 13.1252 11.1268 13.1252 11.2505V13.1255H3.75025C3.58449 13.1255 3.42552 13.1913 3.30831 13.3085C3.1911 13.4258 3.12525 13.5847 3.12525 13.7505C3.12525 13.9163 3.1911 14.0752 3.30831 14.1924C3.42552 14.3096 3.58449 14.3755 3.75025 14.3755H13.1252V16.2505C13.1252 16.3742 13.1618 16.4951 13.2304 16.598C13.2991 16.7009 13.3967 16.781 13.511 16.8284C13.6253 16.8757 13.751 16.8881 13.8723 16.8639C13.9936 16.8398 14.105 16.7802 14.1924 16.6927L16.6924 14.1927C16.7505 14.1346 16.7966 14.0657 16.8281 13.9898C16.8596 13.914 16.8757 13.8326 16.8757 13.7505C16.8757 13.6684 16.8596 13.587 16.8281 13.5112C16.7966 13.4353 16.7505 13.3664 16.6924 13.3083Z" fill="currentColor" />
							</svg>
							<span className="text-xl">Move funds</span>
						</button>
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
