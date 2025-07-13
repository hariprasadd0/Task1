import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    showPasswordToggle?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
                                                          label,
                                                          type,
                                                          value,
                                                          onChange,
                                                          error,
                                                          placeholder,
                                                          icon,
                                                          showPasswordToggle
                                                      }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className="h-5 w-5 text-gray-400">
                            {icon}
                        </div>
                    </div>
                )}
                <input
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`
            w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            ${icon ? 'pl-10' : ''}
            ${showPasswordToggle ? 'pr-10' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};
