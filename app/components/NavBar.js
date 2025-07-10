import Image from "next/image";

const NavBar = () => {
	return (
		<div>
			<nav className="bg-white shadow-md py-4">
				<div className="max-w-6xl mx-auto flex items-center justify-between px-4 cursor-pointer">
					<Image
						src="/images/jazzHerbsLogo.png"
						width={300}
						height={61}
						alt="Jazz Herbs Logo"
					/>
					<div>
						<button className="bg-green-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-800 transition duration-300">
							Login
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
