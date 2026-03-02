import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, Check } from 'lucide-react';
import { useAccounts, CURRENCY_INFO, convertCurrency, getExchangeRate } from '@/contexts/AccountContext';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

const FROM_CURRENCIES = ['GBP', 'EUR', 'USD'] as const;

export const ExchangeFunds: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accounts } = useAccounts();
  const initialFrom = (location.state as any)?.fromCurrency;
  const [fromCurrency, setFromCurrency] = useState<string>(
    FROM_CURRENCIES.includes(initialFrom) ? initialFrom : 'GBP'
  );
  const [toCurrency, setToCurrency] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'from' | 'to'>('from');
  const [searchQuery, setSearchQuery] = useState('');

  const openFromDrawer = () => { setDrawerMode('from'); setDrawerOpen(true); };
  const openToDrawer  = () => { setDrawerMode('to');   setDrawerOpen(true); };

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

  const hasNoFunds = fromBalance === 0;
  const exceedsBalance = !hasNoFunds && numAmount > 0 && numAmount > fromBalance;
  const hasFromError = hasNoFunds || exceedsBalance;
  const isValidAmount = numAmount > 0 && !hasNoFunds && numAmount <= fromBalance && toCurrency !== '';

  const availableToCurrencies = FROM_CURRENCIES.filter(c => c !== fromCurrency);
  
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
          source: 'currentAccount',
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

  const handleSwap = () => {
    if (!toCurrency) return;
    const newFrom = toCurrency;
    const newTo = fromCurrency;
    setFromCurrency(newFrom);
    setToCurrency(newTo);
    setAmount('');
  };

  const handleCurrencySelect = (code: string) => {
    if (drawerMode === 'from') {
      handleFromCurrencyChange(code);
    } else {
      setToCurrency(code);
      setSearchQuery('');
    }
    setDrawerOpen(false);
  };

  const formatCurrencyAmount = (value: number, currCode: string) => {
    const info = CURRENCY_INFO[currCode];
    if (currCode === 'AED') {
      return value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
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
            onClick={() => navigate('/account/currentAccount')}
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
          <div className={`bg-white dark:bg-[#211E1E] rounded-lg p-4 ${hasFromError ? 'ring-1 ring-red-500' : ''}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-foreground/70 text-base">From</span>
              <button className="flex items-center gap-1 text-foreground" onClick={openFromDrawer}>
                <img src={`/${fromCurrency.toLowerCase()}.png`} className="w-5 h-5 rounded-full object-cover" alt={fromCurrency} />
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
                className={`text-3xl font-normal bg-transparent border-none outline-none w-full ${hasFromError ? 'text-red-500' : 'text-foreground'}`}
                style={{ caretColor: '#A488F5' }}
                autoFocus
              />
              {hasNoFunds ? (
                <span className="text-red-500 text-sm whitespace-nowrap ml-2">No funds available</span>
              ) : exceedsBalance ? (
                <span className="text-red-500 text-sm whitespace-nowrap ml-2">Insufficient funds</span>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36" fill="none">
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
                    <img src={`/${toCurrency.toLowerCase()}.png`} className="w-5 h-5 rounded-full object-cover" alt={toCurrency} />
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
        </div>

        {/* Single shared Drawer for both From and To */}
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
            <div className="px-4 overflow-y-auto" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
              {(drawerMode === 'from' ? FROM_CURRENCIES : filteredToCurrencies).map(code => {
                const info = CURRENCY_INFO[code];
                const isSelected = drawerMode === 'from' ? code === fromCurrency : code === toCurrency;
                return (
                  <button
                    key={code}
                    onClick={() => handleCurrencySelect(code)}
                    className={`w-full flex items-center justify-between py-4 px-2 rounded-lg transition-colors ${
                      isSelected ? 'bg-[#F3F3F3] dark:bg-[#2C2C2E] border border-[#A488F5]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={`/${code.toLowerCase()}.png`} className="w-8 h-8 rounded-full object-cover" alt={code} />
                      <span className="text-foreground text-base">{info.code} ({info.symbol})  {info.name}</span>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#A488F5]" />}
                  </button>
                );
              })}
            </div>
          </DrawerContent>
        </Drawer>

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
      </div>
    </div>
  );
};

export default ExchangeFunds;
