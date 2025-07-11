import Image from "next/image";

const NavBar = () => {
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
						<button className="bg-button-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-green-800 transition duration-300">
							Login
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
