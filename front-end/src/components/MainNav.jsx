import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";

import styles from './MainNav.module.css';

const MainNav = () => {
    const profilePicStyle = {
        width: '30px',
        height: '30px',
        borderRadius: '50%', // Makes the image round
        objectFit: 'cover', // Ensures the image covers the area without stretching
      };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand><Link href="/" legacyBehavior>Elle Hacks</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Adjusted from me-auto to ms-auto */}
            <Nav className="ms-auto">
              <Link href="/maps" passHref legacyBehavior>
                <Nav.Link>Map</Nav.Link>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link>About</Nav.Link>
              </Link>
              <NavDropdown 
                title={<img src="https://via.placeholder.com/150" alt="Profile" style={profilePicStyle} />} 
                id="basic-nav-dropdown" 
                align="end"
                >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
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