import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../context/authContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Logo from "../img/33.png"
import "../styles/Navbar.scss";

function NewNavbar() {

  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to the login page after logout
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className='container'>
        <Navbar.Brand  href="/"> <img className='navimg' src={Logo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className='collapse' id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='link' href="/">Home</Nav.Link>
            <Nav.Link className='link' href="/calculate">Calorie Calculator</Nav.Link>
            <Nav.Link className='link' href="/diet">My Diet</Nav.Link>
            <Nav.Link className='link' href="/aboutUs">About Us</Nav.Link>
            <Nav.Link className='link' href="/profile">Profile</Nav.Link>
            <NavDropdown title="Blog Categories" id="collapsible-nav-dropdown">
            <Nav.Link href="/PostHome" className='link' ><h6>ALL</h6></Nav.Link>
            <Nav.Link href="/PostHome?cat=MentalHealth" className='link' ><h6>MENTAL HEALTH</h6></Nav.Link>
            <Nav.Link href="/PostHome?cat=Foods" className='link' ><h6>FOODS</h6></Nav.Link>
            <Nav.Link href="/PostHome?cat=Vegetables" className='link' ><h6>VEGETABLES</h6></Nav.Link>
            <Nav.Link href="/PostHome?cat=Vegetarian" className='link' ><h6>VEGEATARIAN</h6></Nav.Link>
            <Nav.Link href="/PostHome?cat=Exercise" className='link' ><h6>EXERCISE</h6></Nav.Link>
            <Nav.Link href="/PostHome?cat=Vitamins" className='link' ><h6>VITAMINS</h6></Nav.Link>
              
            </NavDropdown>
          </Nav>
          <Nav>
            
            <span>{currentUser?.username}</span>
            <span className='write'>
            <Link className='link' to="/write">Write</Link>
            </span>
            {currentUser ? <span onClick={handleLogout}>Logout</span> : <Link className='loginlink' to="/login"> Login</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewNavbar;