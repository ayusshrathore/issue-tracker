"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});

type IssueFormType = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<IssueFormType>({
		resolver: zodResolver(issueSchema),
	});
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (data: IssueFormType) => {
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
					<TextField.Input
						defaultValue={issue?.title}
						placeholder="Title"
						{...register("title")}
					/>
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					defaultValue={issue?.description}
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

export default IssueForm;
