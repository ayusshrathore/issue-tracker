"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

interface NewIssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	const { register, handleSubmit, control } = useForm<NewIssueForm>();
	const [error, setError] = useState<string | null>(null);

	return (
		<div className="max-w-xl ">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}

			<form
				className="space-y-5"
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post("/api/issues", data);
						router.push("/issues");
					} catch (error) {
						setError("An error occurred while creating the issue.");
					}
				})}
			>
				<TextField.Root>
					<TextField.Input placeholder="Title" {...register("title")} />
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
		</div>
	);
};

export default NewIssuePage;
