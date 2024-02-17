import Head from 'next/head';
import styles from './about.module.css'; // Import CSS module

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <div className={styles.pageContainer}> {/* Apply CSS class */}
        <div className={styles.aboutContainer}> 
          <h1>About Us</h1>
          <p>Welcome to WinterWay! We specialize in creating routes from one place to another during winter, providing users with stops at warm shelters instead of bus stops. Our goal is to ensure that users can stay warm and comfortable while traveling during cold weather conditions.</p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
