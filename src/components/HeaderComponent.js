import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, Button, ModalHeader, ModalBody, FormGroup, Form, Input, Label} from 'reactstrap';//reactstrap is used for bootstrap js compo in react 
import {NavLink} from 'react-router-dom'; //This acts as a link/a tag
class Header extends Component{

    constructor(props){
        super(props);
        this.state={//Initially we declare the state to false
            isNavOpen : false,  
            isModalOpen : false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this); //We'll bind both of the methods
        this.handleLogin = this.handleLogin.bind(this);
    }
    toggleNav(){//When we have method, we have to bind it, so that it can be used in jsx
        this.setState({//When the toggler is clicked, we make a method called toggleNav, where we'll setState to true, so that the navitems come inside the dropdown
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen //This will make the isModalOpen true, and it'll toogle the modal
        })
    }
    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
        //Here, we do not define the state, we're retrieving the value  directly from the DOM and using here.
        event.preventDefault();
    }
    render(){
        return(//Given below is the short form syntax for react fragment.  React.Fragment allows us to group together a bunch of react elements. We can use a div instead of it, but it'll add another node to the DOM tree
            //Expand="md" says navbar will be in it's full form from md to xl size, below that it'LL collapse
            <React.Fragment>
                <Navbar dark className="fixed-top">
                    <div className="container">
                        <NavbarBrand className="m-auto" href="/"> 
                            <img src="assets/images/logo.jpeg" height="40" width="120" alt="Ristorante DeConfu" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Nav navbar>
                                <NavItem className="m-auto">
                                    <Button onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-md"></span>
                                    </Button>
                                </NavItem>
                        </Nav>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem className="m-auto">
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-md">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="m-auto">
                                    <NavLink className="nav-link" to="/about">
                                        <span className="fa fa-info fa-md">About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="m-auto"> 
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-md">Collection</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="m-auto">
                                    <NavLink className="nav-link" to="/contact">
                                        <span className="fa fa-address-acrd fa-md">Contact Us</span> 
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron className="mt-5">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1 className="hidden-sm">Frugal Drip</h1>
                                <p>We are a street fashion label focused on street style oversized unisex t-shirts. We're about to drop our merch in few months. This portal is for the review and feedback from the user about our products.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody className="ml-3 mr-3">
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup row>  
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember Me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">
                                Login
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
export default Header;
//Inside the modal we'll have the uncontrolled form
//Using toggle={this.toggleModal} in ModalHeader, give crosss button in the left
//Using toggle={this.toggleModal} in the Modal, makes the modal disapper when we click outside the modal

//In uncontrolled forms, we do not declare the state, we directly extract the value using innerRef, and call it in out method, the DOM handles other things
//In reactstrap, for uncontolled FORMS we retrieve the input using  "innerRef"
//Other than reactstrap, we directly use "Ref"