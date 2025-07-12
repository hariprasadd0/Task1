import type {User} from "../types/auth.ts";

const STORAGE_KEY = {
    USER: 'clinic_staff',
};
export const storage = {
  setUser: (data: User) => {
      try{
           localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(data));
      }catch (error) {
          console.error(error);
      }
  },
  getUser: ():User | null => {
      try{
          const user = localStorage.getItem(STORAGE_KEY.USER);
          return user ? JSON.parse(user) : null;
      }catch (e) {
          console.error(e);
          return null;
      }
  },
  removeUser:()=>{
      localStorage.removeItem(STORAGE_KEY.USER);
  }
}