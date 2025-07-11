"use client";
import { useState, useEffect, useContext } from "react";
import { account, ID } from "@/lib/appwrite";
import {
	loginWithGoogle,
	getUser,
	createUserSession,
	logoutUser,
} from "@/pages/api/auth";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

const LoginPage = () => {
	//const [user, setUser] = useState(null);

	const { User } = useUser();

	useEffect(() => {
		const checkUser = async () => {
			try {
				const user = await getUser();
				console.log(user);

				if (User) {
					console.log(User);
				} else {
					//get the userId and secret
					const params = new URLSearchParams(window.location.search);
					const userId = params.get("userId");
					const secret = params.get("secret");

					console.log(userId, secret);

					//create a session
					const userSession = await createUserSession(userId, secret);
					console.log(userSession);
					setUser(userSession.name);
					// Clean up URL params after login
					window.history.replaceState(
						{},
						document.title,
						window.location.pathname
					);
				}
			} catch (error) {
				console.error("Session not found or failed:", error);
				// Redirect to login or show error
			}
		};

		checkUser();
		console.log("hello");
	}, []);

	return (
		<div className="w-full h-[80vh] flex justify-center items-center">
			{User ? (
				<>
					<p>Welcome, {User.name}!</p>
					<button onClick={logoutUser()}>Logout</button>
				</>
			) : (
				<button
					className="cursor point board bg-main m-2 p-4 text-text cursor-pointer"
					onClick={loginWithGoogle}>
					Login with Google
				</button>
			)}
		</div>
	);
};

export default LoginPage;
