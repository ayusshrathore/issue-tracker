import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
	params: {
		id: string;
	};
}

const fetchUser = cache((id: number) =>
	prisma.issue.findUnique({ where: { id } })
);

const IssueDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);

	const id = parseInt(params.id);
	if (typeof id !== "number") notFound();

	const issue = await fetchUser(id);

	if (!issue) notFound();

	return (
		<Grid
			columns={{
				initial: "1",
				sm: "5",
			}}
			gap="5"
		>
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction="column" gap="4">
						<AssigneeSelect issue={issue} />
						<EditIssueButton issue={issue} />
						<DeleteIssueButton issue={issue} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export async function generateMetadata({ params }: Props) {
	const id = parseInt(params.id);

	const issue = await fetchUser(id);

	return {
		title: issue?.title,
		description: issue?.description,
	};
}

export default IssueDetailPage;
