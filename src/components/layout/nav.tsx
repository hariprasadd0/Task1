import React from 'react';
import { Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-sm ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Calendar className="h-8 w-8 text-blue-600" />
                        <h1 className="ml-2 text-xl font-semibold text-gray-900">
                            Clinic Calendar
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user?.role}
              </span>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};