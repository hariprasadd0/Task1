import type {User} from "../types/auth.ts";

export const MOCK_USERS: Record<string, {password:string,user:User} > ={
    'staff@clinic.com':{
      password:'securepass',
        user:{
          email:'staff@clinic.com',
          name: 'johnny',
          role:'staff'
        }
    },
    'admin@clinic.com': {
        password: 'admin123',
        user: {
            email: 'admin@clinic.com',
            name: 'bobby',
            role: 'admin'
        }
    }
}