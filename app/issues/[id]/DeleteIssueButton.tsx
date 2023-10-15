"use client";

import { Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issue }: { issue: Issue }) => {
	const router = useRouter();
	const [error, setError] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/api/issues/${issue.id}`);
			router.push("/issues");
			router.refresh();
		} catch (error) {
			setIsDeleting(false);
			console.log(error);
			setError(true);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" disabled={isDeleting}>
						Delete Issue
						{isDeleting && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content style={{ maxWidth: 450 }}>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description size="2">
						Are you sure you want to delete this issue? This action cannot be
						undone.
					</AlertDialog.Description>

					<Flex gap="3" mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant="solid" color="red" onClick={handleDelete}>
								Delete Issue
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						An error occurred while deleting the issue.
					</AlertDialog.Description>
					<Button
						color="gray"
						variant="soft"
						mt="4"
						onClick={() => setError(false)}
					>
						OK
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
