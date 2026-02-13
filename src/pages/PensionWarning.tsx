import React from "react";
import { useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	AlertTriangle,
	TrendingDown,
	CreditCard,
	PieChart,
	ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBar } from "@/components/StatusBar";

export const PensionWarning: React.FC = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/");
	};

	const handleContinue = () => {
		navigate("/move-funds", {
			state: {
				sourceAccount: "pension",
				destinationAccount: "savings",
			},
		});
	};

	const handleLearnMore = () => {
		navigate('/learn/3');
		// console.log("Opening educational content");
	};

	return (
		<div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col">
			{/* <StatusBar /> */}

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
						Move funds
					</h1>
				</header>

				{/* Warning Icon */}
				<div className="flex justify-center mb-6">
					<div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
						>
							<path
								d="M29.6 23.5112L18.6687 4.52746C18.3956 4.06237 18.0056 3.67673 17.5375 3.40879C17.0694 3.14084 16.5394 2.99988 16 2.99988C15.4606 2.99988 14.9306 3.14084 14.4625 3.40879C13.9944 3.67673 13.6044 4.06237 13.3312 4.52746L2.4 23.5112C2.13717 23.9611 1.99866 24.4727 1.99866 24.9937C1.99866 25.5147 2.13717 26.0264 2.4 26.4762C2.66966 26.9441 3.05896 27.3318 3.52795 27.5996C3.99694 27.8674 4.52873 28.0056 5.06875 28H26.9312C27.4708 28.0051 28.0021 27.8667 28.4706 27.599C28.9391 27.3312 29.328 26.9437 29.5975 26.4762C29.8607 26.0266 29.9996 25.5151 30.0001 24.994C30.0005 24.473 29.8624 23.9613 29.6 23.5112ZM15 13C15 12.7347 15.1054 12.4804 15.2929 12.2929C15.4804 12.1053 15.7348 12 16 12C16.2652 12 16.5196 12.1053 16.7071 12.2929C16.8946 12.4804 17 12.7347 17 13V18C17 18.2652 16.8946 18.5195 16.7071 18.7071C16.5196 18.8946 16.2652 19 16 19C15.7348 19 15.4804 18.8946 15.2929 18.7071C15.1054 18.5195 15 18.2652 15 18V13ZM16 24C15.7033 24 15.4133 23.912 15.1666 23.7472C14.92 23.5823 14.7277 23.3481 14.6142 23.074C14.5006 22.7999 14.4709 22.4983 14.5288 22.2073C14.5867 21.9164 14.7296 21.6491 14.9393 21.4393C15.1491 21.2295 15.4164 21.0867 15.7074 21.0288C15.9983 20.9709 16.2999 21.0006 16.574 21.1141C16.8481 21.2277 17.0824 21.4199 17.2472 21.6666C17.412 21.9133 17.5 22.2033 17.5 22.5C17.5 22.8978 17.342 23.2793 17.0607 23.5606C16.7794 23.8419 16.3978 24 16 24Z"
								fill="#E4B33D"
							/>
						</svg>
					</div>
				</div>

				{/* Main Heading */}
				<h2 className="text-2xl font-normal text-center mb-8 leading-tight">
					You're about to access your
					<br />
					pension early
				</h2>

				{/* Important Information Section */}
				<div className="">
					<h3 className="text-xl font-normal mb-4">
						Important things to know:
					</h3>

					<div className="space-y-4 mb-6">
						{/* Item 1 */}
						<div className="flex items-start gap-3">
							<div className="w-8 h-8 flex-shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M30.0001 16.0006V24.0006C30.0001 24.2658 29.8947 24.5201 29.7072 24.7077C29.5196 24.8952 29.2653 25.0006 29.0001 25.0006H21.0001C20.8022 25.0007 20.6087 24.9421 20.4441 24.8323C20.2795 24.7224 20.1512 24.5662 20.0754 24.3833C19.9997 24.2005 19.9799 23.9993 20.0185 23.8052C20.0572 23.6112 20.1526 23.4329 20.2926 23.2931L23.5863 20.0006L17.0001 13.4143L12.7076 17.7081C12.6147 17.801 12.5044 17.8748 12.383 17.9251C12.2616 17.9754 12.1315 18.0013 12.0001 18.0013C11.8687 18.0013 11.7385 17.9754 11.6171 17.9251C11.4957 17.8748 11.3854 17.801 11.2926 17.7081L2.29257 8.70806C2.10493 8.52042 1.99951 8.26592 1.99951 8.00056C1.99951 7.73519 2.10493 7.4807 2.29257 7.29306C2.48021 7.10542 2.7347 7 3.00007 7C3.26543 7 3.51993 7.10542 3.70757 7.29306L12.0001 15.5868L16.2926 11.2931C16.3854 11.2001 16.4957 11.1263 16.6171 11.076C16.7385 11.0257 16.8687 10.9998 17.0001 10.9998C17.1315 10.9998 17.2616 11.0257 17.383 11.076C17.5044 11.1263 17.6147 11.2001 17.7076 11.2931L25.0001 18.5868L28.2926 15.2931C28.4324 15.153 28.6107 15.0577 28.8048 15.019C28.9988 14.9804 29.2 15.0002 29.3829 15.0759C29.5657 15.1517 29.7219 15.28 29.8318 15.4446C29.9417 15.6092 30.0002 15.8027 30.0001 16.0006Z" fill="#A488F5"/>
              </svg>
							</div>
							<p className="text-xl pt-1">
								This will reduce your retirement savings
							</p>
						</div>

						{/* Item 2 */}
						<div className="flex items-start gap-3">
							<div className="w-8 h-8 flex-shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M29 14V18C29 18.2652 28.8946 18.5196 28.7071 18.7071C28.5196 18.8946 28.2652 19 28 19H7V21H18C18.2652 21 18.5196 21.1054 18.7071 21.2929C18.8946 21.4804 19 21.7348 19 22V25C19 25.2652 18.8946 25.5196 18.7071 25.7071C18.5196 25.8946 18.2652 26 18 26H7V27C7 27.2652 6.89464 27.5196 6.70711 27.7071C6.51957 27.8946 6.26522 28 6 28C5.73478 28 5.48043 27.8946 5.29289 27.7071C5.10536 27.5196 5 27.2652 5 27V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4C6.26522 4 6.51957 4.10536 6.70711 4.29289C6.89464 4.48043 7 4.73478 7 5V6H22C22.2652 6 22.5196 6.10536 22.7071 6.29289C22.8946 6.48043 23 6.73478 23 7V10C23 10.2652 22.8946 10.5196 22.7071 10.7071C22.5196 10.8946 22.2652 11 22 11H7V13H28C28.2652 13 28.5196 13.1054 28.7071 13.2929C28.8946 13.4804 29 13.7348 29 14Z" fill="#A488F5"/>
                </svg>
							</div>
							<p className="text-xl pt-1">Interest charges apply (3.9 APR)</p>
						</div>

						{/* Item 3 */}
						<div className="flex items-start gap-3">
							<div className="w-8 h-8 flex-shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9964 12.5533 27.6256 9.24882 25.1884 6.81163C22.7512 4.37445 19.4467 3.00364 16 3ZM16 5C17.761 5.00072 19.4961 5.42423 21.0594 6.23493C22.6227 7.04562 23.9686 8.2198 24.9838 9.65875L16 14.845V5ZM16 27C14.239 26.9993 12.5039 26.5758 10.9406 25.7651C9.37726 24.9544 8.03144 23.7802 7.01626 22.3412L25.9863 11.39C26.7598 13.0659 27.0992 14.9096 26.9732 16.7512C26.8471 18.5927 26.2597 20.3729 25.265 21.9278C24.2702 23.4827 22.9002 24.7623 21.2811 25.6487C19.662 26.5351 17.8459 26.9998 16 27Z" fill="#A488F5"/>
                </svg>
							</div>
							<p className="text-xl pt-1">
								You can access up to 25% of pension
							</p>
						</div>
					</div>

					<p className="text-base text-[#716860] mb-6">
						We'll show you the exact impact after you enter the amount on the
						review screen
					</p>

					{/* Learn More Link */}
					<button
						onClick={handleLearnMore}
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
						I understand, continue
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PensionWarning;
