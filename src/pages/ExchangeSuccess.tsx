import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CURRENCY_INFO, WALLET_CURRENCIES } from '@/contexts/AccountContext';

export const ExchangeSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { fromCurrency, toCurrency, fromAmount, toAmount } = location.state as {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: number;
    toAmount: number;
  };

  const fromInfo = CURRENCY_INFO[fromCurrency];
  const toInfo = CURRENCY_INFO[toCurrency];

  const formatFrom = `${fromInfo.symbol}${fromAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatTo = `${toAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`;

  const handleBackToHome = () => {
    // Navigate to Current Account with the target currency tab selected
    // If toCurrency is a wallet currency (GBP, EUR, USD), select that tab
    // Otherwise, default to GBP
    const walletCurrencies = WALLET_CURRENCIES as readonly string[];
    const selectedCurrency = walletCurrencies.includes(toCurrency) ? toCurrency : 'GBP';
    
    navigate('/account/currentAccount', {
      state: { selectedCurrency },
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col px-4">
      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#A488F5] rounded-2xl flex items-center justify-center">
            <div className="w-16 h-16 bg-[#F3F3F3] dark:bg-black rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-[#A488F5]" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-normal text-foreground text-center mb-6">
          Success!
        </h1>

        <p className="text-base text-[#716860] text-center max-w-sm leading-relaxed mb-3">
          You have successfully sold {formatFrom} for{' '}
          {formatTo}.
        </p>

        {/* Back to Home Button */}
        <div className="w-full mb-8">
          <Button
            onClick={handleBackToHome}
            className="w-full h-14 bg-[#A488F5] hover:bg-[#9575e8] text-white font-normal text-xl rounded-lg"
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSuccess;
