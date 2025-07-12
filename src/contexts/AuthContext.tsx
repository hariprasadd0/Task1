import {createContext, useEffect, useState} from "react";
import type {ReactNode} from "react";
import type {AuthContextType, User} from "../types/auth.ts";
import {MOCK_USERS} from "../data/mockDb.ts";
import {storage} from "../utils/storage.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext= createContext<AuthContextType | undefined>(undefined)

export const AuthProvider =({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(true)

    useEffect(()=>{
      const existingUser = storage.getUser();
      if (existingUser) setUser(existingUser);
      setIsLoading(false)
    },[])

   const login = async (email:string,password:string):Promise<boolean> => {
        setIsLoading(true);
     const userFound = MOCK_USERS[email];
     if(userFound && userFound.password===password){
         setUser(userFound.user);
         storage.setUser(userFound.user);
         setIsLoading(false);
         return true;
     }
     setIsLoading(false);
     return false;
   }
   const logout =  ():void => {
        setUser(null);
        storage.removeUser()
   }
    return (
        <AuthContext.Provider value={{
        user,
        login,
        logout,
        isLoading
    }}>{children}</AuthContext.Provider>
    )
}