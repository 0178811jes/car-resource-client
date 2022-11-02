import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] =useState(true);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }


    const gooleLogin = (provider)=>{
        return signInWithPopup(auth, provider);
    }

    const logout = () =>{
        return signOut(auth);
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log(currentUser);
            setUser(currentUser);
        });
        return ()=>{
            return unsubscribe();
        }
    },[])

    const authInfo ={
        user,
        loading,
        createUser,
        gooleLogin,
        signIn,
        logout,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;