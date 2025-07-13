import React, { useState } from 'react';
import { Calendar, User, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import type {LoginFormData,} from '../../types/auth';
import { validateLoginForm } from '../../utils/validation';
import type {Errors} from '../../utils/validation'
import { InputField } from '../ui/Input';
import { Loader } from '../ui/loader';

export const LoginForm: React.FC = () => {
    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateLoginForm(formData);

        if (Object.keys(validationErrors) === undefined) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const success = await login(formData.email, formData.password);
        console.log('hey',success);
        if (!success) {
            setErrors({ general: 'Invalid email or password' });
        }
    };

    const handleDemoLogin = (userType: 'staff' | 'admin') => {
        const demoCredentials = userType === 'staff'
            ? { email: 'staff@clinic.com', password: 'securepass' }
            : { email: 'admin@clinic.com', password: 'admin123' };

        setFormData(demoCredentials);
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Clinic Staff Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to manage appointments
                    </p>
                </div>

                <div className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {errors.general}
                        </div>
                    )}

                    <div className="space-y-4">
                        <InputField
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(value) => setFormData({ ...formData, email: value })}
                            error={errors.email}
                            placeholder="Enter your email"
                            icon={<User />}
                        />

                        <InputField
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(value) => setFormData({ ...formData, password: value })}
                            error={errors.password}
                            placeholder="Enter your password"
                            icon={<Lock />}
                            showPasswordToggle={true}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <Loader size="sm" className="mr-2 border-white" />
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleDemoLogin('staff')}
                                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Staff Demo
                            </button>
                            <button
                                onClick={() => handleDemoLogin('admin')}
                                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Admin Demo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500">
                    <p>Demo Credentials:</p>
                    <p>Staff: staff@clinic.com / 123456</p>
                    <p>Admin: admin@clinic.com / admin123</p>
                </div>
            </div>
        </div>
    );
};
