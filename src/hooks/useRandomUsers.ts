import { useQuery } from "@tanstack/react-query";
import { RandomUser, RandomUserResponse } from "@/types/user";

const fetchRandomUsers = async (count: number = 12, seed: string = "lovable"): Promise<RandomUser[]> => {
  const response = await fetch(`https://randomuser.me/api/?results=${count}&seed=${seed}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data: RandomUserResponse = await response.json();
  return data.results;
};

export const useRandomUsers = (count: number = 12) => {
  return useQuery({
    queryKey: ["randomUsers", count],
    queryFn: () => fetchRandomUsers(count),
  });
};
