import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAccounts } from '@/contexts/AccountContext';
import { useToast } from '@/hooks/use-toast';

const CORRECT_PIN = '0000';

export const ExchangePin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { exchangeFunds } = useAccounts();
  const { toast } = useToast();

  const { fromCurrency, toCurrency, fromAmount, toAmount } = location.state as {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: number;
    toAmount: number;
  };

  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const exchangeExecutedRef = useRef(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (pin.every(digit => digit !== '') && !exchangeExecutedRef.current && !isLoading) {
      const enteredPin = pin.join('');

      if (enteredPin === CORRECT_PIN) {
        exchangeExecutedRef.current = true;
        setIsLoading(true);

        // Execute the exchange
        exchangeFunds(fromCurrency, toCurrency, fromAmount, toAmount);

        // Show loading for 3 seconds, then navigate to success
        setTimeout(() => {
          navigate('/exchange-success', {
            state: { fromCurrency, toCurrency, fromAmount, toAmount },
          });
        }, 3000);
      } else {
        setIsError(true);
        toast({
          title: "Incorrect PIN",
          description: "Please try again",
          variant: "destructive",
        });

        setTimeout(() => {
          setPin(['', '', '', '']);
          setFocusedIndex(0);
          setIsError(false);
          exchangeExecutedRef.current = false;
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  }, [pin]);

  const handleInputChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);

    if (digit) {
      const newPin = [...pin];
      newPin[index] = digit;
      setPin(newPin);

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newPin = [...pin];

      if (pin[index]) {
        newPin[index] = '';
        setPin(newPin);
      } else if (index > 0) {
        newPin[index - 1] = '';
        setPin(newPin);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleBack = () => {
    if (!isLoading) {
      navigate('/exchange-review', {
        state: { fromCurrency, toCurrency, fromAmount, toAmount },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col">
      <div className="px-4 py-6 flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="w-12 h-12 rounded-full bg-[#211E1E] flex items-center justify-center text-white"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center text-lg font-normal pr-12 text-foreground">Confirm transfer</h1>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start pt-12">
          <h2 className="text-2xl font-normal text-foreground mb-3">Enter your PIN</h2>
          <p className="text-muted-foreground text-sm mb-8">Please enter your PIN to confirm this transfer</p>

          {/* PIN Input Fields */}
          <div className="flex gap-4 mb-12">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="password"
                inputMode="numeric"
                value={digit}
                maxLength={1}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => setFocusedIndex(index)}
                disabled={isLoading}
                className={`w-16 h-16 text-center text-2xl font-normal bg-white dark:bg-[#211E1E] rounded-lg border-2 transition-all duration-200 ${
                  isError
                    ? 'border-destructive'
                    : focusedIndex === index
                      ? 'border-[#A488F5]'
                      : 'border-border'
                } ${isLoading ? 'opacity-50' : ''}`}
              />
            ))}
          </div>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-3 border-[#A488F5] border-t-transparent rounded-full animate-spin" 
                style={{ borderWidth: '3px' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangePin;
