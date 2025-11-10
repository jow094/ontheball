"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Soccer.module.css";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import {
  HeartIcon,
  ThumbsUpIcon,
  FireIcon,
  ChatCircleIcon,
  ChatTeardropIcon,
  ChatCenteredIcon,
} from "@phosphor-icons/react";
import api from "../../../../../utils/api";
import { Fixture } from "../../../../../types/Sports";
import {
  getSoccerFixtureList,
  getLiveSoccerFixtureList,
} from "../../../../../services/sportsServices";

interface BoardProps {
  socket: Socket | null;
}

type MatchStatus = {
  short: string;
  long: string;
  meaning: string;
};

const statusMap: Record<string, MatchStatus> = {
  NS: { short: "NS", long: "Not Started", meaning: "시작 전" },
  "1H": { short: "1H", long: "First Half", meaning: "전반전" },
  HT: { short: "HT", long: "Halftime", meaning: "전반 종료" },
  "2H": { short: "2H", long: "Second Half", meaning: "후반전" },
  ET: { short: "ET", long: "Extra Time", meaning: "연장전" },
  P: { short: "P", long: "Penalty Kick", meaning: "패널티킥" },
  BT: { short: "BT", long: "Break Time", meaning: "휴식중" },
  SUSP: { short: "SUSP", long: "Suspended", meaning: "중단" },
  ABD: { short: "ABD", long: "Abandoned", meaning: "취소" },
  INT: { short: "INT", long: "Interrupted", meaning: "중단/중지" },
  PST: { short: "PST", long: "Postponed", meaning: "연기" },
  CANC: { short: "CANC", long: "Canceled", meaning: "취소" },
  TBD: { short: "TBD", long: "To Be Defined", meaning: "미정" },
  LIVE: { short: "LIVE", long: "Live", meaning: "진행 중" },
  FT: { short: "FT", long: "Full Time", meaning: "종료" },
  AET: { short: "AET", long: "After Extra Time", meaning: "연장 후 종료" },
  PEN: { short: "PEN", long: "Penalties", meaning: "승부차기 후 종료" },
};

const inProgressStatuses = ["1H", "2H", "HT", "ET", "P", "LIVE", "BT"];
const notStartedStatus = "NS";
const now = new Date();

export default function Sports({ socket }: BoardProps) {
  const [validMatches, setValidMatches] = useState<Fixture[]>([]);
  const [liveMatches, setLiveMatches] = useState<Fixture[]>([]);
  const [errMatches, setErrMatches] = useState<Fixture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const matches = await getSoccerFixtureList("2025-11-10");
      const liveMatches = await getLiveSoccerFixtureList();
      console.log(matches);
      if (!matches) return;

      const valid: Fixture[] = [];
      const error: Fixture[] = [];

      matches.forEach((match: Fixture) => {
        const fixtureDate = new Date(match.fixture.date);
        const status = match.fixture.status.short;

        // 시작 전인데 경기 시작시간 1시간 이상 지났으면 문제 경기
        if (
          status === notStartedStatus &&
          now.getTime() - fixtureDate.getTime() > 1000 * 60 * 60
        ) {
          error.push(match);
        } else {
          valid.push(match);
        }
      });

      // 상태 우선순위: 경기중 > 시작전 > 종료
      const getStatusPriority = (fixture: Fixture) => {
        const status = fixture.fixture.status.short;
        if (inProgressStatuses.includes(status)) return 0;
        if (status === notStartedStatus) return 1;
        return 2; // 종료된 경기
      };

      // 정렬
      const sortedValid = valid.slice().sort((a, b) => {
        const priorityA = getStatusPriority(a);
        const priorityB = getStatusPriority(b);

        if (priorityA !== priorityB) return priorityA - priorityB;

        return (
          new Date(a.fixture.date).getTime() -
          new Date(b.fixture.date).getTime()
        );
      });

      const sortedError = error.slice().sort((a, b) => {
        return (
          new Date(a.fixture.date).getTime() -
          new Date(b.fixture.date).getTime()
        );
      });

      setValidMatches(sortedValid);
      setErrMatches(sortedError);
    };

    fetchData();
  }, []);

  // 경기 상태에 따라 현재 시간/스코어 표시 함수
  const getMatchStatus = (fixture: Fixture): string => {
    const short = fixture.fixture.status.short;
    const status = statusMap[short] || {
      short,
      long: "Unknown",
      meaning: "알 수 없는 상태",
    };

    // 1H 또는 2H 일 때만 elapsed 반환
    if (
      (short === "1H" || short === "2H") &&
      fixture.fixture.status.elapsed != null
    ) {
      return `${fixture.fixture.status.elapsed}분`;
    }

    return status.meaning;
  };

  const getScore = (fixture: Fixture) => {
    const status = fixture.fixture.status.short;
    if (status === "NS") return "시작전";
    if (status === "FT")
      return `${fixture.score.fulltime.home} - ${fixture.score.fulltime.away}`;
    // 경기중이면 라이브 스코어
    return `${fixture.goals.home ?? 0} - ${fixture.goals.away ?? 0}`;
  };

  const getHalftimeScore = (fixture: Fixture) => {
    const halftime = fixture.score.halftime;
    return `${halftime.home ?? 0} - ${halftime.away ?? 0}`;
  };

  const getKickoffTime = (fixture: Fixture) => {
    const date = new Date(fixture.fixture.date);
    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 포맷
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  return (
    <div className={styles.container}>
      <div>
        <table className={styles.soccerTable}>
          <thead>
            <tr>
              <th>LEAGUE</th>
              <th>KICKOFF</th>
              <th>STATUS</th>
              <th>HOME</th>
              <th>SCORE</th>
              <th>AWAY</th>
              <th>HT</th>
            </tr>
          </thead>
          <tbody>
            {validMatches.length > 0 ? (
              validMatches.map((match) => (
                <tr
                  key={match.fixture.id}
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <td>{match.league.name}</td>
                  <td>{getKickoffTime(match)}</td>
                  <td>{getMatchStatus(match)}</td>
                  <td>{match.teams.home.name}</td>
                  <td>{getScore(match)}</td>
                  <td>{match.teams.away.name}</td>
                  <td>{getHalftimeScore(match)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>loading...</td>
                <td>loading...</td>
                <td>loading...</td>
                <td>loading...</td>
                <td>loading...</td>
                <td>loading...</td>
                <td>loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
