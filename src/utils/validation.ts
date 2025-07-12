import type {LoginFormData} from "../types/auth.ts";

export interface Errors {
    email?: string;
    password?: string;
    general?:string
}

export const validateEmail= (email: string) => {
if (!email) {
    return 'Email is required';
}
if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Please enter a valid email';
}
return undefined;
}
export const validatePassword= (password: string) => {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    return undefined;
}

export const validateLoginForm = (loginFormData: LoginFormData) => {
    const errors:Errors ={}
    const emailError = validateEmail(loginFormData.email)
    if (!emailError) errors.email= emailError;
    const passwordError = validatePassword(loginFormData.password)
    if (!passwordError) errors.password= passwordError;
    console.log(errors)
    return errors;
}