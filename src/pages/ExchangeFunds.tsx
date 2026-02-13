import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Check } from 'lucide-react';
import { useAccounts, CURRENCY_INFO, WALLET_CURRENCIES, convertCurrency, getExchangeRate } from '@/contexts/AccountContext';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const ALL_CURRENCIES = Object.keys(CURRENCY_INFO);

export const ExchangeFunds: React.FC = () => {
  const navigate = useNavigate();
  const { accounts } = useAccounts();
  const [fromCurrency, setFromCurrency] = useState<string>('GBP');
  const [toCurrency, setToCurrency] = useState<string>('AED');
  const [amount, setAmount] = useState('');
  const [fromCurrencyDrawerOpen, setFromCurrencyDrawerOpen] = useState(false);
  const [toCurrencyDrawerOpen, setToCurrencyDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentAccount = accounts.currentAccount;
  const currencyBalances = currentAccount.currencyBalances || { GBP: currentAccount.balance, EUR: 0, USD: 0 };
  
  const fromBalance = currencyBalances[fromCurrency] || 0;
  const toBalance = currencyBalances[toCurrency] || 0;

  const numAmount = parseFloat(amount) || 0;
  const convertedAmount = useMemo(() => {
    if (numAmount <= 0) return 0;
    return convertCurrency(fromCurrency, toCurrency, numAmount);
  }, [numAmount, fromCurrency, toCurrency]);

  // Exchange rate: 1 toCurrency = X fromCurrency
  const exchangeRate = useMemo(() => {
    return getExchangeRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  const isValidAmount = numAmount > 0 && numAmount <= fromBalance;

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

  const handleNext = () => {
    if (isValidAmount) {
      navigate('/exchange-review', {
        state: {
          fromCurrency,
          toCurrency,
          fromAmount: numAmount,
          toAmount: convertedAmount,
        }
      });
    }
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
    // If toCurrency is same as new fromCurrency, swap
    if (toCurrency === value) {
      setToCurrency(fromCurrency);
    }
  };

  const handleFromCurrencySelect = (code: string) => {
    handleFromCurrencyChange(code);
    setFromCurrencyDrawerOpen(false);
  };

  const handleToCurrencySelect = (code: string) => {
    setToCurrency(code);
    setToCurrencyDrawerOpen(false);
    setSearchQuery('');
  };

  const formatCurrencyAmount = (value: number, currCode: string) => {
    const info = CURRENCY_INFO[currCode];
    if (currCode === 'JPY') {
      return `${info.symbol}${Math.round(value).toLocaleString('en-GB')}`;
    }
    return `${info.symbol}${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col">
      <div className="px-4 py-6 flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-white dark:bg-[#211E1E] flex items-center justify-center text-black dark:text-white"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center text-xl font-normal pr-12 text-foreground">Exchange funds</h1>
        </header>

        {/* Exchange Cards */}
        <div className="">
          {/* FROM Card */}
          <div className="bg-white dark:bg-[#211E1E] rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#716860] text-base">From</span>
              <Drawer open={fromCurrencyDrawerOpen} onOpenChange={setFromCurrencyDrawerOpen}>
                <DrawerTrigger asChild>
                  <button className="flex items-center gap-1 text-foreground">
                    <span className="text-lg">{CURRENCY_INFO[fromCurrency].flag}</span>
                    <span className="text-sm font-normal">{fromCurrency} ({CURRENCY_INFO[fromCurrency].symbol})</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="bg-white dark:bg-[#1C1C1E] border-border max-w-[480px] mx-auto">
                  <DrawerHeader>
                    <DrawerTitle className="text-foreground text-xl font-normal">Select currency</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-8">
                    {WALLET_CURRENCIES.map(code => {
                      const info = CURRENCY_INFO[code];
                      const isSelected = code === fromCurrency;
                      return (
                        <button
                          key={code}
                          onClick={() => handleFromCurrencySelect(code)}
                          className={`w-full flex items-center justify-between py-4 px-2 rounded-lg transition-colors ${
                            isSelected ? 'bg-[#F3F3F3] dark:bg-[#2C2C2E] border border-[#A488F5]' : 'hover:bg-[#F3F3F3] dark:hover:bg-[#2C2C2E]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{info.flag}</span>
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
            </div>
            <div className="flex items-center justify-between">
              <input
                type="tel"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="text-3xl font-normal text-foreground bg-transparent border-none outline-none w-full"
                style={{ caretColor: '#A488F5' }}
                autoFocus
              />
              <span className="text-[#716860] text-sm whitespace-nowrap ml-2">
                Balance {formatCurrencyAmount(fromBalance, fromCurrency)}
              </span>
            </div>
          </div>

          {/* Swap Indicator */}
          <div className="flex justify-center -my-5 relative z-10">
            <div className="w-12 h-12 bg-white dark:bg-[#211E1E] rounded-full flex items-center justify-center border-4 border-[#F3F3F3] dark:border-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6.74998 3.75C6.74998 3.55109 6.829 3.36032 6.96965 3.21967C7.1103 3.07902 7.30107 3 7.49998 3H16.5C16.6989 3 16.8897 3.07902 17.0303 3.21967C17.171 3.36032 17.25 3.55109 17.25 3.75C17.25 3.94891 17.171 4.13968 17.0303 4.28033C16.8897 4.42098 16.6989 4.5 16.5 4.5H7.49998C7.30107 4.5 7.1103 4.42098 6.96965 4.28033C6.829 4.13968 6.74998 3.94891 6.74998 3.75ZM21.6928 12.4631C21.6361 12.3261 21.54 12.2089 21.4166 12.1265C21.2933 12.044 21.1483 12 21 12H17.25V6.75C17.25 6.55109 17.171 6.36032 17.0303 6.21967C16.8897 6.07902 16.6989 6 16.5 6H7.49998C7.30107 6 7.1103 6.07902 6.96965 6.21967C6.829 6.36032 6.74998 6.55109 6.74998 6.75V12H2.99998C2.85156 11.9999 2.70644 12.0438 2.58299 12.1262C2.45955 12.2086 2.36333 12.3258 2.30651 12.4629C2.2497 12.6 2.23485 12.7509 2.26383 12.8965C2.29282 13.042 2.36435 13.1757 2.46936 13.2806L11.4694 22.2806C11.539 22.3504 11.6217 22.4057 11.7128 22.4434C11.8038 22.4812 11.9014 22.5006 12 22.5006C12.0985 22.5006 12.1961 22.4812 12.2872 22.4434C12.3782 22.4057 12.461 22.3504 12.5306 22.2806L21.5306 13.2806C21.6355 13.1757 21.7068 13.042 21.7357 12.8965C21.7646 12.751 21.7496 12.6002 21.6928 12.4631Z" fill="#716860"/>
              </svg>
            </div>
          </div>

          {/* TO Card */}
          <div className="bg-white dark:bg-[#211E1E] rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#716860] text-base">To</span>
              <Drawer open={toCurrencyDrawerOpen} onOpenChange={setToCurrencyDrawerOpen}>
                <DrawerTrigger asChild>
                  <button className="flex items-center gap-1 text-foreground">
                    <span className="text-lg">{CURRENCY_INFO[toCurrency].flag}</span>
                    <span className="text-sm font-normal">{toCurrency} ({CURRENCY_INFO[toCurrency].symbol})</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="bg-white dark:bg-[#1C1C1E] border-border max-w-[480px] mx-auto">
                  <DrawerHeader>
                    <DrawerTitle className="text-foreground text-xl font-normal">Available currencies</DrawerTitle>
                  </DrawerHeader>
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
                  <div className="px-4 pb-8 max-h-[400px] overflow-y-auto">
                    {filteredToCurrencies.map(code => {
                      const info = CURRENCY_INFO[code];
                      const isSelected = code === toCurrency;
                      return (
                        <button
                          key={code}
                          onClick={() => handleToCurrencySelect(code)}
                          className={`w-full flex items-center justify-between py-4 px-2 rounded-lg transition-colors ${
                            isSelected ? 'bg-[#F3F3F3] dark:bg-[#2C2C2E] border border-[#A488F5]' : 'hover:bg-[#F3F3F3] dark:hover:bg-[#2C2C2E]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{info.flag}</span>
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
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-normal text-foreground">
                {numAmount > 0 ? convertedAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </span>
              <span className="text-[#716860] text-sm whitespace-nowrap ml-2">
                Balance {formatCurrencyAmount(toBalance, toCurrency)}
              </span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6 mb-4">
          <Button
            onClick={handleNext}
            disabled={!isValidAmount}
            className={`w-full h-14 text-xl rounded-lg font-normal ${
              isValidAmount
                ? 'bg-[#A488F5] hover:bg-[#9575e8] text-white dark:text-black'
                : 'bg-[#2a2626] text-[#716860] cursor-not-allowed'
            }`}
          >
            Next
          </Button>
        </div>

        {/* Exchange Rate */}
        <div className="mt-2">
          <p className="text-[#716860] text-sm">Exchange rate</p>
          <p className="text-[#A488F5] text-base font-normal">
            1 {toCurrency} = {exchangeRate.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {fromCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeFunds;
