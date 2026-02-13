import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { useAccounts, AccountType } from '@/contexts/AccountContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Currency = {
  code: string;
  symbol: string;
  flag: string;
  locale: string;
};

const currencies: Record<string, Currency> = {
  GBP: { code: 'GBP', symbol: '£', flag: '🇬🇧', locale: 'en-GB' },
  EUR: { code: 'EUR', symbol: '€', flag: '🇪🇺', locale: 'de-DE' },
  USD: { code: 'USD', symbol: 'US$', flag: '🇺🇸', locale: 'en-US' },
  CAD: { code: 'CAD', symbol: 'CA$', flag: '🇨🇦', locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'A$', flag: '🇦🇺', locale: 'en-AU' },
  JPY: { code: 'JPY', symbol: '¥', flag: '🇯🇵', locale: 'ja-JP' },
  CHF: { code: 'CHF', symbol: 'CHF', flag: '🇨🇭', locale: 'de-CH' },
};

export const MoveFunds: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<string>('GBP');
  
  // Redirect to home if accessed without proper state
  if (!location.state?.sourceAccount || !location.state?.destinationAccount) {
    navigate('/', { replace: true });
    return null;
  }
  
  const { sourceAccount, destinationAccount } = location.state as { 
    sourceAccount: AccountType; 
    destinationAccount: AccountType 
  };
  
  const { accounts } = useAccounts();
  const source = accounts[sourceAccount];
  const destination = accounts[destinationAccount];

  const handleBack = () => {
    if (sourceAccount === 'pension') {
      navigate('/pension-warning');
    } else {
      navigate('/');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleNext = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= source.balance) {
      navigate('/review-transfer', { 
        state: { 
          amount: numAmount,
          sourceAccount,
          destinationAccount,
          currency
        } 
      });
    }
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount > 0 && numAmount <= source.balance;
  };

  const formatCurrency = (value: number) => {
    const selectedCurrency = currencies[currency];
    return `${selectedCurrency.symbol}${value.toLocaleString(selectedCurrency.locale, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
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
          <h1 className="flex-1 text-center text-xl font-normal pr-12 text-foreground">Move funds</h1>
        </header>

        {/* Amount Input Section */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-[#716860] text-xl mb-4">Enter amount to move</p>
          <input
            type="tel"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="text-6xl font-normal tracking-tight text-foreground bg-transparent border-none outline-none text-center w-full"
            style={{ caretColor: '#A488F5' }}
            autoFocus
          />
          
          {/* Currency Selector */}
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="mt-4 w-auto bg-white dark:bg-[#211E1E] border border-border text-foreground hover:bg-gray-50 dark:hover:bg-[#2a2626] transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currencies[currency].flag}</span>
                <SelectValue>
                  {currency} ({currencies[currency].symbol})
                </SelectValue>
                {/* <ChevronDown className="w-4 h-4 ml-1" /> */}
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#211E1E] border-border text-foreground">
              {Object.entries(currencies).map(([code, curr]) => (
                <SelectItem 
                  key={code} 
                  value={code}
                  className="hover:bg-gray-100 dark:hover:bg-[#2a2626] focus:bg-gray-100 dark:focus:bg-[#2a2626] focus:text-foreground cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{curr.flag}</span>
                    <span>{code} ({curr.symbol})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transfer Cards */}
        <div className="">
          {/* Move From Card */}
          <div className="bg-white dark:bg-[#211E1E] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 flex items-center justify-center bg-[#211E1E] dark:bg-[#000] rounded-[4px]"
                style={{ color: source.color }}
              >
                <span className="text-2xl">{source.icon}</span>
              </div>
              <div>
                <p className="text-[#716860] text-base">Move from</p>
                <p className="text-foreground text-xl font-normal">{source.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#716860] text-base">Balance</p>
              <p className="text-foreground text-xl font-normal">{formatCurrency(source.balance)}</p>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-5 relative z-10">
            <button className="w-12 h-12 bg-white dark:bg-[#211E1E] rounded-full flex items-center justify-center border-4 border-[#F3F3F3] dark:border-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6.74998 3.75C6.74998 3.55109 6.829 3.36032 6.96965 3.21967C7.1103 3.07902 7.30107 3 7.49998 3H16.5C16.6989 3 16.8897 3.07902 17.0303 3.21967C17.171 3.36032 17.25 3.55109 17.25 3.75C17.25 3.94891 17.171 4.13968 17.0303 4.28033C16.8897 4.42098 16.6989 4.5 16.5 4.5H7.49998C7.30107 4.5 7.1103 4.42098 6.96965 4.28033C6.829 4.13968 6.74998 3.94891 6.74998 3.75ZM21.6928 12.4631C21.6361 12.3261 21.54 12.2089 21.4166 12.1265C21.2933 12.044 21.1483 12 21 12H17.25V6.75C17.25 6.55109 17.171 6.36032 17.0303 6.21967C16.8897 6.07902 16.6989 6 16.5 6H7.49998C7.30107 6 7.1103 6.07902 6.96965 6.21967C6.829 6.36032 6.74998 6.55109 6.74998 6.75V12H2.99998C2.85156 11.9999 2.70644 12.0438 2.58299 12.1262C2.45955 12.2086 2.36333 12.3258 2.30651 12.4629C2.2497 12.6 2.23485 12.7509 2.26383 12.8965C2.29282 13.042 2.36435 13.1757 2.46936 13.2806L11.4694 22.2806C11.539 22.3504 11.6217 22.4057 11.7128 22.4434C11.8038 22.4812 11.9014 22.5006 12 22.5006C12.0985 22.5006 12.1961 22.4812 12.2872 22.4434C12.3782 22.4057 12.461 22.3504 12.5306 22.2806L21.5306 13.2806C21.6355 13.1757 21.7068 13.042 21.7357 12.8965C21.7646 12.751 21.7496 12.6002 21.6928 12.4631Z" fill="#716860"/>
            </svg>
            </button>
          </div>

          {/* Move To Card */}
          <div className="bg-white dark:bg-[#211E1E] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 flex items-center justify-center bg-[#211E1E] dark:bg-[#000] rounded-[4px]"
                style={{ color: destination.color }}
              >
                <span className="text-2xl">{destination.icon}</span>
              </div>
              <div>
                <p className="text-[#716860] text-base">Move to</p>
                <p className="text-foreground text-xl font-normal">{destination.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#716860] text-base">Balance</p>
              <p className="text-foreground text-xl font-normal">{formatCurrency(destination.balance)}</p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6 mb-6">
          <Button 
            onClick={handleNext}
            disabled={!isValidAmount()}
            className={`w-full h-14 text-xl rounded-lg font-normal ${
              isValidAmount() 
                ? 'bg-[#A488F5] hover:bg-[#9575e8] text-white' 
                : 'bg-[#2a2626] text-[#716860] cursor-not-allowed'
            }`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoveFunds;
