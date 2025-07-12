export interface User  {
    email: string;
    name: string;
    role: 'admin' | 'staff';
}

export interface AuthContextType{
    user: User | null;
    login: (email: string , password:string) => Promise<boolean>;
    logout: () => void;
    isLoading : boolean;
}

export interface LoginFormData {
    email: string;
    password: string;
}
