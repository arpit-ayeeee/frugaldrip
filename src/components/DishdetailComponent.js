import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Button, Row, Alert, Badge} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import{ FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const minlength = (len) => (val) => (val) && (val.length) >= len;
const maxlength = (len) => (val) => !(val) || (val.length) <= len;

    function RenderDish({dish}) {//Passing dish in form for props
        if (dish != null) {
            return (
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <Card>
                        <CardImg top width="100%" src={baseUrl+dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}<tr/><Badge>{dish.price}</Badge></CardTitle>
                            <hr/><CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    };

    function RenderComments({comments}) {//here too, passing in the form of props
        if (comments != null) {
            return(
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                    <Fade in>
                                    <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                    </Fade>
                                );
                        })}
                    </Stagger>
                </ul> 
            );   
        }
        else {
            return (<div />);
        }
    };
const DishDetail = (props) =>{
    if(props.isLoading){    //says if isLoading is true, we'll show the loading spinner 
         return (           //Cause initially in the dishes state the isLoading is true 
            <div className="container">
                <div className="row">
                    <Loading /> 
                </div>
            </div>
         );
    }
    else if(props.errMess){   //says if the error message is true, then 
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
         );
    }
    else if(props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                     <div className=" col-12">
                         <h3>{props.dish.name}</h3>
                         <hr/> 
                     </div>
                </div>
                <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        {props.comments == null ? null : <h4>Comment</h4>}
                            <RenderComments comments={props.comments}  />
                            <div> <CommentForm postComment={props.postComment} dishId={props.dish.id} /> </div>
                        </div>
                </div>
            </div>
        );
};
 
    

class CommentForm extends Component{
        constructor(props){
            super(props);
    
            this.state ={
                isOpen: false
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
        }
    
        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
        }
        toggleModal(){
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    
        render(){
            return(
                <React.Fragment>
                    <Button outline color="secondary" onClick={this.toggleModal}> 
                        <span className="fa fa-pencil">  Submit Comments</span>
                    </Button>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody className="ml-3 mr-3">
                            <LocalForm onSubmit= {(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" className="form-control" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select> 
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                    className="form-control"  placeholder="Your name"
                                    validators={{
                                        required, minlength: minlength(3), maxlength: maxlength(15)
                                    }}
                                    />
                                    <Errors className="text-danger" model=".name" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minlength: 'Must be greater than three characters',
                                            maxlength: 'Must not 15 characters or less'
                                        }} 
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control"/>
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">Submit</Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            )
        }
}
    
export default DishDetail;