import axios from "axios";

//  @param date "YYYY‑MM‑DD" 형태

// export async function getSoccerFixtureListController(date) {
//   try {
//     const targetDate = new Date(date);
//     const prevDate = new Date(targetDate);
//     prevDate.setDate(targetDate.getDate() - 1);

//     const datesToFetch = [
//       prevDate.toISOString().split("T")[0],
//       targetDate.toISOString().split("T")[0],
//     ];

//     let allMatches = [];

//     for (const d of datesToFetch) {
//       const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
//         headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY },
//         params: { date: d },
//       });

//       if (response.data && Array.isArray(response.data.response)) {
//         allMatches = allMatches.concat(response.data.response);
//       }
//     }

//     return allMatches;
//   } catch (err) {
//     console.error("Get matches error:", err);
//     return [];
//   }
// }
export async function getSoccerFixtureListController(date) {
  try {

    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY },
      params: { date: date },
    });

    return response.data.response;
  } catch (err) {
    console.error("Get matches error:", err);
    return [];
  }
}

export async function getLiveSoccerFixtureListController() {
  try {
    const token = process.env.SPORTMONKS_API_TOKEN;

    const response = await axios.get(
      "https://api.sportmonks.com/v3/football/livescores/inplay",
      {
        params: {
          api_token: token,
          include: "participants;scores;periods;events;league.country;round"
        }
      }
    );

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Get matches error:", err);
    return [];
  }
}
