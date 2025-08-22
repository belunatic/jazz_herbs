"use client";
import Image from "next/image";
import { useUser } from "../context/UserContext";
import Link from "next/link";
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";

const NavBar = () => {
	const { User, handleLogout } = useUser();
	return (
		<div>
			<nav className=" shadow-md py-4 bg-button-success">
				<div className="max-w-6xl mx-auto flex items-center justify-between px-4 cursor-pointer">
					<Link href="/">
						<Image
							src="/images/JazzmynApothecaryLogo.png"
							width={300}
							height={49}
							alt="Jazz Herbs Logo"
						/>
					</Link>
					<div>
						{User ? (
							<button
								onClick={handleLogout}
								className="bg-button-hover dark:text-black text-text px-4 py-2 rounded cursor-pointer hover:bg-button-primary transition duration-300">
								<FaRightFromBracket />
							</button>
						) : (
							<Link href="/admin">
								<button
									onClick={handleLogout}
									className="bg-button-hover dark:text-black text-text px-4 py-2 rounded cursor-pointer hover:bg-button-primary transition duration-300">
									<FaRightToBracket />
								</button>
							</Link>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
