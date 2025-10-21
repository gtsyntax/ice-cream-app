import type React from "react";
  
export const Input: React.FC<{
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}> = ({ label, type, value, onChange, placeholder, required }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-black">{label}</label>
        <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-3 border-2 border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-400"
        />
    </div>
);