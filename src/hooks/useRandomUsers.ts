import { useQuery } from "@tanstack/react-query";
import { RandomUser, RandomUserResponse } from "@/types/user";

const fetchRandomUsers = async (count: number = 6): Promise<RandomUser[]> => {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data: RandomUserResponse = await response.json();
  return data.results;
};

export const useRandomUsers = (count: number = 6) => {
  return useQuery({
    queryKey: ["randomUsers", count],
    queryFn: () => fetchRandomUsers(count),
    staleTime: Infinity,
  });
};
