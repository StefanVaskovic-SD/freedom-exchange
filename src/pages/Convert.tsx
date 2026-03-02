import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccounts, CURRENCY_INFO, WALLET_CURRENCIES, convertCurrency, getExchangeRate } from "@/contexts/AccountContext";
import { ArrowLeft, ArrowDown, ArrowUp, ArrowRightLeft, Search, Check } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";

const ALL_CURRENCIES = Object.keys(CURRENCY_INFO);
const noSymbolCurrencies = ['AED'];

const ExchangeArrowsIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none" className={className}>
		<path d="M17.2258 10.9001C17.3132 10.9872 17.3825 11.0907 17.4298 11.2046C17.4772 11.3186 17.5015 11.4407 17.5015 11.5641C17.5015 11.6875 17.4772 11.8097 17.4298 11.9236C17.3825 12.0376 17.3132 12.1411 17.2258 12.2282L15.3508 14.1032C15.1747 14.2793 14.9358 14.3783 14.6867 14.3783C14.4376 14.3783 14.1988 14.2793 14.0227 14.1032C13.8465 13.9271 13.7476 13.6882 13.7476 13.4391C13.7476 13.1901 13.8465 12.9512 14.0227 12.7751L14.2969 12.5008H11.5625C11.4135 12.501 11.2666 12.4657 11.134 12.3977C11.0014 12.3298 10.8869 12.2312 10.8 12.1102L4.82969 3.75085H0.9375C0.68886 3.75085 0.450403 3.65207 0.274587 3.47626C0.0987721 3.30044 0 3.06199 0 2.81335C0 2.5647 0.0987721 2.32625 0.274587 2.15043C0.450403 1.97462 0.68886 1.87585 0.9375 1.87585H5.3125C5.46149 1.87568 5.60838 1.91103 5.74098 1.97896C5.87359 2.0469 5.98809 2.14545 6.075 2.26647L12.0453 10.6258H14.2969L14.0219 10.3516C13.8458 10.1755 13.7468 9.93664 13.7468 9.68756C13.7468 9.43849 13.8458 9.19962 14.0219 9.0235C14.198 8.84738 14.4369 8.74844 14.6859 8.74844C14.935 8.74844 15.1739 8.84738 15.35 9.0235L17.2258 10.9001ZM7.0625 9.11335C6.96232 9.04178 6.84902 8.99065 6.72908 8.96288C6.60913 8.9351 6.48489 8.93123 6.36345 8.95147C6.24201 8.97171 6.12574 9.01567 6.02129 9.08084C5.91684 9.14602 5.82625 9.23113 5.75469 9.33131L4.82969 10.6258H0.9375C0.68886 10.6258 0.450403 10.7246 0.274587 10.9004C0.0987721 11.0762 0 11.3147 0 11.5633C0 11.812 0.0987721 12.0504 0.274587 12.2263C0.450403 12.4021 0.68886 12.5008 0.9375 12.5008H5.3125C5.46149 12.501 5.60838 12.4657 5.74098 12.3977C5.87359 12.3298 5.98809 12.2312 6.075 12.1102L7.28047 10.4235C7.3524 10.3232 7.40382 10.2098 7.4318 10.0896C7.45978 9.96941 7.46376 9.84489 7.4435 9.72317C7.42325 9.60145 7.37917 9.48492 7.31379 9.38028C7.24841 9.27563 7.16302 9.18492 7.0625 9.11335ZM9.8125 5.26335C9.91268 5.33491 10.026 5.38604 10.1459 5.41381C10.2659 5.44159 10.3901 5.44547 10.5116 5.42523C10.633 5.40499 10.7493 5.36102 10.8537 5.29585C10.9582 5.23067 11.0488 5.14556 11.1203 5.04538L12.0453 3.75085H14.2969L14.0219 4.02506C13.8458 4.20118 13.7468 4.44005 13.7468 4.68913C13.7468 4.9382 13.8458 5.17707 14.0219 5.35319C14.198 5.52931 14.4369 5.62825 14.6859 5.62825C14.935 5.62825 15.1739 5.52931 15.35 5.35319L17.225 3.47819C17.3124 3.39109 17.3817 3.2876 17.4291 3.17364C17.4764 3.05969 17.5007 2.93751 17.5007 2.81413C17.5007 2.69074 17.4764 2.56856 17.4291 2.45461C17.3817 2.34065 17.3124 2.23716 17.225 2.15006L15.35 0.275064C15.1739 0.0989432 14.935 -5.24879e-09 14.6859 0C14.4369 5.2488e-09 14.198 0.0989435 14.0219 0.275064C13.8458 0.451184 13.7468 0.690054 13.7468 0.939126C13.7468 1.1882 13.8458 1.42707 14.0219 1.60319L14.2969 1.87585H11.5625C11.4135 1.87568 11.2666 1.91103 11.134 1.97896C11.0014 2.0469 10.8869 2.14545 10.8 2.26647L9.59453 3.95397C9.52273 4.05421 9.4714 4.16762 9.44349 4.28772C9.41558 4.40782 9.41163 4.53225 9.43188 4.65388C9.45213 4.7755 9.49617 4.89194 9.56148 4.99652C9.62679 5.10111 9.7121 5.19178 9.8125 5.26335Z" fill="currentColor"/>
	</svg>
);

