import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccounts, AccountType } from "@/contexts/AccountContext";
import { ArrowLeft, ArrowDown, ArrowUp, ArrowRightLeft } from "lucide-react";
import { CreditCard } from "@/components/CreditCard";
import { AccountActions } from "@/components/AccountActions";

export const currentAccountActions = [
	{
		label: "Transfer",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M21.5306 10.2812L17.0306 14.7812C16.8899 14.9219 16.699 15.001 16.5 15.001C16.301 15.001 16.1101 14.9219 15.9694 14.7812C15.8286 14.6405 15.7496 14.4496 15.7496 14.2506C15.7496 14.0516 15.8286 13.8607 15.9694 13.72L19.9397 9.75059L15.9694 5.78122C15.8997 5.71153 15.8444 5.62881 15.8067 5.53776C15.769 5.44672 15.7496 5.34914 15.7496 5.25059C15.7496 5.15204 15.769 5.05446 15.8067 4.96342C15.8444 4.87237 15.8997 4.78965 15.9694 4.71997C16.1101 4.57924 16.301 4.50017 16.5 4.50017C16.5985 4.50017 16.6961 4.51958 16.7872 4.5573C16.8782 4.59501 16.9609 4.65028 17.0306 4.71997L21.5306 9.21997C21.6004 9.28962 21.6557 9.37234 21.6934 9.46339C21.7312 9.55443 21.7506 9.65203 21.7506 9.75059C21.7506 9.84915 21.7312 9.94675 21.6934 10.0378C21.6557 10.1288 21.6004 10.2116 21.5306 10.2812ZM17.0306 9.21997L12.5306 4.71997C12.4257 4.61496 12.292 4.54343 12.1465 4.51444C12.0009 4.48546 11.85 4.50031 11.7129 4.55712C11.5758 4.61394 11.4586 4.71016 11.3762 4.8336C11.2938 4.95705 11.2499 5.10217 11.25 5.25059V9.02872C8.80232 9.22084 6.51685 10.328 4.84893 12.1297C3.18101 13.9314 2.25308 16.2954 2.25 18.7506C2.25 18.9495 2.32902 19.1403 2.46967 19.2809C2.61032 19.4216 2.80109 19.5006 3 19.5006C3.19891 19.5006 3.38968 19.4216 3.53033 19.2809C3.67098 19.1403 3.75 18.9495 3.75 18.7506C3.75247 16.6932 4.52267 14.7107 5.90984 13.1912C7.29701 11.6718 9.2013 10.7247 11.25 10.5353V14.2506C11.2499 14.399 11.2938 14.5441 11.3762 14.6676C11.4586 14.791 11.5758 14.8872 11.7129 14.9441C11.85 15.0009 12.0009 15.0157 12.1465 14.9867C12.292 14.9578 12.4257 14.8862 12.5306 14.7812L17.0306 10.2812C17.1004 10.2116 17.1557 10.1288 17.1934 10.0378C17.2312 9.94675 17.2506 9.84915 17.2506 9.75059C17.2506 9.65203 17.2312 9.55443 17.1934 9.46339C17.1557 9.37234 17.1004 9.28962 17.0306 9.21997Z"
					fill="currentColor"
				/>
			</svg>
		),
	},
	{
		label: "Request",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<g clipPath="url(#clip0_854_3578)">
					<path
						d="M21.5934 13.2244C21.3145 13.0095 20.9896 12.8619 20.6442 12.7931C20.2988 12.7243 19.9422 12.7362 19.6022 12.8278L15.6797 13.7297C15.7709 13.3442 15.7738 12.943 15.6879 12.5563C15.6021 12.1695 15.4298 11.8072 15.1841 11.4965C14.9383 11.1858 14.6254 10.9347 14.2688 10.7622C13.9122 10.5896 13.5212 10.5 13.125 10.5H8.43188C8.03775 10.499 7.64733 10.5761 7.28319 10.7269C6.91904 10.8777 6.58838 11.0991 6.31031 11.3784L4.18969 13.5H1.5C1.10218 13.5 0.720644 13.658 0.43934 13.9393C0.158035 14.2206 0 14.6022 0 15L0 18.75C0 19.1478 0.158035 19.5294 0.43934 19.8107C0.720644 20.092 1.10218 20.25 1.5 20.25H11.25C11.3113 20.25 11.3724 20.2425 11.4319 20.2275L17.4319 18.7275C17.4701 18.7184 17.5075 18.7058 17.5434 18.69L21.1875 17.1394L21.2288 17.1206C21.579 16.9456 21.8789 16.6843 22.1002 16.3614C22.3215 16.0385 22.457 15.6645 22.4939 15.2747C22.5307 14.8849 22.4678 14.4922 22.3109 14.1335C22.154 13.7748 21.9084 13.4619 21.5972 13.2244H21.5934ZM20.5716 15.7697L17.0091 17.2866L11.1562 18.75H5.25V14.5603L7.37156 12.4397C7.51035 12.2998 7.67555 12.1889 7.85758 12.1134C8.03961 12.0379 8.23482 11.9994 8.43188 12H13.125C13.4234 12 13.7095 12.1185 13.9205 12.3295C14.1315 12.5405 14.25 12.8266 14.25 13.125C14.25 13.4234 14.1315 13.7095 13.9205 13.9205C13.7095 14.1315 13.4234 14.25 13.125 14.25H10.5C10.3011 14.25 10.1103 14.329 9.96967 14.4697C9.82902 14.6103 9.75 14.8011 9.75 15C9.75 15.1989 9.82902 15.3897 9.96967 15.5303C10.1103 15.671 10.3011 15.75 10.5 15.75H13.5C13.5565 15.7498 13.6127 15.7436 13.6678 15.7313L19.9491 14.2866L19.9781 14.2791C20.1699 14.2258 20.3745 14.2454 20.5527 14.334C20.7309 14.4226 20.87 14.5739 20.9433 14.7589C21.0167 14.9439 21.0189 15.1495 20.9498 15.3361C20.8806 15.5227 20.7449 15.6771 20.5687 15.7697H20.5716ZM14.4694 7.28063C14.3286 7.13989 14.2496 6.94902 14.2496 6.75C14.2496 6.55098 14.3286 6.36011 14.4694 6.21937C14.6101 6.07864 14.801 5.99958 15 5.99958C15.199 5.99958 15.3899 6.07864 15.5306 6.21937L17.25 7.93969V2.25C17.25 2.05109 17.329 1.86032 17.4697 1.71967C17.6103 1.57902 17.8011 1.5 18 1.5C18.1989 1.5 18.3897 1.57902 18.5303 1.71967C18.671 1.86032 18.75 2.05109 18.75 2.25V7.93969L20.4694 6.21937C20.6101 6.07864 20.801 5.99958 21 5.99958C21.199 5.99958 21.3899 6.07864 21.5306 6.21937C21.6714 6.36011 21.7504 6.55098 21.7504 6.75C21.7504 6.94902 21.6714 7.13989 21.5306 7.28063L18.5306 10.2806C18.461 10.3504 18.3783 10.4057 18.2872 10.4434C18.1962 10.4812 18.0986 10.5006 18 10.5006C17.9014 10.5006 17.8038 10.4812 17.7128 10.4434C17.6217 10.4057 17.539 10.3504 17.4694 10.2806L14.4694 7.28063Z"
						fill="currentColor"
					/>
				</g>
				<defs>
					<clipPath id="clip0_854_3578">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		),
	},
	{
		label: "Exchange",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M22.5459 16.4531C22.6508 16.5576 22.734 16.6818 22.7908 16.8186C22.8476 16.9553 22.8768 17.1019 22.8768 17.25C22.8768 17.3981 22.8476 17.5447 22.7908 17.6814C22.734 17.8182 22.6508 17.9424 22.5459 18.0469L20.2959 20.2969C20.0846 20.5082 19.7979 20.627 19.4991 20.627C19.2002 20.627 18.9135 20.5082 18.7022 20.2969C18.4908 20.0855 18.3721 19.7989 18.3721 19.5C18.3721 19.2011 18.4908 18.9145 18.7022 18.7031L19.0312 18.3741H15.75C15.5712 18.3743 15.3949 18.3318 15.2358 18.2503C15.0767 18.1688 14.9393 18.0505 14.835 17.9053L7.67062 7.87406H3C2.70163 7.87406 2.41548 7.75553 2.2045 7.54456C1.99353 7.33358 1.875 7.04743 1.875 6.74906C1.875 6.45069 1.99353 6.16454 2.2045 5.95357C2.41548 5.74259 2.70163 5.62406 3 5.62406H8.25C8.42879 5.62386 8.60505 5.66628 8.76418 5.7478C8.9233 5.82932 9.06071 5.94759 9.165 6.09281L16.3294 16.1241H19.0312L18.7013 15.795C18.4899 15.5837 18.3712 15.297 18.3712 14.9981C18.3712 14.6992 18.4899 14.4126 18.7013 14.2012C18.9126 13.9899 19.1992 13.8712 19.4981 13.8712C19.797 13.8712 20.0837 13.9899 20.295 14.2012L22.5459 16.4531ZM10.35 14.3091C10.2298 14.2232 10.0938 14.1618 9.94989 14.1285C9.80596 14.0952 9.65687 14.0905 9.51114 14.1148C9.36541 14.1391 9.22589 14.1918 9.10055 14.2701C8.9752 14.3483 8.8665 14.4504 8.78063 14.5706L7.67062 16.1241H3C2.70163 16.1241 2.41548 16.2426 2.2045 16.4536C1.99353 16.6645 1.875 16.9507 1.875 17.2491C1.875 17.5474 1.99353 17.8336 2.2045 18.0446C2.41548 18.2555 2.70163 18.3741 3 18.3741H8.25C8.42879 18.3743 8.60505 18.3318 8.76418 18.2503C8.9233 18.1688 9.06071 18.0505 9.165 17.9053L10.6116 15.8812C10.6979 15.7609 10.7596 15.6248 10.7932 15.4806C10.8267 15.3363 10.8315 15.1869 10.8072 15.0408C10.7829 14.8948 10.73 14.755 10.6516 14.6294C10.5731 14.5038 10.4706 14.3949 10.35 14.3091ZM13.65 9.68906C13.7702 9.77494 13.9062 9.83629 14.0501 9.86962C14.194 9.90295 14.3431 9.90761 14.4889 9.88332C14.6346 9.85903 14.7741 9.80627 14.8995 9.72806C15.0248 9.64985 15.1335 9.54772 15.2194 9.4275L16.3294 7.87406H19.0312L18.7013 8.20312C18.4899 8.41447 18.3712 8.70111 18.3712 9C18.3712 9.29888 18.4899 9.58553 18.7013 9.79687C18.9126 10.0082 19.1992 10.1269 19.4981 10.1269C19.797 10.1269 20.0837 10.0082 20.295 9.79687L22.545 7.54687C22.6499 7.44236 22.7331 7.31817 22.7899 7.18142C22.8467 7.04467 22.8759 6.89806 22.8759 6.75C22.8759 6.60193 22.8467 6.45532 22.7899 6.31858C22.7331 6.18183 22.6499 6.05764 22.545 5.95312L20.295 3.70312C20.0837 3.49178 19.797 3.37305 19.4981 3.37305C19.1992 3.37305 18.9126 3.49178 18.7013 3.70312C18.4899 3.91447 18.3712 4.20111 18.3712 4.5C18.3712 4.79888 18.4899 5.08553 18.7013 5.29687L19.0312 5.62406H15.75C15.5712 5.62386 15.3949 5.66628 15.2358 5.7478C15.0767 5.82932 14.9393 5.94759 14.835 6.09281L13.3884 8.11781C13.3023 8.23809 13.2407 8.37419 13.2072 8.51831C13.1737 8.66243 13.169 8.81174 13.1933 8.9577C13.2176 9.10365 13.2704 9.24338 13.3488 9.36888C13.4272 9.49437 13.5295 9.60318 13.65 9.68906Z"
					fill="currentColor"
				/>
			</svg>
		),
	},
	{
		label: "Top up",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M19.5459 13.4541C19.7573 13.6654 19.876 13.9521 19.876 14.2509C19.876 14.5498 19.7573 14.8365 19.5459 15.0478C19.3346 15.2592 19.0479 15.3779 18.7491 15.3779C18.4502 15.3779 18.1635 15.2592 17.9522 15.0478L13.125 10.2188V21C13.125 21.2984 13.0065 21.5845 12.7955 21.7955C12.5845 22.0065 12.2984 22.125 12 22.125C11.7016 22.125 11.4155 22.0065 11.2045 21.7955C10.9935 21.5845 10.875 21.2984 10.875 21V10.2188L6.04594 15.0459C5.83459 15.2573 5.54795 15.376 5.24906 15.376C4.95018 15.376 4.66353 15.2573 4.45219 15.0459C4.24084 14.8346 4.12211 14.5479 4.12211 14.2491C4.12211 13.9502 4.24084 13.6635 4.45219 13.4522L11.2022 6.70219C11.3067 6.59731 11.4309 6.51409 11.5676 6.45731C11.7044 6.40053 11.851 6.3713 11.9991 6.3713C12.1471 6.3713 12.2937 6.40053 12.4305 6.45731C12.5672 6.51409 12.6914 6.59731 12.7959 6.70219L19.5459 13.4541ZM20.25 2.625H3.75C3.45163 2.625 3.16548 2.74353 2.9545 2.9545C2.74353 3.16548 2.625 3.45163 2.625 3.75C2.625 4.04837 2.74353 4.33452 2.9545 4.5455C3.16548 4.75647 3.45163 4.875 3.75 4.875H20.25C20.5484 4.875 20.8345 4.75647 21.0455 4.5455C21.2565 4.33452 21.375 4.04837 21.375 3.75C21.375 3.45163 21.2565 3.16548 21.0455 2.9545C20.8345 2.74353 20.5484 2.625 20.25 2.625Z"
					fill="currentColor"
				/>
			</svg>
		),
	},
	{
		label: "Withdraw",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M4.45406 10.5459C4.24272 10.3346 4.12399 10.0479 4.12399 9.74906C4.12399 9.45018 4.24272 9.16353 4.45406 8.95219C4.66541 8.74084 4.95205 8.62211 5.25094 8.62211C5.54982 8.62211 5.83647 8.74084 6.04781 8.95219L10.875 13.7812V3C10.875 2.70163 10.9935 2.41548 11.2045 2.2045C11.4155 1.99353 11.7016 1.875 12 1.875C12.2984 1.875 12.5845 1.99353 12.7955 2.2045C13.0065 2.41548 13.125 2.70163 13.125 3V13.7812L17.9541 8.95125C18.1654 8.73991 18.4521 8.62117 18.7509 8.62117C19.0498 8.62117 19.3365 8.73991 19.5478 8.95125C19.7592 9.16259 19.8779 9.44924 19.8779 9.74813C19.8779 10.047 19.7592 10.3337 19.5478 10.545L12.7978 17.295C12.6933 17.3999 12.5691 17.4831 12.4324 17.5399C12.2956 17.5967 12.149 17.6259 12.0009 17.6259C11.8529 17.6259 11.7063 17.5967 11.5695 17.5399C11.4328 17.4831 11.3086 17.3999 11.2041 17.295L4.45406 10.5459ZM20.25 19.125H3.75C3.45163 19.125 3.16548 19.2435 2.9545 19.4545C2.74353 19.6655 2.625 19.9516 2.625 20.25C2.625 20.5484 2.74353 20.8345 2.9545 21.0455C3.16548 21.2565 3.45163 21.375 3.75 21.375H20.25C20.5484 21.375 20.8345 21.2565 21.0455 21.0455C21.2565 20.8345 21.375 20.5484 21.375 20.25C21.375 19.9516 21.2565 19.6655 21.0455 19.4545C20.8345 19.2435 20.5484 19.125 20.25 19.125Z"
					fill="currentColor"
				/>
			</svg>
		),
	},
];

