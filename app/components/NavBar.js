"use client";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

const NavBar = () => {
	const { User, handleLogout } = useUser();
	return (
		<div>
			<nav className=" shadow-md py-4 bg-nav">
				<div className="max-w-6xl mx-auto flex items-center justify-between px-4 cursor-pointer">
					<Image
						src="/images/JazzmynApothecaryLogo.png"
						width={300}
						height={49}
						alt="Jazz Herbs Logo"
					/>
					<div>
						{User ? (
							<button
								onClick={handleLogout}
								className="bg-button-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-green-800 transition duration-300">
								Logout
							</button>
						) : (
							""
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
