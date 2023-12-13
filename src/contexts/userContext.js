import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/firebaseConfig'; // Import your Firebase auth instance

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Set user ID when user is logged in
                setUserId(user.uid);
            } else {
                // Clear user ID when no user is logged in
                setUserId(null);
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    // Other user-related states can be added here

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
