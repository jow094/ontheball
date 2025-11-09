"use client";

import styles from "./page.module.css";
import Body from "./Components/Body/Body";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
        transports: ["websocket", "polling"],
      });

      socketRef.current.on("connect", () => {
        console.log("서버 연결됨:", socketRef.current?.id);
        setConnected(true);
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.navBar}>
        <NavBar socket={socketRef.current} />
      </div>
      <div className={styles.body}>
        <Body socket={socketRef.current} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
