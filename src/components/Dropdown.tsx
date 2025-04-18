import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function Dropdown({
  options,
  defaultValue = options[0],
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="w-full max-w-[260px] relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F7F7F7] rounded-lg px-4 py-3 flex items-center justify-between shadow-[0_0_4px_0_#00000040]"
      >
        <span className="text-gray-700 text-sm font-semibold">
          {selectedOption}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`w-full px-4 py-3 text-left text-sm font-semibold hover:bg-gray-50 ${
                  selectedOption === option
                    ? "text-blue-600 bg-gray-50"
                    : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
