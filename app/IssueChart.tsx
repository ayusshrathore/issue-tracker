"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  return (
    <Card mt="5">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={[
            { label: "Open", value: open },
            { label: "In Progress", value: inProgress },
            { label: "Closed", value: closed },
          ]}
        >
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{ fill: "var(--accent-9)" }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
