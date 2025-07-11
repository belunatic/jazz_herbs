// context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser, logoutUser, loginWithGoogle } from "@/pages/api/auth";

// Create context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
	const [User, setUser] = useState(null); // default User

	useEffect(() => {
		//check to see if a user is logged in
		const checkUser = async () => {
			try {
				const loggedInUser = await getUser();
				//then set the user data
				if (loggedInUser) {
					setUser(loggedInUser);
				}
			} catch (err) {
				console.log("An error occurred: ", err);
			}

			checkUser();
		};
	}, []);

	//logout a user
	const handleLogout = async () => {
		try {
			await logoutUser;
			setUser(null);
		} catch (err) {
			console.log("An error occurred: ", err);
		}
	};

	return (
		<UserContext.Provider value={{ User, setUser, handleLogout }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
