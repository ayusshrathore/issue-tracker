import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
		<div>
			<Heading>{issue.title}</Heading>
			<Flex className="space-x-3" my="2">
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose mt-5">
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</div>
	);
};

export default IssueDetailPage;
