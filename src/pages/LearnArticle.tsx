import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

// Mock data
const articles = {
	"1": {
		id: "1",
		title: "Why £1 Today Could Mean £1.60 Less Tomorrow",
		heroImage:
			"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200",
		date: "30 Oct 2025",
		readTime: "5 minute read",
		content: [
			{
				type: "paragraph",
				content:
					"When you need money urgently, your pension might seem like an obvious solution. After all, it's your money, sitting there with a healthy balance. But accessing your pension before retirement age comes with hidden costs that aren't always obvious at first glance.",
			},
			{
				type: "paragraph",
				content:
					"In this guide, we'll break down exactly what happens when you access your pension early, and help you understand whether it's the right choice for your situation.",
			},
			{
				type: "heading2",
				content: "Why Early Access Costs More Than You Think",
			},
			{
				type: "paragraph",
				content:
					"Let's say you need £5,000 today and decide to take it from your pension. On the surface, it looks simple: your pension balance drops from £48,750 to £43,750. But the real cost is much higher.",
			},
			{
				type: "paragraph",
				content:
					"By retirement age (let's say 68), that £5,000 withdrawal could mean you have £8,200 less. How is this possible? The answer lies in compound interest.",
			},
			{
				type: "image",
				src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200",
				alt: "Person using mobile phone",
			},
			{
				type: "heading2",
				content: "Understanding Compound Interest",
			},
			{
				type: "paragraph",
				content:
					"Compound interest is often called the \"eighth wonder of the world\" for good reason. It means your money doesn't just grow – it grows on its growth. Here's a simplified example:",
			},
			{
				type: "list",
				items: [
					"Year 1: Your £5,000 grows by 5% = £5,250",
					"Year 2: That £5,250 grows by 5% = £5,512.50",
					"Year 3: That £5,512.50 grows by 5% = £5,788.13",
				],
			},
			{
				type: "paragraph",
				content: "And so on, for 33 years until retirement.",
			},
			{
				type: "paragraph",
				content:
					"Without withdrawal, that £5,000 could have grown to approximately £23,200. But because you withdrew it at age 35, you've given up all that growth.",
			},
			{
				type: "paragraph",
				content:
					"We use conservative estimates (typically 5% annual growth), but the principle remains: the longer money stays invested, the more it grows exponentially.",
			},
		],
	},
	"2": {
		id: "2",
		title: "Questions to ask about drawing down",
		heroImage:
			"/content-hub/woman-with-smile.webp",
		date: "28 Oct 2025",
		readTime: "4 minute read",
		content: [
			{
				type: "paragraph",
				content:
					"Thinking about accessing your pension early? It's a big decision that deserves careful consideration. Before you make any moves, here are five essential questions you should ask yourself.",
			},
			{
				type: "heading2",
				content: "1. Have I Explored All Other Options?",
			},
			{
				type: "paragraph",
				content:
					"Your pension should be your last resort, not your first option. Consider these alternatives first:",
			},
			{
				type: "list",
				items: [
					"Emergency savings or accessible savings accounts",
					"Short-term personal loans with fixed repayment terms",
					"Credit cards for smaller amounts (if you can repay quickly)",
					"Support from family or friends",
					"Government benefits or hardship programs",
				],
			},
			{
				type: "heading2",
				content: "2. What Will This Cost Me in Retirement?",
			},
			{
				type: "paragraph",
				content:
					"Use a pension calculator to see the real impact. A £10,000 withdrawal today could mean £16,000-£20,000 less at retirement age, depending on how many years until you retire and expected growth rates.",
			},
			{
				type: "image",
				src: "https://images.unsplash.com/photo-1554224311-beee460c201f?w=600",
				alt: "Calculator and financial documents",
			},
			{
				type: "heading2",
				content: "3. Am I Prepared for the Tax Implications?",
			},
			{
				type: "paragraph",
				content:
					"Only 25% of your pension can typically be taken tax-free. The remaining 75% is taxed as income, which could push you into a higher tax bracket and result in a surprisingly large tax bill.",
			},
			{
				type: "heading2",
				content: "4. Is This a One-Time Need or Recurring Problem?",
			},
			{
				type: "paragraph",
				content:
					"If you're facing a one-time emergency, accessing your pension might be considered. But if this is a recurring financial issue, taking from your pension is only a temporary fix that could make long-term problems worse.",
			},
			{
				type: "heading2",
				content: "5. Have I Spoken to a Financial Advisor?",
			},
			{
				type: "paragraph",
				content:
					"Before making any decisions, speak with a qualified financial advisor. Many offer free initial consultations and can help you understand your full range of options. This decision is too important to make alone.",
			},
			{
				type: "paragraph",
				content:
					"Remember: Your pension is designed to support you when you can no longer work. Protecting it now means protecting your future self.",
			},
		],
	},
	"3": {
		id: "3",
		title: "The Secret to Growing Your Retirement Fund",
		heroImage:
			"/content-hub/happy-couple.webp",
		date: "25 Oct 2025",
		readTime: "6 minute read",
		content: [
			{
				type: "paragraph",
				content:
					"Building a comfortable retirement fund isn't about getting lucky or having a high salary. It's about understanding a few key principles and starting as early as possible. Let's explore the strategies that actually work.",
			},
			{
				type: "heading2",
				content: "Start Early: The Power of Time",
			},
			{
				type: "paragraph",
				content:
					"The single biggest factor in retirement savings isn't how much you contribute—it's how early you start. Thanks to compound interest, someone who starts saving at 25 can end up with significantly more than someone who starts at 35, even if they contribute less overall.",
			},
			{
				type: "paragraph",
				content:
					"For example: Sarah starts contributing £200/month at age 25. John starts contributing £300/month at age 35. Both retire at 65. Despite contributing less per month, Sarah could end up with nearly 40% more in her pension pot.",
			},
			{
				type: "image",
				src: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600",
				alt: "Growth chart showing upward trend",
			},
			{
				type: "heading2",
				content: "Maximize Your Employer Contributions",
			},
			{
				type: "paragraph",
				content:
					"Many employers offer contribution matching, which is essentially free money. If your employer matches up to 5% of your salary, make sure you're contributing at least that amount. Not doing so is literally leaving money on the table.",
			},
			{
				type: "heading2",
				content: "Increase Contributions with Pay Rises",
			},
			{
				type: "paragraph",
				content:
					"Got a salary increase? Before you get used to that extra money, consider increasing your pension contribution by half of the raise amount. You'll still see an increase in your take-home pay, but your future self will thank you.",
			},
			{
				type: "heading2",
				content: "Diversify Your Investments",
			},
			{
				type: "paragraph",
				content:
					"Most pension plans offer different fund options. While younger savers can typically handle more risk with growth-focused funds, it's important to gradually shift to more conservative investments as you approach retirement.",
			},
			{
				type: "list",
				items: [
					"Ages 20-40: Higher risk, growth-focused funds",
					"Ages 40-55: Balanced funds with moderate risk",
					"Ages 55+: Lower risk, capital preservation focused",
				],
			},
			{
				type: "heading2",
				content: "Review and Adjust Regularly",
			},
			{
				type: "paragraph",
				content:
					"Set a reminder to review your pension at least once a year. Check your performance, ensure you're on track for your goals, and adjust contributions if your circumstances have changed.",
			},
			{
				type: "paragraph",
				content:
					"The secret isn't really a secret at all: start early, contribute consistently, maximize employer matches, and let time work its magic. Your 65-year-old self is counting on the decisions you make today.",
			},
		],
	},
	"4": {
		id: "4",
		title: "Should I Really Touch My Pension? A Guide for the Under-55s",
		heroImage:
			"/content-hub/man-smiling.webp",
		date: "22 Oct 2025",
		readTime: "5 minute read",
		content: [
			{
				type: "paragraph",
				content:
					"You've found your dream home, but you're short on the down payment. Your pension balance looks tempting—but is using it the right move? Let's examine this common dilemma from all angles.",
			},
			{
				type: "heading2",
				content: "The Appeal: Why It Seems Like a Good Idea",
			},
			{
				type: "paragraph",
				content:
					"On the surface, using your pension for a house down payment can seem logical:",
			},
			{
				type: "list",
				items: [
					"You're investing in property instead of stocks/bonds",
					"You'll own a home sooner",
					"Property can appreciate in value",
					"You'll avoid paying rent",
					'The money stays "yours" in the form of home equity',
				],
			},
			{
				type: "heading2",
				content: "The Reality: Hidden Costs You Need to Consider",
			},
			{
				type: "paragraph",
				content:
					"However, there are significant drawbacks that aren't immediately obvious:",
			},
			{
				type: "image",
				src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
				alt: "Modern house exterior",
			},
			{
				type: "heading2",
				content: "1. Tax Implications",
			},
			{
				type: "paragraph",
				content:
					"Only 25% of your pension withdrawal is tax-free. The rest is taxed as income, potentially pushing you into a higher tax bracket. A £30,000 withdrawal might only net you £20,000-£22,000 after taxes.",
			},
			{
				type: "heading2",
				content: "2. Lost Growth Potential",
			},
			{
				type: "paragraph",
				content:
					"While property can appreciate, historically, diversified pension investments have often outperformed property over long periods. Plus, you lose the compound interest on the withdrawn amount.",
			},
			{
				type: "heading2",
				content: "3. Penalties and Fees",
			},
			{
				type: "paragraph",
				content:
					"Depending on your pension type and age, you might face early withdrawal penalties that further reduce the amount you actually receive.",
			},
			{
				type: "heading2",
				content: "Better Alternatives to Consider",
			},
			{
				type: "list",
				items: [
					"First-time buyer schemes with lower deposit requirements",
					"Help to Buy ISA or Lifetime ISA with government bonuses",
					"Guarantor mortgages (family helps without giving money)",
					"Shared ownership schemes",
					"Saving for longer to build a proper deposit",
				],
			},
			{
				type: "heading2",
				content: "The Bottom Line",
			},
			{
				type: "paragraph",
				content:
					"While buying a home is important, your pension is designed for a specific purpose: supporting you when you can no longer work. In most cases, the long-term cost of using your pension for a down payment outweighs the short-term benefit of home ownership.",
			},
			{
				type: "paragraph",
				content:
					"Before making this decision, speak with both a mortgage advisor and a financial planner. They can help you explore all your options and make an informed choice that protects both your immediate housing needs and your long-term financial security.",
			},
		],
	},
};

