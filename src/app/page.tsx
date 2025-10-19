import styles from "./page.module.css";
import Body from "./Components/Body/Body";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.navBar}>
        <NavBar />
      </div>
      <div className={styles.body}>
        <Body />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
