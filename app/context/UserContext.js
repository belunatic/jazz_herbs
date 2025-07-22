"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser, logoutUser } from "@/pages/api/auth";
import { useRouter } from "next/navigation";

// Create context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
	//create an instance of useRoute to redirect the logout user to the root
	const router = useRouter();
	const [User, setUser] = useState(null); // default User

	//check for session
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
		};
		checkUser();
	}, []);

	//logout a user
	const handleLogout = async () => {
		try {
			await logoutUser();
			setUser(null);
			router.push("/");
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
