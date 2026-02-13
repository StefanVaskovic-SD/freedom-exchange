import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type AccountType = 'pension' | 'savings' | 'currentAccount';

export interface Account {
  id: AccountType;
  name: string;
  icon: React.ReactNode;
  balance: number;
  color: string;
}

export interface Transaction {
  id: string;
  type: "withdrawal" | "topup" | "transfer";
  account: AccountType;
  amount: number;
  date: Date;
  recipient?: string;
  status: 'completed' | 'pending' | 'failed';
}

interface AccountContextType {
  accounts: Record<AccountType, Account>;
  transactions: Transaction[];
  updateBalance: (accountId: AccountType, newBalance: number) => void;
  transferFunds: (from: AccountType, to: AccountType, amount: number) => void;
  getAccount: (accountId: AccountType) => Account;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const INITIAL_ACCOUNTS: Record<AccountType, Account> = {
  pension: {
    id: 'pension',
    name: 'Pension',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.25 8.39719V7.875C17.25 5.52375 13.7034 3.75 9 3.75C4.29656 3.75 0.75 5.52375 0.75 7.875V11.625C0.75 13.5834 3.21094 15.1397 6.75 15.6056V16.125C6.75 18.4762 10.2966 20.25 15 20.25C19.7034 20.25 23.25 18.4762 23.25 16.125V12.375C23.25 10.4344 20.8669 8.87625 17.25 8.39719ZM5.25 13.7691C3.41344 13.2562 2.25 12.4116 2.25 11.625V10.3059C3.015 10.8478 4.03969 11.2847 5.25 11.5781V13.7691ZM12.75 11.5781C13.9603 11.2847 14.985 10.8478 15.75 10.3059V11.625C15.75 12.4116 14.5866 13.2562 12.75 13.7691V11.5781ZM11.25 18.2691C9.41344 17.7562 8.25 16.9116 8.25 16.125V15.7341C8.49656 15.7434 8.74594 15.75 9 15.75C9.36375 15.75 9.71906 15.7378 10.0678 15.7172C10.4552 15.8559 10.8499 15.9736 11.25 16.0697V18.2691ZM11.25 14.0859C10.5051 14.196 9.75302 14.2508 9 14.25C8.24698 14.2508 7.49493 14.196 6.75 14.0859V11.8556C7.49604 11.9528 8.24765 12.0011 9 12C9.75235 12.0011 10.504 11.9528 11.25 11.8556V14.0859ZM17.25 18.5859C15.758 18.8047 14.242 18.8047 12.75 18.5859V16.35C13.4958 16.4503 14.2475 16.5004 15 16.5C15.7523 16.5011 16.504 16.4528 17.25 16.3556V18.5859ZM21.75 16.125C21.75 16.9116 20.5866 17.7562 18.75 18.2691V16.0781C19.9603 15.7847 20.985 15.3478 21.75 14.8059V16.125Z" fill="currentColor"/>
      </svg>
    ),
    balance: 48750.0,
    color: '#FFFFFF',
  },

