"use client";

import { loginWithGoogle } from "@/pages/api/auth";

import { useUser } from "../../context/UserContext";

const LoginPage = () => {
	//const [user, setUser] = useState(null);

	const { User, handleLogout } = useUser();

	return (
		<section>
			<div className="flex justify-center items-center bg-container min-h-full">
				{User ? (
					<div className="flex flex-col gap-4 py-16">
						<p className="text-text text-2xl mb-4 block">Hello, {User.name}!</p>
						<button
							className="cursor point board rounded-sm bg-button-primary hover:bg-button-hover m-2 p-4 text-text cursor-pointer"
							onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : (
					<button
						className="cursor point board bg-button-primary rounded-sm hover:bg-button-hover m-2 p-4 text-text cursor-pointer"
						onClick={loginWithGoogle}>
						Sign In with Google
					</button>
				)}
			</div>
		</section>
	);
};

export default LoginPage;
