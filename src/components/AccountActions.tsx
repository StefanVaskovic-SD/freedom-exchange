import React from "react";

interface AccountActionsProps {
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }>;
}

export const AccountActions: React.FC<AccountActionsProps> = ({ actions }) => {
  return (
    <div className="flex w-full justify-between gap-2">
      {actions.map(action => (
        <div 
          key={action.label} 
          className="flex flex-col items-center text-foreground text-base font-normal gap-1 w-full"
        >
          <button 
            className="bg-[#211E1E] dark:bg-[#211E1E] text-[#E4B33D] dark:text-[#E4B33D] w-14 h-14 rounded-lg flex items-center justify-center mb-1"
            onClick={action.onClick}
          >
            <span className="text-lg">{action.icon}</span>
        </button>
          {action.label}
        </div>
      ))}
    </div>
  );
};
