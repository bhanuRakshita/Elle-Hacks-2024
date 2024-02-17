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
              <NavDropdown 
                title={<img src="/user.png" alt="Profile" style={profilePicStyle} />} 
                id="basic-nav-dropdown" 
                align="end"
                >
                <NavDropdown.Item className={styles.dropdown1} href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className={styles.dropdown2} href="#action/3.4">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/><br/>
    </>
  );
};

export default MainNav;