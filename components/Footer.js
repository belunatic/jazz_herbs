import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-button-success  text-text text-center dark:text-black py-4 text-sm">
			©{new Date().getFullYear()} <Link href="/admin">Jazzmyn Apothecary</Link>.
			All rights reserved.
		</footer>
	);
};

export default Footer;
