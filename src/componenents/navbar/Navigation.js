import axios from 'axios';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/userSlice';
import './navbar.css'
axios.defaults.withCredentials = true;
const Navigation = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  const navigate = useNavigate();
      
  const sendLogOutReq = async ()=>{
    const res = await axios.post(`http://localhost:5000/logout`,null, {
      withCredentials : true
    })
    if(res.status === 200){
      return res;
    }
    return new Error("Unable to Logout, Please try again")
  }
  const handleLogOut = ()=>{
    // change the state also here so useDispatch
    sendLogOutReq().then(()=>dispatch(authActions.logout())).then(()=>navigate('/'))
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  className="fixed-top">
      <Container>
        <Navbar.Brand>
        <NavLink className="text-decoration-none text-light mx-3" to="/">Quiz Apps</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            { isLoggedIn && <>
            <NavLink className="text-decoration-none text-light mx-3" to="/playquiz">Play Quiz</NavLink>
            <NavLink className="text-decoration-none text-light mx-3" to="/createquiz">Create Quiz</NavLink>
            </> }
          </Nav>
          <Nav>
         { !isLoggedIn && <>  <NavLink className="text-decoration-none text-light mx-3" to="/login">Login</NavLink>
            <NavLink className="text-decoration-none text-light mx-3"  to="/register">
              Registration
            </NavLink>  </>}
            <NavLink className="text-decoration-none text-light mx-3"  to="/aboutus">
              About Us
            </NavLink>
            <NavLink className="text-decoration-none text-light mx-3"  to="/contactus">
              Contact Us
            </NavLink>
          { isLoggedIn && <NavLink onClick={handleLogOut} className="text-decoration-none text-light mx-3"  to="/logout">
              Logout
            </NavLink> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Navigation