const LearnArticle: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const article = id ? articles[id as keyof typeof articles] : null;

	if (!article) {
		return (
			<div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto p-4">
				<button
					onClick={() => navigate("/learn")}
					className="mb-6 hover:opacity-70 transition-opacity"
					aria-label="Go back"
				>
					<ArrowLeft className="w-6 h-6" />
				</button>
				<p className="text-[#716860]">Article not found</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground">
			<div className="max-w-[480px] mx-auto">
				{/* Back Button */}
				<div className="relative">
					{/* Hero Image */}
					<img
						src={article.heroImage}
						alt={article.title}
						className="w-full aspect-[16/9] object-cover"
					/>

					{/* Back Button - preko slike */}
					<button
						onClick={() => navigate(-1)}
						className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg"
						aria-label="Go back"
					>
						<ArrowLeft className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-4">
					{/* Metadata */}
					<div className="flex items-center gap-4 text-[#716860] text-sm mb-4">
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4" />
							<span>{article.date}</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="w-4 h-4" />
							<span>{article.readTime}</span>
						</div>
					</div>

					{/* Title */}
					<h1 className="text-3xl font-normal text-foreground mb-6 leading-tight">
						{article.title}
					</h1>

					{/* Rich Text Content */}
					<article className="prose prose-lg max-w-none">
						{article.content.map((block, index) => {
							switch (block.type) {
								case "heading2":
									return (
										<h2
											key={index}
											className="text-2xl font-normal text-foreground mt-8 mb-4"
										>
											{block.content}
										</h2>
									);
								case "paragraph":
									return (
										<p
											key={index}
											className="text-foreground mb-4 leading-relaxed"
										>
											{block.content}
										</p>
									);
								case "image":
									return (
										<img
											key={index}
											src={block.src}
											alt={block.alt}
											className="w-full rounded-lg my-6"
										/>
									);
								case "list":
									return (
										<ul key={index} className="list-disc pl-6 mb-4 space-y-2">
											{block.items?.map((item, itemIndex) => (
												<li key={itemIndex} className="text-foreground">
													{item}
												</li>
											))}
										</ul>
									);
								default:
									return null;
							}
						})}
					</article>
				</div>
			</div>
		</div>
	);
};

export default LearnArticle;
