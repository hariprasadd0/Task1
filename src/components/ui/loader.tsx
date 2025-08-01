
interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Loader = ({size = 'md', className = ''}:LoadingSpinnerProps) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };

    return (
        <div className={`animate-spin rounded-full border-b-2 border-current ${sizeClasses[size]} ${className}`} />
    );
};