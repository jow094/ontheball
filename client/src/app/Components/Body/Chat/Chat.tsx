"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import { sendMessages } from "../../../../../services/chatServices";
import { Message } from "../../../../../types/Message";
import { parseDateToKoreanArray } from "../../../../../utils/dateTime";
import {
  CaretRightIcon,
  CaretLeftIcon,
  PaperPlaneRightIcon,
} from "@phosphor-icons/react";

interface ChatProps {
  socket: Socket | null;
}

export default function Chat({ socket }: ChatProps) {
  const [isChatBodyExtended, setIsChatBodyExtended] = useState<boolean>(true);
  const [isExtendedCompletely, setIsExtendedCompletely] =
    useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

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

  // useEffect(() => {
  //   getMessages().then((msgs) => {
  //     setMessages(arrayToCamel(msgs.data) as Message[]);
  //   });
  // }, []);

  const executeSendMessage = () => {
    if (inputValue.trim()) {
      sendMessages(2, "GUEST", "GUEST", inputValue);
    }
    setInputValue("");
  };

  const addMessage = (newMsg: Message) => {
    setMessages((prev) => {
      const updated = [...prev, { ...newMsg, showTime: false }];

      const len = updated.length;
      if (len >= 2) {
        const lastDateStr = updated[len - 1].dateTime;
        const secondLastDateStr = updated[len - 2].dateTime;

        if (!lastDateStr || !secondLastDateStr) {
          // dateTime이 없으면 그냥 마지막 메시지 showTime true
          updated[len - 1].showTime = true;
          return updated;
        }

        const last = new Date(lastDateStr);
        const secondLast = new Date(secondLastDateStr);

        const lastStr = `${last.getHours()}:${last.getMinutes()}`;
        const secondLastStr = `${secondLast.getHours()}:${secondLast.getMinutes()}`;

        if (lastStr === secondLastStr) {
          updated[len - 2].showTime = false;
          updated[len - 1].showTime = true;
        } else {
          updated[len - 1].showTime = true;
        }
      } else {
        updated[0].showTime = true; // 첫 메시지는 항상 true
      }

      return updated;
    });
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setAutoScroll(isAtBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  useEffect(() => {
    if (!socket) return;

    const handleChat = (msg: Message) => {
      addMessage(msg);
    };

    socket.on("chat", handleChat);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      socket.off("chat", handleChat);
    };
  }, [socket, messages]);

  return (
    <div className={styles.container}>
      <div className={clsx(styles.body, !isChatBodyExtended && "row-shrunk")}>
        <div
          ref={messagesContainerRef}
          className={clsx(styles.messages, !isExtendedCompletely && "none")}
        >
          {messages.map((msg) => {
            return (
              <div key={msg.chatKey} className={styles.messageBox}>
                <div className={styles.message}>
                  <span className={styles.sender}>{msg.userId} :</span>&nbsp;
                  {msg.chatContent}
                </div>
                {msg.showTime && (
                  <div className={styles.time}>
                    {parseDateToKoreanArray(msg.dateTime, [3, 4])}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className={clsx(styles.input, !isExtendedCompletely && "none")}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                executeSendMessage();
              }
            }}
          />
          <div
            className={clsx(styles.sendButton, "button")}
            onClick={executeSendMessage}
          >
            <PaperPlaneRightIcon size={20} weight="bold" color="white" />
          </div>
        </div>
      </div>
      <div
        className={clsx(styles.sideButton, "button")}
        onClick={toggleChatVisible}
      >
        {isChatBodyExtended ? (
          <CaretLeftIcon weight="bold" />
        ) : (
          <CaretRightIcon weight="bold" />
        )}
      </div>
    </div>
  );
}
