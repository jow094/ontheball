"use client";

import Image from "next/image";
import styles from "./NavBar.module.css";
import { useTapStore } from "@/store/store";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import {
  SoccerBallIcon,
  BasketballIcon,
  BaseballIcon,
  UsersIcon,
  UserCircleIcon,
  ChatCenteredIcon,
} from "@phosphor-icons/react";

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
          <SoccerBallIcon
            size={20}
            weight="fill"
            style={{
              marginRight: "10px",
              marginBottom: "3px",
            }}
          />
          SOCCER
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "baseball" && styles.active
          )}
          onClick={() => setSelectedTab("baseball")}
        >
          <BaseballIcon
            size={20}
            weight="fill"
            style={{
              marginRight: "10px",
              marginBottom: "3px",
            }}
          />
          BASEBALL
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "basketball" && styles.active
          )}
          onClick={() => setSelectedTab("basketball")}
        >
          <BasketballIcon
            size={20}
            weight="fill"
            style={{
              marginRight: "10px",
              marginBottom: "3px",
            }}
          />
          BASKETBALL
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "community" && styles.active
          )}
          onClick={() => setSelectedTab("community")}
        >
          <UsersIcon
            size={20}
            weight="fill"
            style={{
              marginRight: "10px",
              marginBottom: "3px",
            }}
          />
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
