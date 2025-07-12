import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
         throw new Error('useAuth must be used within the AuthProvider');
    }
    return context;
}