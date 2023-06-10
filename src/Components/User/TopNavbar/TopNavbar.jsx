import React from 'react'
import { useLocation, Link, Navigate } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import '../TopNavbar/TopNavbar.css'
import { useNavigate } from 'react-router-dom'

function TopNavbar() {
  const location = useLocation()
  const navigate = useNavigate()

  function isActive(path) {
    return location.pathname === path
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand style={{ marginLeft: '1em' }} as={Link} to="/">
          Logo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              id="navlinks"
              as={Link}
              to="/"
              active={isActive('/')}
            >
              Home
            </Nav.Link>

            <Nav.Link
              id="navlinks"
              as={Link}
              to="/about"
              active={isActive('/about')}
            >
              About
            </Nav.Link>

            <Nav.Link
              id="navlinks"
              as={Link}
              to="/services"
              active={isActive('/services')}
            >
              Services
            </Nav.Link>

            <Nav.Link
              id="navlinks"
              as={Link}
              to="/contact"
              active={isActive('/contact')}
            >
              Contact
            </Nav.Link>
          </Nav>

          <Nav id="buttons">
            <Button onClick={() => {navigate('/login')}} variant="outline-light" className="mr-2" id="login">
              Login
            </Button>

            <Button onClick={() => {navigate('/signup')}} variant="outline-light" id="signup">
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default TopNavbar;
