import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
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
				md: "2",
			}}
			gap="5"
		>
			<Box>
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton issue={issue} />
			</Box>
		</Grid>
	);
};

export default IssueDetailPage;
