"use client";

import { loginWithGoogle } from "@/pages/api/auth";

import { useUser } from "@/context/UserContext";

const LoginPage = () => {
	//const [user, setUser] = useState(null);

	const { User, handleLogout } = useUser();

	return (
		<div className="w-full h-[80vh] flex justify-center items-center">
			{User ? (
				<div className="flex flex-col gap-4">
					<p className="text-text text-2xl mb-4 block">Hello, {User.name}!</p>
					<button
						className="cursor point board bg-main m-2 p-4 text-text cursor-pointer"
						onClick={handleLogout}>
						Logout
					</button>
				</div>
			) : (
				<button
					className="cursor point board bg-main m-2 p-4 text-text cursor-pointer"
					onClick={loginWithGoogle}>
					Sign In with Google
				</button>
			)}
		</div>
	);
};

export default LoginPage;
