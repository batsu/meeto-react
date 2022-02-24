import React from 'react'
import '../App.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  
  handleLogout() {
    document.cookie = "token="
    this.props.setLoggedIn(false)
 }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src="/assets/images/meeto.png" height="40" className="mr-1 my-2" alt="" loading="lazy" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/timeline"><button className="btn btn-light mr-3 mt-2 btn-login">Timeline</button></Link>
              </NavItem>
              <NavItem>
                <Link to="/makemeeto"><button className="btn btn-light mr-3 mt-2 btn-login">Meetos</button></Link>
              </NavItem>
              <NavItem>
                {(!this.props.loggedIn) ? <Link to="/login"><button className="btn btn-light mr-3 mt-2 btn-login">Log In</button></Link> : <button className="btn btn-light mr-3 mt-2 btn-login" onClick={() => this.handleLogout()}>Log Out</button>}
              </NavItem>
              <NavItem>
              <button className="btn btn-light mr-3 mt-2 btn-login" onclick="window.location.href='/register';">Sign Up</button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function HeaderParts() {
  return (
    <>
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-1">
            <a href="/">
                <img src="/assets/images/meeto.png" height="40" className="mr-1 my-2" alt="" loading="lazy" />
              </a>
            <button classNameName="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span classNameName="navbar-toggler-icon"></span>
            </button>
          
            <div classNameName="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/timeline">Timeline</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/timeline">Search</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/" tabindex="-1">Help</a>
                </li>
              </ul>


                <button className="btn btn-light mr-3 btn-login" onclick="window.location.href='/login';">Log In</button>
                <a href="/register" className="btn btn-secondary">Sign Up</a>
              
            </div>
          </nav>

        </header>
    </>
  )
  }