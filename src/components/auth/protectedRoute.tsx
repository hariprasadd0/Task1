import {useAuth} from "../../hooks/useAuth.ts";
import {Loader} from '../ui/loader.tsx'
import type {ReactNode} from "react";
import {LoginForm} from "./LoginForm.tsx";


export const ProtectedRoute=({children}:{children:ReactNode})=>{
 const {user,isLoading} = useAuth();

 if (isLoading) return <Loader />;
 return user ? <>{children}</> : <LoginForm/>;
}