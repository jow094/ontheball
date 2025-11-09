import api from "../utils/api";

export const getMessages = async () => {
  const response = await api.get("/chat");
  return response;
};

export const sendMessages = async (userKey:number, userId:string, userNick:string, chatContent: string) => {
  const response = await api.post("/chat", { userKey:userKey, userId:userId, userNick:userNick, chatContent:chatContent });
  return response;
};
