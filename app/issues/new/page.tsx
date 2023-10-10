"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
	return (
		<div className="max-w-xl space-y-5">
			<TextField.Root>
				<TextField.Input placeholder="Title" />
			</TextField.Root>
			<TextArea placeholder="Description" />
			<Button>Submit</Button>
		</div>
	);
};

export default NewIssuePage;
