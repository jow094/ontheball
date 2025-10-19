"use client";

import { useStore } from "@/store/store";
import Image from "next/image";
import styles from "./Body.module.css";
import Chat from "./Chat/Chat";

export default function Body() {
  const selectedTab = useStore((state) => state.selectedTab);
  return (
    <div className={styles.container}>
      <div className={styles.verticalAd}>vad1</div>
      <div className={styles.chat}>
        <Chat />
      </div>
      <div className={styles.content}>
        <div className={styles.article}>{selectedTab}</div>
        <div className={styles.horizontalAd}>had1</div>
      </div>
      <div className={styles.verticalAd}>vad2</div>
    </div>
  );
}
