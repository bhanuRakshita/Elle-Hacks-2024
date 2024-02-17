import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dashboardStyle = {
    backgroundImage: `url(/background.png)`, // Ensure you have the correct path
    backgroundSize: 'cover', // Cover the entire area
    backgroundPosition: 'center', // Center the background image
    height: '100vh', // Full height of the viewport
    width: '100vw', // Full width of the viewport

  };
  return (
    <div style={dashboardStyle}>
     
    </div>
  );
}
