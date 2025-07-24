import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-button-success  text-text text-center dark:text-black py-4 text-sm">
			© 2025 <Link href="/admin">Jazz Herbs</Link>. All rights reserved.
		</footer>
	);
};

export default Footer;
