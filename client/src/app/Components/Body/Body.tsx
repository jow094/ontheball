"use client";

import { useTapStore } from "@/store/store";
import styles from "./Body.module.css";
import Chat from "./Chat/Chat";
import { useEffect } from "react";
import { logUserVisit } from "../../../../services/logServices";
import { Socket } from "socket.io-client";
import Board from "./Board/Board";

interface BodyProps {
  socket: Socket | null;
}

export default function Body({ socket }: BodyProps) {
  const selectedTab = useTapStore((state) => state.selectedTab);

  const getArticle = () => {
    switch (selectedTab) {
      case "community":
      case "uyeong":
        return <Board socket={socket} address={selectedTab} />;
      default:
        return <div>{selectedTab}</div>;
    }
  };

  useEffect(() => {
    logUserVisit(1);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.verticalAd}>vad1</div>
      <div className={styles.bodyWrapper}>
        <div className={styles.chat}>
          <Chat socket={socket} />
        </div>
        <div className={styles.content}>
          <div className={styles.article}>{getArticle()}</div>
          <div className={styles.horizontalAd}>had1</div>
        </div>
      </div>
      <div className={styles.verticalAd}>vad2</div>
    </div>
  );
}
