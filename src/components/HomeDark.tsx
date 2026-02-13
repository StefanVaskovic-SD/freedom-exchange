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
								balance={formatBalance(accounts.currentAccount.balance)}
								onClick={() => navigate("/account/currentAccount")}
							/>
						</div>
					</section>

					<div className="mb-6">
						{/* <CreditCard
              cardholderName="Peter Smith"
              cardNumber="4562"
              validUntil="04/28"
              cvv="***"
              bankName="Mercer"
              cardType="freedom"
            /> */}
						<div className="mt-4">
							<AccountActions actions={currentAccountActions} />
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
