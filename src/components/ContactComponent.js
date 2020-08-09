import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control,  Form, Errors} from 'react-redux-form';
 

const required = (val) => val && val.length;    //This const variable checks to see the value passed a parameter is greater than zero
const maxLength = (len) => (val) => !(val) || (val.length) <= len; //This function will take len and val as para, and ensures that the length of value is less than or equal to the given len. Checks the value entered in input box is below a certain value
const minLength = (len) => (val) => (val) &&  (val.length) >= len; //To check that the value is greater than zero and greater than a certain len 
const isNumber = (val) => !isNaN(Number(val)); // To check, the value is a number, isNaN is predefined function which tell wheather the value is not a number, so we used !isNan to check wheather value is a number or not. Number is a variable, which tells the numerical value of any string
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); //Regular Expressions

class Contact extends Component{
//In order to enable a form, we had to convert this component into a class component. So, that we can store the state for all the properties in the constructer.
    constructor(props){
        super(props);
        //The state will be managed by the react-redux-form
        this.handleSubmit  = this.handleSubmit.bind(this);//In order make the methid available for use, we've to bind it 
    }

//FOR DISPLAYING THE ENTERED DATA   
    handleSubmit(values){//So, when we click on submit button, the handleSubmit will be called, we'll call this function in form 
         this.props.resetFeedbackForm(); 
         this.props.postFeedback(
            values.firstname,
            values.lastname,
            values.telnum,
            values.email,
            values.agree,
            values.contactType,
            values.message
            );
    }


    render(){  
        return(
            <div className="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contacts</BreadcrumbItem>
                        </Breadcrumb>
                        <div className=" col-12">
                            <h3>Contacts</h3>
                            <hr /> 
                        </div>
                    </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address className="text-secondary">
                                Ramky North, Avalahalli<br />
                                Yelahanka, Bengaluru (560064)<br />
                                Karnataka<br />
                            <i className="fa fa-phone"></i>: +91 6266066700<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:frugaldrip69420@gmail.com">Mail us</a>
                            </address>
                    </div>
                    
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <div className="btn-group" role="group"> 
                            <a role="button" className="btn btn-primary" href="tel:+916266066700"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-instagram"></i> Instagram</a>
                            <a role="button" className="btn btn-success" href="mailto:frugaldrip69420@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback </h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname" 
                                        placeholder="First Name" className="form-control"//We used the bootstrap class
                                        validators={{   //This is how we validate the form using redux
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        /> 
                                    <Errors className="text-danger" model=".firstname" show="touched" 
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than two characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname" 
                                        placeholder="Last Name" className="form-control"
                                        validators={{   
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors className="text-danger" model=".lastname" show="touched" 
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than two characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum" 
                                        placeholder="Tel. Number" className="form-control"
                                        validators={{
                                            required, isNumber
                                        }} 
                                        />   
                                    <Errors className="text-danger" model=".telnum" show="touched"
                                        messages={{
                                            required: 'Required ',
                                            isNumber: 'Must be number'
                                        }} 
                                    /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email" 
                                        placeholder="Email" className="form-control" 
                                        validators={{
                                            required, validEmail
                                        }} 
                                        />   
                                    <Errors className="text-danger" model=".email" show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                            className="form-check-input" />{' '}
                                            <strong>May we contact you?</strong>
                                        </Label>  
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType" className="form-control"> 
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback " md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" 
                                        className="form-control" />   
                                </Col>
                            </Row> 
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
     }
}
export default Contact;
//md={2} inside label means in medium to extra large screen sizes, label will take two blocks
//Inside <FormGroup row>, we don't have div for using col inside className, so we use <Col md={x}> as grid.
//We use htmlFor, which is a jsx attribute, so that it'll not be confused with the javascript for 
//We use the value of 'htmlFor' in label and 'name' in the input SAME, so that they' re linked\
//We provide the state in the "value", and that's how it becomes a controlled form


//In react-redux-form we use LocalForm instead of simply Form
//In react-redux-form, we use Row attribute instead of FormGroup attribute from the reactStrap
//All input attributes will be changed to Control.text, and type will be after the Control. 
//Specifing the model will be equivalent to declaring the state


//DECLARING STATE IN REDUX === In this we just changed LocalForm with Form and added model="feedback", feedback which is the state we defined and added it as a reducer in the configure store, and passed to main component
//We did this so that the state remains, even if we navigate thru the webpages, the details will be filled in if we do not submit it.
//Omce we submit the form, the state will be reset back to empty state.