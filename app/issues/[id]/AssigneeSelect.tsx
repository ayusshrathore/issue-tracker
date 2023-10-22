"use client";

import { Skeleton } from "@/app/components";
import useUsers from "@/app/hooks/useUsers";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = async (userId: string | null) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
      });
    } catch (error) {
      toast.error("Failed to assign issue.");
    }
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={assignIssue}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* @ts-ignore */}
            <Select.Item value={null}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
