// context/UserContext.js
import React, { createContext, useContext, useState } from "react";
import { getUser, logoutUser, loginWithGoogle } from "@/pages/api/auth";

// Create context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
	const [User, setUser] = useState(null); // default User

	return (
		<UserContext.Provider value={{ User, toggleUser }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