function formatDate(date: Date) {
	const d = new Date(date);
	const day = d.getDate().toString().padStart(2, "0");
	const month = d.toLocaleString("en-GB", { month: "short" });
	const year = d.getFullYear();
	const time = d.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
	return `${day} ${month} ${year}, ${time}`;
}

function getTransactionIcon(type: string) {
	switch (type) {
		case "withdrawal":
			return <ArrowDown className="w-5 h-5 text-[#211E1E] dark:text-white" />;
		case "topup":
			return <ArrowUp className="w-5 h-5 text-[#211E1E] dark:text-white" />;
		case "transfer":
			return <ArrowRightLeft className="w-5 h-5 text-[#211E1E] dark:text-white" />;
		case "exchange":
			return <ExchangeArrowsIcon className="text-[#211E1E] dark:text-white" />;
		default:
			return null;
	}
}

function getTransactionLabel(type: string) {
	switch (type) {
		case "withdrawal":
			return "Withdrawal";
		case "topup":
			return "Top up";
		case "transfer":
			return "Transfer";
		default:
			return type;
	}
}

function ExchangeLabel({ fromCurrency, toCurrency }: { fromCurrency: string; toCurrency: string }) {
	return (
		<span className="inline-flex items-center gap-1.5">
			{fromCurrency} <ExchangeArrowsIcon className="text-[#716860] inline-block" /> {toCurrency}
		</span>
	);
}

