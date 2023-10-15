"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

interface NewIssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	const { register, handleSubmit, control } = useForm<NewIssueForm>();

	return (
		<form
			className="max-w-xl space-y-5"
			onSubmit={handleSubmit(async (data) => {
				await axios.post("/api/issues", data);
				router.push("/issues");
			})}
		>
			<TextField.Root>
				<TextField.Input
					placeholder="Title"
					{...register("title", { required: true })}
				/>
			</TextField.Root>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<SimpleMDE placeholder="Description" {...field} />
				)}
			/>
			<Button type="submit">Submit New Issue</Button>
		</form>
	);
};

export default NewIssuePage;
