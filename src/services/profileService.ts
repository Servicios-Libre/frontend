import axios from "axios";
import { UserProfile } from "@/types";

export const getProfile = async (): Promise<UserProfile> => {
  const res = await axios.get<UserProfile>("/users/ById");
  return res.data;
};

export const updateProfile = async (data: UserProfile): Promise<void> => {
  await axios.put("/users/update", data);
};
