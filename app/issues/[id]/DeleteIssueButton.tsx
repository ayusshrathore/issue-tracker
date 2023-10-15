import { Issue } from "@prisma/client";
import { Button } from "@radix-ui/themes";

const DeleteIssueButton = ({ issue }: { issue: Issue }) => {
	return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