  savings: {
    id: 'savings',
    name: 'Savings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21.1875 8.25781C21.15 8.16406 21.1106 8.07031 21.0703 7.97656C20.4654 6.58159 19.4865 5.38109 18.2419 4.50781H20.25C20.4489 4.50781 20.6397 4.42879 20.7803 4.28814C20.921 4.14749 21 3.95672 21 3.75781C21 3.5589 20.921 3.36813 20.7803 3.22748C20.6397 3.08683 20.4489 3.00781 20.25 3.00781H10.5C8.42634 3.01045 6.42951 3.79283 4.90601 5.19962C3.38252 6.6064 2.4438 8.53468 2.27625 10.6016C1.6284 10.7626 1.05277 11.1351 0.640489 11.6602C0.228203 12.1852 0.00281392 12.8328 0 13.5003C0 13.6992 0.0790176 13.89 0.21967 14.0306C0.360322 14.1713 0.551088 14.2503 0.75 14.2503C0.948912 14.2503 1.13968 14.1713 1.28033 14.0306C1.42098 13.89 1.5 13.6992 1.5 13.5003C1.50017 13.2268 1.57512 12.9586 1.71673 12.7246C1.85834 12.4906 2.06122 12.2998 2.30344 12.1728C2.49012 13.8555 3.19176 15.4395 4.3125 16.7084L5.49 20.0047C5.5941 20.2962 5.78586 20.5485 6.03898 20.7267C6.29209 20.905 6.59416 21.0005 6.90375 21.0003H8.09625C8.40567 21.0003 8.70754 20.9047 8.96047 20.7264C9.2134 20.5482 9.40502 20.2961 9.50906 20.0047L9.68906 19.5003H15.0609L15.2409 20.0047C15.345 20.2961 15.5366 20.5482 15.7895 20.7264C16.0425 20.9047 16.3443 21.0003 16.6537 21.0003H17.8462C18.1557 21.0003 18.4575 20.9047 18.7105 20.7264C18.9634 20.5482 19.155 20.2961 19.2591 20.0047L20.7787 15.7503H21C21.5967 15.7503 22.169 15.5133 22.591 15.0913C23.0129 14.6693 23.25 14.097 23.25 13.5003V10.5003C23.2501 9.93598 23.0381 9.39222 22.6561 8.97685C22.274 8.56148 21.7499 8.30484 21.1875 8.25781ZM14.25 6.75031H10.5C10.3011 6.75031 10.1103 6.67129 9.96967 6.53064C9.82902 6.38999 9.75 6.19922 9.75 6.00031C9.75 5.8014 9.82902 5.61063 9.96967 5.46998C10.1103 5.32933 10.3011 5.25031 10.5 5.25031H14.25C14.4489 5.25031 14.6397 5.32933 14.7803 5.46998C14.921 5.61063 15 5.8014 15 6.00031C15 6.19922 14.921 6.38999 14.7803 6.53064C14.6397 6.67129 14.4489 6.75031 14.25 6.75031ZM16.875 12.0003C16.6525 12.0003 16.435 11.9343 16.25 11.8107C16.065 11.6871 15.9208 11.5114 15.8356 11.3058C15.7505 11.1003 15.7282 10.8741 15.7716 10.6558C15.815 10.4376 15.9222 10.2372 16.0795 10.0798C16.2368 9.92248 16.4373 9.81534 16.6555 9.77193C16.8738 9.72852 17.1 9.7508 17.3055 9.83595C17.5111 9.9211 17.6868 10.0653 17.8104 10.2503C17.934 10.4353 18 10.6528 18 10.8753C18 11.1737 17.8815 11.4598 17.6705 11.6708C17.4595 11.8818 17.1734 12.0003 16.875 12.0003Z" fill="currentColor"/>
      </svg>
    ),
    balance: 16400.0,
    color: '#A488F5',
  },

  currentAccount: {
    id: 'currentAccount',
    name: 'Current Account',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M19.5 4.5H4.5C3.90326 4.5 3.33097 4.73705 2.90901 5.15901C2.48705 5.58097 2.25 6.15326 2.25 6.75V17.25C2.25 17.8467 2.48705 18.419 2.90901 18.841C3.33097 19.2629 3.90326 19.5 4.5 19.5H19.5C20.0967 19.5 20.669 19.2629 21.091 18.841C21.5129 18.419 21.75 17.8467 21.75 17.25V6.75C21.75 6.15326 21.5129 5.58097 21.091 5.15901C20.669 4.73705 20.0967 4.5 19.5 4.5ZM14.25 11.25C14.25 11.8467 14.0129 12.419 13.591 12.841C13.169 13.2629 12.5967 13.5 12 13.5C11.4033 13.5 10.831 13.2629 10.409 12.841C9.98705 12.419 9.75 11.8467 9.75 11.25C9.75 11.0511 9.67098 10.8603 9.53033 10.7197C9.38968 10.579 9.19891 10.5 9 10.5H3.75V9H20.25V10.5H15C14.8011 10.5 14.6103 10.579 14.4697 10.7197C14.329 10.8603 14.25 11.0511 14.25 11.25ZM4.5 6H19.5C19.6989 6 19.8897 6.07902 20.0303 6.21967C20.171 6.36032 20.25 6.55109 20.25 6.75V7.5H3.75V6.75C3.75 6.55109 3.82902 6.36032 3.96967 6.21967C4.11032 6.07902 4.30109 6 4.5 6Z" fill="currentColor"/>
      </svg>
    ),
    balance: 950.0,
    color: '#E4B33D',
  },
};

