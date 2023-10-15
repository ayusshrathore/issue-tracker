"use client";

import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from "@radix-ui/themes";
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
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										src={session.user!.image!}
										fallback="?"
										size="3"
										radius="full"
										className="cursor-pointer"
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<Text size="3">
										<DropdownMenu.Label>
											{session.user!.name}
										</DropdownMenu.Label>
									</Text>
									<DropdownMenu.Item>
										<Link href="/api/auth/signout">Log out</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
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
