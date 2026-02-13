import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CURRENCY_INFO, getExchangeRate } from '@/contexts/AccountContext';

export const ExchangeReview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { fromCurrency, toCurrency, fromAmount, toAmount } = location.state as {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: number;
    toAmount: number;
  };

  if (!fromCurrency || !toCurrency) {
    navigate('/', { replace: true });
    return null;
  }

  const fromInfo = CURRENCY_INFO[fromCurrency];
  const toInfo = CURRENCY_INFO[toCurrency];
  const exchangeRate = getExchangeRate(fromCurrency, toCurrency);

  const formatFrom = `${fromInfo.symbol}${fromAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatTo = `${toAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`;

  const handleBack = () => {
    navigate('/exchange', { replace: true });
  };

  const handleExchange = () => {
    navigate('/exchange-pin', {
      state: { fromCurrency, toCurrency, fromAmount, toAmount },
    });
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
          <h1 className="flex-1 text-center text-lg font-normal pr-12 text-foreground">
            Review transfer
          </h1>
        </header>

        {/* Amount Display */}
        <div className="mb-6">
          <p className="text-[#716860] dark:text-[#FFFFFFB2] text-base mb-1">From {formatFrom}</p>
          <p className="text-[#716860] dark:text-[#FFFFFFB2] text-lg mb-1">To</p>
          <p className="text-foreground text-[40px] font-normal leading-tight">
            {formatTo}
          </p>
        </div>

        <div className="w-full h-px mb-6" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Details */}
        <div className="space-y-5 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-[#716860] dark:text-[#FFFFFFB2] text-base">Amount</span>
            <span className="text-foreground text-lg font-normal">{formatFrom}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#716860] dark:text-[#FFFFFFB2] text-base">Price</span>
            <span className="text-[#A488F5] text-lg font-normal">
              1 {toCurrency} = {exchangeRate.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {fromCurrency}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#716860] dark:text-[#FFFFFFB2] text-base">Exchanged</span>
            <span className="text-foreground text-lg font-normal">{formatTo}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#716860] dark:text-[#FFFFFFB2] text-base">Fees</span>
            <span className="text-foreground text-lg font-normal">No fees</span>
          </div>

          <div className="w-full h-px" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />

          <div className="flex items-center justify-between">
            <span className="text-[#716860] dark:text-[#FFFFFFB2] text-base">Estimated total</span>
            <span className="text-foreground text-lg font-bold">{formatTo}</span>
          </div>
        </div>

        {/* Exchange Button */}
        <div className="mt-auto">
          <Button
            onClick={handleExchange}
            className="w-full h-14 bg-[#A488F5] hover:bg-[#9575e8] text-black font-normal text-xl rounded-lg"
          >
            Exchange
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeReview;
