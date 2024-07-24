// AuthContext.js
import React, {createContext, useState, useContext, useEffect} from 'react';
import {DataContext, useAcaAPI} from './DataContext';
import UserModel from "../dbModels/UserModel";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data, loaded } = useAcaAPI();
    const uid = localStorage.getItem('uid');
    let [userInfo,setUserInfo] = useState(null);

    useEffect(() => {
        if(loaded){
            let userById = uid ? data.users.find((user) => user.UserId === uid) : null;
            console.log("UserModel Found in DB: ",userById);
            setUserInfo(userById);
        }
    },[loaded])



    const login = (username, password) => {
        username = username.trim();
        password = password.trim();
        const user = data.users.find(u => u.Name.toLowerCase() === username.toLowerCase() && u.Password.toLowerCase() === password.toLowerCase()); // Assuming users have a password field
        if (user) {
            setUserInfo(user)
            localStorage.setItem('uid', user.UserId);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('uid');
    };

    return (
        <AuthContext.Provider value={{ logged:!!userInfo,user:new UserModel(userInfo), login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
