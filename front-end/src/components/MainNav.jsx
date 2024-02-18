import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";

import styles from './MainNav.module.css';

const MainNav = () => {
    const profilePicStyle = {
        width: '30px',
        height: '30px',
        borderRadius: '50%', 
        objectFit: 'cover', 
      };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
        <Navbar.Brand>
            <Link href="/" legacyBehavior>
              <div className={styles.navbarBrand}>
                <img src="/logo1.png" alt="Logo" className={styles.logo} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" />
                <span className={styles.brandText}>WinterWay</span>
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className={styles.toggle}>
            {}
            <Nav className="ms-auto">
              <Link href="/maps" passHref legacyBehavior>
                <Nav.Link className={styles.navbarLink1}>Map</Nav.Link>
              </Link>
              <Link href="/about" passHref legacyBehavior >
                <Nav.Link className={styles.navbarLink2}>About</Nav.Link>
              </Link>
 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/><br/>
    </>
  );
};

export default MainNav;