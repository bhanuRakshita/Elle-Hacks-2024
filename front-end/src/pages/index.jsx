import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const dashboardStyle = {
    backgroundImage: `url(/background.jpg)`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    height: '95vh', 
    width: '100vw', 

  };
  return (
    <div style={dashboardStyle}>
      <h1 className={styles.dashboardHeading}>Smooth ride, every time</h1>
      <h3 className={styles.dashboardSmallHeading}>Try our app to search the most accessible</h3>
      <h3 className={styles.dashboardSmallHeading}>routes during snowstorms</h3>
      <div className={styles.buttonContainer}>
      <button className={styles.dashboardButton}>  SEARCH NOW
  <img src="./loop.png" alt="Search Icon" className={styles.searchIcon} />

</button>

      </div>
    </div>
  );
  
}