const Convert: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { convertBalances, convertTransactions } = useAccounts();

	const initialCurrency = (location.state as any)?.selectedCurrency || 'GBP';
	const [selectedCurrency, setSelectedCurrency] = useState<string>(initialCurrency);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard?.writeText('5728480144699922');
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const [fromCurrency, setFromCurrency] = useState<string>(initialCurrency);
	const [toCurrency, setToCurrency] = useState<string>('');
	const [amount, setAmount] = useState('');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerMode, setDrawerMode] = useState<'from' | 'to'>('from');
	const [searchQuery, setSearchQuery] = useState('');

	const handleTabChange = (code: string) => {
		setSelectedCurrency(code);
		setFromCurrency(code);
		setAmount('');
		if (toCurrency === code) setToCurrency('');
	};

	const currencyBalances = convertBalances;
	const fromBalance = currencyBalances[fromCurrency] || 0;
	const toBalance = currencyBalances[toCurrency] || 0;
	const hasNoFunds = fromBalance <= 0;

	const filteredTransactions = [...convertTransactions]
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const numAmount = parseFloat(amount) || 0;
	const convertedAmount = useMemo(() => {
		if (numAmount <= 0 || !toCurrency) return 0;
		return convertCurrency(fromCurrency, toCurrency, numAmount);
	}, [numAmount, fromCurrency, toCurrency]);

	const exchangeRate = useMemo(() => {
		if (!toCurrency) return 0;
		return getExchangeRate(fromCurrency, toCurrency);
	}, [fromCurrency, toCurrency]);

	const exceedsBalance = numAmount > 0 && numAmount > fromBalance;
	const isValidExchange = numAmount > 0 && numAmount <= fromBalance && toCurrency !== '';

	const availableToCurrencies = ALL_CURRENCIES.filter(c => c !== fromCurrency);
	const filteredToCurrencies = availableToCurrencies.filter(c => {
		if (!searchQuery) return true;
		const info = CURRENCY_INFO[c];
		const q = searchQuery.toLowerCase();
		return info.code.toLowerCase().includes(q) || info.name.toLowerCase().includes(q);
	});

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
			setAmount(value);
		}
	};

	const handleExchangeNext = () => {
		if (isValidExchange) {
			navigate('/exchange-review', {
				state: {
					fromCurrency,
					toCurrency,
					fromAmount: numAmount,
					toAmount: convertedAmount,
					source: 'convert',
				}
			});
		}
	};

	const handleSwap = () => {
		if (!toCurrency) return;
		const newFrom = toCurrency;
		const newTo = fromCurrency;
		setSelectedCurrency(newFrom);
		setFromCurrency(newFrom);
		setToCurrency(newTo);
		setAmount('');
	};

	const openFromDrawer = () => {
		setDrawerMode('from');
		setSearchQuery('');
		setDrawerOpen(true);
	};

	const openToDrawer = () => {
		setDrawerMode('to');
		setSearchQuery('');
		setDrawerOpen(true);
	};

	const handleCurrencySelect = (code: string) => {
		if (drawerMode === 'from') {
			handleTabChange(code);
		} else {
			setToCurrency(code);
		}
		setDrawerOpen(false);
		setSearchQuery('');
	};

	const drawerCurrencies = drawerMode === 'from'
		? WALLET_CURRENCIES.map(c => c as string)
		: filteredToCurrencies;

	const drawerSelected = drawerMode === 'from' ? fromCurrency : toCurrency;

	const formatCurrencyAmount = (value: number, currCode: string) => {
		const info = CURRENCY_INFO[currCode];
		if (!info) return '0.00';
		const sym = noSymbolCurrencies.includes(currCode) ? '' : info.symbol;
		if (currCode === 'JPY') {
			return `${sym}${Math.round(value).toLocaleString('en-GB')}`;
		}
		return `${sym}${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
	};

	const formatCurrencyBalance = (balance: number, currCode: string) => {
		const info = CURRENCY_INFO[currCode];
		const parts = balance
			.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
			.split(".");
		const symbol = noSymbolCurrencies.includes(currCode) ? '' : info.symbol;
		return { symbol, wholePart: parts[0], decimalPart: parts[1] };
	};

	return (
		<div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col pb-24">
			<div className="px-4 py-6 flex flex-col flex-1">
				<button
					className="mb-4 w-12 h-12 bg-white dark:bg-[#211E1E] rounded-full flex items-center justify-center text-black dark:text-white"
					onClick={() => navigate("/")}
				>
					<ArrowLeft className="w-6 h-6" />
				</button>
				<div>
					<div className="text-[28px] mb-2 font-normal">Multi currency wallet</div>
					<p className="opacity-70 text-base mb-4">Funds available to spend</p>

					{/* Currency Tabs */}
					<div className="flex gap-2 mb-4 w-full overflow-x-auto no-scrollbar">
						{WALLET_CURRENCIES.map(code => {
							const info = CURRENCY_INFO[code];
							const isActive = selectedCurrency === code;
							return (
								<button
									key={code}
									onClick={() => handleTabChange(code)}
									className={`flex-shrink-0 flex items-center justify-center gap-1.5 px-3 py-[6px] rounded-[12px] text-sm font-normal transition-colors border bg-white dark:bg-[#211E1E] text-black dark:text-white ${
										isActive
											? 'border-[#716860] dark:border-white'
											: 'border-white dark:border-[#211E1E]'
									}`}
								>
									<img src={`/${code.toLowerCase()}.png`} className="w-5 h-5 rounded-full object-cover flag-img" alt={code} />
									{code} ({info.symbol})
								</button>
							);
						})}
					</div>

					{/* Currency Balance Card */}
					<div className="bg-white dark:bg-[#211E1E] rounded-[9px] px-4 py-5 mb-4 flex flex-col justify-between h-[160px]">
						<div className="flex items-center gap-3 mb-3">
							<img src={`/${selectedCurrency.toLowerCase()}.png`} className="w-10 h-10 rounded-full object-cover flag-img" alt={selectedCurrency} />
							<span className="text-foreground text-lg font-normal">{selectedCurrency}</span>
							<span className="ml-auto">
								{(() => {
									const bal = currencyBalances[selectedCurrency] || 0;
									const { symbol, wholePart, decimalPart } = formatCurrencyBalance(bal, selectedCurrency);
									return (
										<span className="text-foreground">
											<span className="text-[28px] font-normal">{symbol}{wholePart}</span>
											<span className="text-[18px]">.{decimalPart}</span>
										</span>
									);
								})()}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-[#716860] text-base">5728-4801446999-22</span>
							<button
								onClick={handleCopy}
								className="flex items-center gap-1.5 text-[#211E1E] dark:text-white hover:opacity-80 transition-opacity"
							>
								{copied ? (
									<span className="text-xs text-[#A488F5] font-medium">Copied!</span>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path d="M15 5.625V16.875C15 17.0408 14.9342 17.1997 14.8169 17.3169C14.6997 17.4342 14.5408 17.5 14.375 17.5H3.125C2.95924 17.5 2.80027 17.4342 2.68306 17.3169C2.56585 17.1997 2.5 17.0408 2.5 16.875V5.625C2.5 5.45924 2.56585 5.30027 2.68306 5.18306C2.80027 5.06585 2.95924 5 3.125 5H14.375C14.5408 5 14.6997 5.06585 14.8169 5.18306C14.9342 5.30027 15 5.45924 15 5.625ZM16.875 2.5H5.625C5.45924 2.5 5.30027 2.56585 5.18306 2.68306C5.06585 2.80027 5 2.95924 5 3.125C5 3.29076 5.06585 3.44973 5.18306 3.56694C5.30027 3.68415 5.45924 3.75 5.625 3.75H16.25V14.375C16.25 14.5408 16.3158 14.6997 16.4331 14.8169C16.5503 14.9342 16.7092 15 16.875 15C17.0408 15 17.1997 14.9342 17.3169 14.8169C17.4342 14.6997 17.5 14.5408 17.5 14.375V3.125C17.5 2.95924 17.4342 2.80027 17.3169 2.68306C17.1997 2.56585 17.0408 2.5 16.875 2.5Z" fill="currentColor"/>
									</svg>
								)}
							</button>
						</div>
					</div>

					{/* Exchange Funds Section */}
					<div className="mb-4">
						<h3 className="text-[22px] font-normal text-foreground mb-4">Exchange funds</h3>

						{/* FROM Card */}
						<div className={`bg-white dark:bg-[#211E1E] rounded-lg p-4 ${hasNoFunds || exceedsBalance ? 'ring-1 ring-red-500' : ''}`}>
							<div className="flex items-center justify-between mb-1">
								<span className="text-foreground/70 text-base">From</span>
								<button className="flex items-center gap-1 text-foreground" onClick={openFromDrawer}>
									<img src={`/${fromCurrency.toLowerCase()}.png`} className="w-5 h-5 rounded-full object-cover flag-img" alt={fromCurrency} />
									<span className="text-sm font-normal">{fromCurrency} ({CURRENCY_INFO[fromCurrency].symbol})</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
								</button>
							</div>
							<div className="flex items-center justify-between">
								<input
									type="tel"
									inputMode="decimal"
									value={amount}
									onChange={handleAmountChange}
									placeholder="0.00"
									className={`text-3xl font-normal bg-transparent border-none outline-none w-full ${exceedsBalance ? 'text-red-500' : 'text-foreground'}`}
									style={{ caretColor: '#A488F5' }}
									disabled={hasNoFunds}
								/>
								{hasNoFunds ? (
									<span className="text-red-500 text-sm whitespace-nowrap ml-2">
										No funds available {formatCurrencyAmount(0, fromCurrency)}
									</span>
								) : exceedsBalance ? (
									<span className="text-red-500 text-sm whitespace-nowrap ml-2">
										Insufficient funds {formatCurrencyAmount(fromBalance, fromCurrency)}
									</span>
								) : (
									<span className="text-foreground/70 text-sm whitespace-nowrap ml-2">
										Balance {formatCurrencyAmount(fromBalance, fromCurrency)}
									</span>
								)}
							</div>
						</div>

					{/* Swap Button */}
					<div className="flex justify-center -my-5 relative z-10">
						<button
							onClick={handleSwap}
							disabled={!toCurrency}
							className="w-12 h-12 bg-white dark:bg-[#211E1E] rounded-full flex items-center justify-center border-4 border-[#F3F3F3] dark:border-black transition-colors"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 24 36" fill="none">
								<path d="M16.251 18.9092C16.4497 18.9093 16.6407 18.9884 16.7812 19.1289C16.9218 19.2695 17.001 19.4604 17.001 19.6592V24.9092H20.751C20.8992 24.9093 21.0438 24.9538 21.167 25.0361C21.2902 25.1185 21.3866 25.2351 21.4434 25.3721C21.5002 25.5091 21.5152 25.6602 21.4863 25.8057C21.4575 25.9511 21.386 26.0845 21.2812 26.1895L12.2812 35.1895C12.2117 35.2591 12.129 35.3148 12.0381 35.3525C11.9472 35.3902 11.8494 35.4101 11.751 35.4102C11.6524 35.4102 11.5539 35.3903 11.4629 35.3525C11.372 35.3148 11.2893 35.2591 11.2197 35.1895L2.21973 26.1895C2.11488 26.0846 2.04361 25.9511 2.01465 25.8057C1.98567 25.6601 1.99986 25.5092 2.05664 25.3721C2.11345 25.235 2.21054 25.1176 2.33398 25.0352C2.45734 24.9529 2.60272 24.9091 2.75098 24.9092H6.50098V19.6592C6.50099 19.4603 6.58006 19.2696 6.7207 19.1289C6.86133 18.9884 7.05217 18.9092 7.25098 18.9092H16.251ZM11.8418 0C11.9402 0.000985265 12.0374 0.0210471 12.1279 0.0595703C12.2186 0.0981638 12.3011 0.154228 12.3701 0.224609L21.2852 9.30859C21.3891 9.41442 21.4597 9.54859 21.4873 9.69434C21.5149 9.84016 21.4985 9.99135 21.4404 10.1279C21.3824 10.2644 21.2852 10.3807 21.1611 10.4619C21.0369 10.5432 20.8906 10.5855 20.7422 10.584L16.9932 10.5488L16.9434 15.7988C16.9415 15.9977 16.8607 16.1878 16.7188 16.3271C16.5768 16.4664 16.3853 16.5439 16.1865 16.542L7.18652 16.457C6.98781 16.455 6.79839 16.3743 6.65918 16.2324C6.51985 16.0905 6.44247 15.8991 6.44434 15.7002L6.49316 10.4502L2.74316 10.416C2.59496 10.4146 2.45058 10.3686 2.32812 10.2852C2.20564 10.2016 2.11015 10.0838 2.05469 9.94629C1.99919 9.80891 1.98554 9.65777 2.01562 9.5127C2.04585 9.36747 2.11879 9.23384 2.22461 9.12988L11.3086 0.214844C11.3789 0.145766 11.4623 0.0905994 11.5537 0.0537109C11.645 0.0168943 11.7433 -0.000921988 11.8418 0Z" fill={toCurrency ? '#A488F5' : '#716860'}/>
							</svg>
						</button>
					</div>

						{/* TO Card */}
						<div className="bg-white dark:bg-[#211E1E] rounded-lg p-4">
							<div className="flex items-center justify-between mb-1">
								<span className="text-foreground/70 text-base">To</span>
								<button className="flex items-center gap-1 text-foreground" onClick={openToDrawer}>
									{toCurrency ? (
										<>
											<img src={`/${toCurrency.toLowerCase()}.png`} className="w-5 h-5 rounded-full object-cover flag-img" alt={toCurrency} />
											<span className="text-sm font-normal">{toCurrency} ({CURRENCY_INFO[toCurrency].symbol})</span>
										</>
									) : (
										<span className="text-sm font-normal">Select currency</span>
									)}
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
								</button>
							</div>
							<div className="flex items-center justify-between">
								<span className={`text-3xl font-normal ${numAmount > 0 && toCurrency ? 'text-foreground' : 'text-[#716860]'}`}>
									{numAmount > 0 && toCurrency ? convertedAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
								</span>
								<span className="text-foreground/70 text-sm whitespace-nowrap ml-2">
									Balance {toCurrency ? formatCurrencyAmount(toBalance, toCurrency) : '0.00'}
								</span>
							</div>
						</div>

					{/* Exchange Rate */}
					<div className="mt-2">
						<p className="text-[#716860] text-sm">Exchange rate</p>
						{toCurrency ? (
							<p className="text-[#A488F5] text-base font-normal">
								1 {toCurrency} = {exchangeRate.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {fromCurrency}
							</p>
						) : (
							<p className="text-[#716860] text-base font-normal">-- --</p>
						)}
					</div>

					{/* Next Button */}
					<div className="mt-2 mb-4">
						<Button
							onClick={handleExchangeNext}
							disabled={!isValidExchange}
							className={`w-full h-14 text-xl rounded-lg font-normal ${
								isValidExchange
									? 'bg-[#A488F5] hover:bg-[#9575e8] text-white dark:text-black'
									: 'bg-[#2a2626] text-[#716860] cursor-not-allowed'
							}`}
						>
							Next
						</Button>
					</div>
					</div>

					{/* TRANSACTIONS */}
					<div className="mt-6">
						<div className="mb-4">
							<h2 className="text-[28px] font-normal text-foreground">Transactions</h2>
						</div>
						{filteredTransactions.length === 0 ? (
							<div className="opacity-50 text-sm">No transactions</div>
						) : (
							<div>
								{filteredTransactions.map((tr) => (
									<div
										key={tr.id}
										className="flex items-center gap-4 py-[12px] border-b border-[#E5E5EA] dark:border-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#1C1C1E]/30 transition-colors cursor-pointer"
									>
										<div className="w-12 h-12 rounded-lg bg-white dark:bg-[#2C2C2E] flex items-center justify-center flex-shrink-0">
											{getTransactionIcon(tr.type)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="text-xl font-normal text-foreground">
												{tr.type === 'exchange' && tr.fromCurrency && tr.toCurrency
													? <ExchangeLabel fromCurrency={tr.fromCurrency} toCurrency={tr.toCurrency} />
													: getTransactionLabel(tr.type)}
											</div>
											<div className="text-[#8E8E93] text-base">{formatDate(tr.date)}</div>
										</div>
										{tr.type === 'exchange' && tr.fromCurrency && tr.toCurrency ? (
											<div className="text-right">
												<div className="text-foreground text-lg font-normal">
													- {CURRENCY_INFO[tr.fromCurrency]?.symbol}{' '}
													{(tr.fromAmount || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
												</div>
												<div className="text-foreground text-sm font-normal">
													+ {tr.toCurrency}{' '}
													{(tr.toAmount || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
												</div>
											</div>
										) : (
											<div className="text-xl text-right font-normal text-foreground">
												{tr.amount > 0 ? "+" : "-"}£{Math.abs(tr.amount).toFixed(2)}
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Single shared Drawer for both From and To currency selection */}
			<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
				<DrawerContent className="bg-white dark:bg-[#1C1C1E] border-border max-w-[480px] mx-auto">
					<DrawerHeader>
						<DrawerTitle className="text-foreground text-xl font-normal">
							{drawerMode === 'from' ? 'Select currency' : 'Available currencies'}
						</DrawerTitle>
					</DrawerHeader>
					{drawerMode === 'to' && (
						<div className="px-4 pb-2">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#716860]" />
								<input
									type="text"
									placeholder="Type a currency"
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
									className="w-full pl-10 pr-4 py-3 bg-[#F3F3F3] dark:bg-[#2C2C2E] rounded-lg text-foreground placeholder:text-[#716860] outline-none border-none"
								/>
							</div>
						</div>
					)}
					<div className="px-4 pb-8 max-h-[400px] overflow-y-auto">
						{drawerCurrencies.map(code => {
							const info = CURRENCY_INFO[code];
							const isSelected = code === drawerSelected;
							return (
								<button
									key={code}
									onClick={() => handleCurrencySelect(code)}
									className={`w-full flex items-center justify-between py-4 px-2 rounded-lg transition-colors ${
										isSelected ? 'bg-[#F3F3F3] dark:bg-[#2C2C2E] border border-[#A488F5]' : ''
									}`}
								>
									<div className="flex items-center gap-3">
										<img src={`/${code.toLowerCase()}.png`} className="w-8 h-8 rounded-full object-cover flag-img" alt={code} />
										<span className="text-foreground text-base">
											{info.code} ({info.symbol})  {info.name}
										</span>
									</div>
									{isSelected && <Check className="w-5 h-5 text-[#A488F5]" />}
								</button>
							);
						})}
					</div>
				</DrawerContent>
			</Drawer>

			<BottomNavigation />
		</div>
	);
};

export default Convert;
