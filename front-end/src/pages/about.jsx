import Head from 'next/head';
import styles from './about.module.css'; 


const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" />
      </Head>
      <div className={styles.pageContainer}> 
        <div className={styles.aboutContainer}> 
          <h1>About Us</h1>
          <h2>Welcome to WinterWay!</h2>
          <p> We specialize in creating routes from one place to another during winter, providing users with stops at warm shelters instead of bus stops. Our goal is to ensure that users can stay warm and comfortable while traveling during cold weather conditions.</p>
          <h4>We will save you from waiting for transportation in the cold!</h4>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
