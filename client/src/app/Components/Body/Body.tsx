"use client";

import { useStore } from "@/store/store";
import Image from "next/image";
import styles from "./Body.module.css";
import Chat from "./Chat/Chat";
import { useEffect } from "react";
import axios from "axios";
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Body() {
  const selectedTab = useStore((state) => state.selectedTab);

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => console.log(data));
    fetch("http://localhost:5000/api/dbTest")
      .then((res) => res.json())
      .then((data) => console.log(data));
    axios
      .post(`${API_BASE}/api/visit`, { userKey: 1 })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  //   export const recordVisit = (userKey: number) => {
  //   return axios.post(`${API_BASE}/api/visit`, { userKey });
  // };

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
