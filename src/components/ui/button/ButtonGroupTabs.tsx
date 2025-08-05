import React from "react";

interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ButtonGroupTabsProps {
  tabs: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
}

const ButtonGroupTabs: React.FC<ButtonGroupTabsProps> = ({
  tabs,
  activeValue,
  onChange,
}) => {
  return (
    <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
      {tabs.map((tab) => {
        const isActive = activeValue === tab.value;
        const baseClasses =
          "text-theme-sm h-10 rounded-md px-3 py-2 font-medium transition-colors";
        const activeClasses =
          "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200";
        const inactiveClasses =
          "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white";
        const disabledClasses =
          "opacity-50 cursor-not-allowed pointer-events-none";

        return (
          <button
            key={tab.value}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.value)}
            className={`${baseClasses} ${
              tab.disabled
                ? disabledClasses
                : isActive
                ? activeClasses
                : inactiveClasses
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroupTabs;