const accountConfig: Record<
	AccountType,
	{
		display: string;
		subtitle: string;
		showCard: boolean;
		actions?: { label: string; icon: React.ReactNode }[];
		moveFundsButton?: boolean;
	}
> = {
	currentAccount: {
		display: "Current account",
		subtitle: "Funds available to spend",
		showCard: true,
		actions: currentAccountActions,
	},
	savings: {
		display: "Savings account",
		subtitle: "High Interest Savings (Tax Free)",
		showCard: false,
		moveFundsButton: true,
	},
	pension: {
		display: "Pension",
		subtitle: "Your Pension and Investments",
		showCard: false,
		moveFundsButton: true,
	},
};

function formatCurrency(value: number) {
	return `£${value.toLocaleString("en-GB", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

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
			return (
				<ArrowRightLeft className="w-5 h-5 text-[#211E1E] dark:text-white" />
			);
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

function getMoveFundsButtonStyles(
	accountId: AccountType,
	accountColor: string
) {
	if (accountId === "pension") {
		return {
			className:
				"w-full py-4 rounded-lg mb-4 font-regular text-base flex items-center justify-center gap-2 bg-[#211E1E] text-white dark:bg-white dark:text-black",
			style: {},
		};
	}

	return {
		className:
			"w-full py-4 rounded-lg mb-4 font-regular text-white text-base flex items-center justify-center gap-2",
		style: { backgroundColor: accountColor },
	};
}

const AccountDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { accounts, transactions } = useAccounts();
	const accountId = id as AccountType;

	if (!accountId || !(accountId in accounts)) {
		return <div className="text-white p-8">Invalid account</div>;
	}

	const config = accountConfig[accountId];
	const account = accounts[accountId];
	const filteredTransactions = transactions
		.filter((t) => t.account === accountId)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	// const handleMoveFunds = () => {
	// 	let destinationAccount: AccountType;

	// 	if (accountId === "pension") {
	// 		destinationAccount = "savings";
	// 	} else if (accountId === "savings") {
	// 		destinationAccount = "currentAccount";
	// 	} else {
	// 		return;
	// 	}

	// 	navigate("/move-funds", {
	// 		state: {
	// 			sourceAccount: accountId,
	// 			destinationAccount,
	// 		},
	// 	});
	// };
	const handleMoveFunds = () => {
		let destinationAccount: AccountType;

		// Ako je izvor pension, prvo prikaži upozorenje
		if (accountId === "pension") {
			navigate("/pension-warning");
			return;
		} else if (accountId === "savings") {
			destinationAccount = "currentAccount";
		} else {
			return;
		}

		navigate("/move-funds", {
			state: {
				sourceAccount: accountId,
				destinationAccount,
			},
		});
	};

	return (
		<div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col">
			<div className="px-4 py-6 flex flex-col flex-1">
				<button
					className="mb-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black"
					onClick={() => navigate("/")}
				>
					<ArrowLeft className="w-6 h-6" />
				</button>
				<div>
					{/* <div className="mb-2 text-sm opacity-50">{config.display}</div> */}
					<div className="text-[28px] mb-4 font-normal">{config.display}</div>
					<div className="rounded-lg bg-white dark:bg-[#211E1E] flex items-center justify-between pt-2 pb-2 pl-2 pr-5 mb-4">
						<div className="flex items-center gap-2">
							{/* TODO: Icon if needed */}
							<div
								className="w-12 h-12 flex items-center justify-center bg-[#000] dark:bg-[#000] rounded-[4px]"
								style={{ color: account.color }}
							>
								<span className="text-2xl">{account.icon}</span>
							</div>
							<span className="text-xl font-normal text-foreground">Balance</span>
						</div>
						<div className="text-lg ml-2 font-normal text-foreground">
							{formatCurrency(account.balance)}
						</div>
					</div>
					{config.showCard && (
						<div className="mb-4">
							<CreditCard
								cardholderName="Peter Smith"
								cardNumber="4562"
								validUntil="04/28"
								cvv="***"
								bankName="Mercer"
								cardType="freedom"
							/>
						</div>
					)}
					{/* Actions */}
					{config.actions && (
						<div className="mb-6">
							<AccountActions actions={config.actions} />
						</div>
					)}
					{config.moveFundsButton &&
						(() => {
							const buttonStyles = getMoveFundsButtonStyles(
								accountId,
								account.color
							);
							return (
								<button
									onClick={handleMoveFunds}
									className={buttonStyles.className}
									style={buttonStyles.style}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
									>
										<path
											d="M3.30806 6.69268C3.24995 6.63463 3.20385 6.5657 3.1724 6.48983C3.14095 6.41396 3.12476 6.33263 3.12476 6.25049C3.12476 6.16836 3.14095 6.08703 3.1724 6.01115C3.20385 5.93528 3.24995 5.86635 3.30806 5.8083L5.80806 3.3083C5.89547 3.2208 6.00688 3.16119 6.12818 3.13704C6.24948 3.11288 6.37523 3.12526 6.48949 3.1726C6.60376 3.21995 6.7014 3.30013 6.77007 3.403C6.83874 3.50587 6.87535 3.62681 6.87525 3.75049V5.62549H16.2502C16.416 5.62549 16.575 5.69134 16.6922 5.80855C16.8094 5.92576 16.8752 6.08473 16.8752 6.25049C16.8752 6.41625 16.8094 6.57522 16.6922 6.69243C16.575 6.80964 16.416 6.87549 16.2502 6.87549H6.87525V8.75049C6.87535 8.87418 6.83874 8.99511 6.77007 9.09798C6.7014 9.20085 6.60376 9.28104 6.48949 9.32838C6.37523 9.37573 6.24948 9.3881 6.12818 9.36395C6.00688 9.33979 5.89547 9.28019 5.80806 9.19268L3.30806 6.69268ZM16.6924 13.3083L14.1924 10.8083C14.105 10.7208 13.9936 10.6612 13.8723 10.637C13.751 10.6129 13.6253 10.6253 13.511 10.6726C13.3967 10.7199 13.2991 10.8001 13.2304 10.903C13.1618 11.0059 13.1252 11.1268 13.1252 11.2505V13.1255H3.75025C3.58449 13.1255 3.42552 13.1913 3.30831 13.3085C3.1911 13.4258 3.12525 13.5847 3.12525 13.7505C3.12525 13.9163 3.1911 14.0752 3.30831 14.1924C3.42552 14.3096 3.58449 14.3755 3.75025 14.3755H13.1252V16.2505C13.1252 16.3742 13.1618 16.4951 13.2304 16.598C13.2991 16.7009 13.3967 16.781 13.511 16.8284C13.6253 16.8757 13.751 16.8881 13.8723 16.8639C13.9936 16.8398 14.105 16.7802 14.1924 16.6927L16.6924 14.1927C16.7505 14.1346 16.7966 14.0657 16.8281 13.9898C16.8596 13.914 16.8757 13.8326 16.8757 13.7505C16.8757 13.6684 16.8596 13.587 16.8281 13.5112C16.7966 13.4353 16.7505 13.3664 16.6924 13.3083Z"
											fill="currentColor"
										/>
									</svg>
									<span className="text-xl">Move funds</span>
								</button>
							);
						})()}
					{/* TRANSACTIONS */}
					<div className="mt-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-normal text-foreground">
								Transactions
							</h2>
							<button
								className="self-stretch flex items-center gap-1 text-lg text-[#A488F5] font-normal my-auto hover:text-[#9575e8] transition-colors"
								onClick={() => navigate("/budgeting")}
							>
								<span className="text-[#A488F5] self-stretch my-auto text-base font-normal">
									View budget
								</span>
								<img
									src="https://api.builder.io/api/v1/image/assets/TEMP/c7bef006abc66b8f7fa6574d6a4853ed2994e5d2?placeholderIfAbsent=true"
									className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
									alt=""
								/>
							</button>
						</div>
						{/* <div className="font-semibold mb-3">Transactions</div> */}
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
												{getTransactionLabel(tr.type)}
											</div>
											<div className="text-[#8E8E93] text-base">
												{formatDate(tr.date)}
											</div>
										</div>
										<div
											className={`text-xl text-right font-normal ${
												tr.amount > 0 ? "text-[#34C759]" : "text-foreground"
											}`}
										>
											{tr.amount > 0 ? "+" : "-"}£
											{Math.abs(tr.amount).toFixed(2)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountDetail;
