"use client";
import { useEffect } from "react";
import { getUser, createUserSession } from "./pages/api/auth";
import { useUser } from "./context/UserContext";
import AddHerbButton from "./components/AddHerbButton";

export default function Home() {
	// retrieve the user info from Context
	const { User, setUser, sessionOn, setNotify } = useUser();

	useEffect(() => {
		const checkUser = async () => {
			try {
				//check  for current user
				//const currentUser = await getUser();
				console.log("info for the :   ", User);
				if (!User) {
					//get the userId and secret
					const params = new URLSearchParams(window.location.search);
					const userId = params.get("userId");
					const secret = params.get("secret");

					if (userId && secret) {
						//retrieve the allowed users
						const allowedUsers = process.env.NEXT_PUBLIC_ALLOWED_USERS;

						//login allowed user
						if (!process.env.NEXT_PUBLIC_ALLOWED_USERS?.includes(userId)) {
							//show notification if user not allowed
							setNotify(true);
							// Clean up URL params after login
							window.history.replaceState(
								{},
								document.title,
								window.location.pathname
							);
						} else {
							//create a session
							const userSession = await createUserSession(userId, secret);
							setUser(userSession);
							// Clean up URL params after login
							window.history.replaceState(
								{},
								document.title,
								window.location.pathname
							);
						}
					}
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
		<div>
			<h1>Welcome {User?.name ? `, ${User.name}` : ""}</h1>
			{User ? <AddHerbButton linkTo="herbs" title="Add herb" /> : ""}
		</div>
	);
}
