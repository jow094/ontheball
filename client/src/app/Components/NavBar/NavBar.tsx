"use client";

import Image from "next/image";
import styles from "./NavBar.module.css";
import { useStore } from "@/store/store";
import clsx from "clsx";

export default function NavBar() {
  const setSelectedTab = useStore((state) => state.setSelectedTab);
  const selectedTab = useStore((state) => state.selectedTab);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>OnTheBall</div>
      <div className={styles.menus}>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "soccer" && styles.active
          )}
          onClick={() => setSelectedTab("soccer")}
        >
          Soccer
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "baseball" && styles.active
          )}
          onClick={() => setSelectedTab("baseball")}
        >
          Baseball
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "basketball" && styles.active
          )}
          onClick={() => setSelectedTab("basketball")}
        >
          Basketball
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "volleyball" && styles.active
          )}
          onClick={() => setSelectedTab("volleyball")}
        >
          Volleyball
        </div>
        <div
          className={clsx(
            styles.menu,
            selectedTab === "hockey" && styles.active
          )}
          onClick={() => setSelectedTab("hockey")}
        >
          Hockey
        </div>
      </div>
      <div className={styles.profile}></div>
    </div>
  );
}
