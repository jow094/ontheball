"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div>© 2025 OnTheBall Inc. All rights reserved. </div>
      <div>사업자등록번호: 123-45-67890 | 대표: 조우영</div>
    </div>
  );
}
