"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();

	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues/list" },
	];

	return (
		<nav className="border-b mb-5 px-5 py-3 items-center">
			<Container>
				<Flex justify="between">
					<Flex align="center" gap="3">
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
					</Flex>
					<Box>
						{status === "authenticated" && (
							<div className="flex items-center space-x-4 ml-auto">
								<span className="text-zinc-500">{session?.user?.name}</span>
								<img
									className="w-10 h-10 rounded-full"
									src={session?.user?.image!}
									alt={session?.user?.name!}
								/>
								<Link
									href="/api/auth/signout"
									className="text-zinc-500 hover:text-zinc-800 transition-colors"
								>
									Log out
								</Link>
							</div>
						)}
						{status === "unauthenticated" && (
							<Link
								href="/api/auth/signin"
								className="text-zinc-500 hover:text-zinc-800 transition-colors"
							>
								Log in
							</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
