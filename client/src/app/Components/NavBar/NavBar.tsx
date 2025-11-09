"use client";

import Image from "next/image";
import styles from "./NavBar.module.css";
import { useTapStore } from "@/store/store";
import clsx from "clsx";
import { Socket } from "socket.io-client";

interface NavBarProps {
  socket: Socket | null;
}

export default function NavBar({ socket }: NavBarProps) {
  const setSelectedTab = useTapStore((state) => state.setSelectedTab);
  const selectedTab = useTapStore((state) => state.selectedTab);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>ON THE BALL</div>
      <div className={styles.menus}>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "soccer" && styles.active
          )}
          onClick={() => setSelectedTab("soccer")}
        >
          SOCCER
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "baseball" && styles.active
          )}
          onClick={() => setSelectedTab("baseball")}
        >
          BASEBALL
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "basketball" && styles.active
          )}
          onClick={() => setSelectedTab("basketball")}
        >
          BASKETBALL
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "community" && styles.active
          )}
          onClick={() => setSelectedTab("community")}
        >
          COMMUNITY
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "uyeong" && styles.active
          )}
          onClick={() => setSelectedTab("uyeong")}
        >
          UYEONG
        </div>
      </div>
      <div className={styles.profile}></div>
    </div>
  );
}
