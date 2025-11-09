import api from "../utils/api";

export const logUserVisit = async (userKey: number) => {
  const response = await api.post("/visit", { userKey });
  return response.data;
};
