import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAccounts, AccountType } from '@/contexts/AccountContext';
import { useToast } from '@/hooks/use-toast';

const CORRECT_PIN = '0000';

export const PinConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transferFunds } = useAccounts();
  const { toast } = useToast();
  
  const { amount, sourceAccount, destinationAccount, currency = 'GBP' } = location.state as { 
    amount: number;
    sourceAccount: AccountType;
    destinationAccount: AccountType;
    currency?: string;
  };

  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const transferExecutedRef = useRef(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Check PIN when all 4 digits are entered
    if (pin.every(digit => digit !== '') && !transferExecutedRef.current) {
      const enteredPin = pin.join('');
      
      if (enteredPin === CORRECT_PIN) {
        transferExecutedRef.current = true;
        
        // Execute the transfer
        transferFunds(sourceAccount, destinationAccount, amount);
        
        // Navigate to confirmation page
        setTimeout(() => {
          navigate('/transfer-confirmed', { 
            state: { 
              amount,
              sourceAccount,
              destinationAccount,
              currency
            } 
          });
        }, 300);
      } else {
        // Show error and reset
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
          transferExecutedRef.current = false;
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  }, [pin]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    
    if (digit) {
      const newPin = [...pin];
      newPin[index] = digit;
      setPin(newPin);
      
      // Auto-focus next input
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
        // Clear current field
        newPin[index] = '';
        setPin(newPin);
      } else if (index > 0) {
        // Move to previous field and clear it
        newPin[index - 1] = '';
        setPin(newPin);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleBack = () => {
    navigate('/review-transfer', { 
      state: { amount, sourceAccount, destinationAccount, currency } 
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
                className={`w-16 h-16 text-center text-2xl font-normal bg-white dark:bg-[#211E1E] rounded-lg border-2 transition-all duration-200 ${
                  isError 
                    ? 'border-destructive' 
                    : focusedIndex === index 
                      ? 'border-[#A488F5]' 
                      : 'border-border'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PinConfirmation;
