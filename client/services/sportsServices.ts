import api from "../utils/api";

export const getSoccerFixtureList = async (date: string) => {
  try {
    const response = await api.get("/soccer/list", {
       params: { date: date } ,
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching soccer list:", err);
    return null;
  }
};

export const getLiveSoccerFixtureList = async () => {
  try {
    const response = await api.get("/soccer/live");
    return response.data;
  } catch (err) {
    console.error("Error fetching live soccer list:", err);
    return null;
  }
};
