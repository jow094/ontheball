"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Board.module.css";
import clsx from "clsx";
import { Socket } from "socket.io-client";
import { sendMessages } from "../../../../../services/chatServices";
import { Message } from "../../../../../types/Message";
import { parseDateToKoreanArray } from "../../../../../utils/dateTime";
import {
  HeartIcon,
  ThumbsUpIcon,
  FireIcon,
  ChatCircleIcon,
  ChatTeardropIcon,
  ChatCenteredIcon,
} from "@phosphor-icons/react";

interface BoardProps {
  socket: Socket | null;
  address: string;
}

export default function Board({ socket, address }: BoardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{address} 게시판</div>
      <div className={styles.body}>
        <div className={styles.contents}>
          <table className={styles.boardTable}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th></th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <span className={styles.title}>ㅇ</span>
                </td>
                <td>
                  <HeartIcon
                    size={15}
                    weight="fill"
                    style={{ marginRight: "3px" }}
                  />
                  311
                  <ChatCenteredIcon
                    size={15}
                    weight="fill"
                    style={{ marginLeft: "5px", marginRight: "3px" }}
                  />
                  233
                </td>
                <td>조우영</td>
                <td>25.11.09 21:04</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.pagination}>페이지네이션</div>
        <div className={styles.searchBar}>검색창</div>
        <div className={styles.writeButton}>작성하기</div>
      </div>
    </div>
  );
}
