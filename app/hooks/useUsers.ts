import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
  });

export default useUsers;