const STORAGE_KEY = 'account_balances';
const TRANSACTIONS_KEY = 'account_transactions';

// Initial sample transactions
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "withdrawal", account: "currentAccount", amount: -250.00, date: new Date("2025-10-29T09:25:00"), recipient: "ATM Withdrawal", status: "completed" },
  { id: "2", type: "topup", account: "currentAccount", amount: 300.00, date: new Date("2025-10-16T13:15:00"), recipient: "Salary Deposit", status: "completed" },
  { id: "3", type: "transfer", account: "savings", amount: 500.00, date: new Date("2025-10-10T10:20:00"), recipient: "From Current Account", status: "completed" },
];

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Record<AccountType, Account>>(() => {
    // Load from localStorage on initialization
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...INITIAL_ACCOUNTS,
          pension: { ...INITIAL_ACCOUNTS.pension, balance: parsed.pension || INITIAL_ACCOUNTS.pension.balance },
          savings: { ...INITIAL_ACCOUNTS.savings, balance: parsed.savings || INITIAL_ACCOUNTS.savings.balance },
          currentAccount: { ...INITIAL_ACCOUNTS.currentAccount, balance: parsed.currentAccount || INITIAL_ACCOUNTS.currentAccount.balance }
        };
      } catch (e) {
        return INITIAL_ACCOUNTS;
      }
    }
    return INITIAL_ACCOUNTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Load from localStorage on initialization
    const stored = localStorage.getItem(TRANSACTIONS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
      } catch (e) {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  // Persist to localStorage whenever accounts change
  useEffect(() => {
    const balances = {
      pension: accounts.pension.balance,
      savings: accounts.savings.balance,
      currentAccount: accounts.currentAccount.balance
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));
  }, [accounts]);

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const updateBalance = (accountId: AccountType, newBalance: number) => {
    setAccounts(prev => ({
      ...prev,
      [accountId]: {
        ...prev[accountId],
        balance: newBalance
      }
    }));
  };

  const transferFunds = useCallback((from: AccountType, to: AccountType, amount: number) => {
    setAccounts(prev => ({
      ...prev,
      [from]: {
        ...prev[from],
        balance: prev[from].balance - amount
      },
      [to]: {
        ...prev[to],
        balance: prev[to].balance + amount
      }
    }));

    setTransactions(prev => {
      // Create transaction records for both accounts
      const timestamp = new Date();
      const transactionId = `txn_${Date.now()}`;
      
      // Transaction for source account (withdrawal)
      const sourceTransaction: Transaction = {
        id: `${transactionId}_from`,
        type: "transfer",
        account: from,
        amount: -amount,
        date: timestamp,
        recipient: `To ${from === 'pension' ? 'Pension' : from === 'savings' ? 'Savings' : 'Current Account'}`,
        status: "completed"
      };

      // Transaction for destination account (deposit)
      const destTransaction: Transaction = {
        id: `${transactionId}_to`,
        type: "transfer",
        account: to,
        amount: amount,
        date: timestamp,
        recipient: `From ${from === 'pension' ? 'Pension' : from === 'savings' ? 'Savings' : 'Current Account'}`,
        status: "completed"
      };

      return [destTransaction, sourceTransaction, ...prev];
    });
  }, []);

  const getAccount = (accountId: AccountType): Account => {
    return accounts[accountId];
  };

  return (
    <AccountContext.Provider value={{ accounts, transactions, updateBalance, transferFunds, getAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
};
