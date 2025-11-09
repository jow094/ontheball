"use client";

import { useState } from "react";
import styles from "./Chat.module.css";
import clsx from "clsx";

export default function Chat() {
  const [isChatBodyExtended, setIsChatBodyExtended] = useState<boolean>(true);
  const [isExtendedCompletely, setIsExtendedCompletely] =
    useState<boolean>(true);

  const toggleChatVisible = () => {
    setIsChatBodyExtended((prev) => {
      const next = !prev;

      if (next) {
        setTimeout(() => {
          setIsExtendedCompletely(true);
        }, 100);
      } else {
        setIsExtendedCompletely(false);
      }

      return next;
    });
  };

  return (
    <div className={styles.container}>
      <div className={clsx(styles.body, !isChatBodyExtended && "row-shrunk")}>
        <div className={clsx(styles.messages, !isExtendedCompletely && "none")}>
          <div className={styles.message}>
            asdasdasdasdasdasdasdasdsadasdasdasdasdasdsadsadasdasdas
          </div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
          <div className={styles.message}>asd</div>
        </div>
        <div className={clsx(styles.input, !isExtendedCompletely && "none")}>
          <textarea />
          <div className={clsx(styles.sendButton, "pointer")}></div>
        </div>
      </div>
      <div className={styles.sideButton} onClick={toggleChatVisible}>
        {isChatBodyExtended ? "닫기" : "열기"}
      </div>
    </div>
  );
}
