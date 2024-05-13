import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import * as userService from '../services/userservice';

const AuthContext  = createContext(null);

export const AuthProvider =({ children })=>{
    const [user, setUser] = useState(userService.getUser());
    const login  = async (email, password) =>{
        try {
            const user = await userService.login(email, password);
            setUser(user);
            toast.success('login successfully')
        } catch (error) {
            toast.error(error.response.data);
        }
    };
    const register = async data =>{
       try {
        const user = await userService.register(data);
        setUser(user);
        toast.success('Register Successful') 
       } catch (error) {
         toast.error(error.response.data);
       }
    }
    const forgotPassword = async data =>{
        try {
            const user = await userService.forgotPassword(data);
            toast.success('password send your email') 
        } catch (error) {
            toast.error(error.response.data); 
        }
    }
    const resetPassword = async data =>{
        try {
            const user = await userService.resetPassword(data);
            toast.success('your password reset successfully') 
        } catch (error) {
            toast.error(error.response.data); 
        }
    }
    const updateProfile = async user => {
        const updatedUser = await userService.updateProfile(user);
        toast.success('Profile Update Was Successful');
        if (updatedUser) setUser(updatedUser);
      };

      const changePassword = async passwords => {
        await userService.changePassword(passwords);
        logout();
        toast.success('Password Changed Successfully, Please Login Again!');
      };
    const logout =()=>{
        userService.logout();
        setUser(null);
        toast.success("logout successful")
    };

    return(
        <AuthContext.Provider value={{user ,login ,register, updateProfile, forgotPassword,resetPassword,changePassword, logout}}>
           {children}
        </AuthContext.Provider>
    );
}
export const useAuth = ()=>useContext(AuthContext);