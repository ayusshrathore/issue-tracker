"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
	const currentPath = usePathname();

	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues/list" },
	];

	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
			<Link href="/">
				<AiFillBug className="text-xl" />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link) => (
					<li key={link.href}>
						<Link
							className={clsx(
								"text-zinc-500 hover:text-zinc-800 transition-colors",
								currentPath === link.href && "text-zinc-800 font-semibold"
							)}
							href={link.href}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
