import { useState } from "react";
import SearchIcon from "../assets/search-icon.png";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

const SearchInput = ({ value, onChange, onSearch, onKeyDown, onFocus  }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      
      <input
        type="text"
        placeholder="Tìm trạm xe..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown} // Bắt sự kiện Enter
        onFocus={onFocus}
        className="pl-3 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
      />
      {/* Icon search */}
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
        onClick={onSearch} // Click button search
      >
        <img src={SearchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default SearchInput;
