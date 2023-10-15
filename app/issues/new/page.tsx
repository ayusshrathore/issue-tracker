"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (data: IssueForm) => {
		try {
			await axios.post("/api/issues", data);
			router.push("/issues");
		} catch (error) {
			setError("An error occurred while creating the issue.");
		}
	};

	return (
		<div className="max-w-xl ">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}

			<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
				<TextField.Root>
					<TextField.Input placeholder="Title" {...register("title")} />
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting} type="submit">
					Submit New Issue {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
