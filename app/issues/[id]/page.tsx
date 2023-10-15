import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
	params: {
		id: string;
	};
}

const IssueDetailPage = async ({ params }: Props) => {
	const id = parseInt(params.id);
	if (typeof id !== "number") notFound();

	const issue = await prisma.issue.findUnique({
		where: {
			id,
		},
	});

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
			<Box>
				<Flex direction="column" gap="4">
					<EditIssueButton issue={issue} />
					<DeleteIssueButton issue={issue} />
				</Flex>
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
