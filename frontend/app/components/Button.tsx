import type React from "react";

export const Button: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
}> = ({ children, onClick, type = 'button', variant = 'primary', fullWidth = false }) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-none transition-all duration-200';
    const variantClasses = variant === 'primary' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black border-2 border-black hover:bg-gray-100';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${widthClass}`}
        >
            {children}
        </button>
    );
}