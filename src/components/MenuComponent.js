 //FUNCTIONAL COMPONENT DOESN'T HAVE ANY STATE, WE JUST USE THE PROPS
import React from 'react';//Not a class component, we'll use it as a functional component
import { Card, CardImg, Breadcrumb, BreadcrumbItem, CardHeader, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'; 
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';
import './menu.css';
import './bread.css';

    function RenderMenuItem({dish, Onclick}){
        return(//Using Link, this is how we use route parameters, by removing all this onclick jsx. We used back-quotes so cause it's url, so that it'll be changed
                <Card id="card">
                    <Link to={`/menu/${dish.id}`}>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                            <CardSubtitle id="head" className="text-center align-self-center">{dish.name}</CardSubtitle>
                    </Link>
                </Card>
        ); 
    };

    const Menu = (props) => {
        const menu = props.dishes.dishes.map((dish) => {//arrow function usage
                            return (
                                <div key={dish.id} className="col-6 col-md-4">
                                        <RenderMenuItem dish={dish} />
                                </div>
                            );
                        })
        
        if(props.dishes.isLoading){    //says if isLoading is true, we'll show the loading spinner 
            return (                       //Cause initially in the dishes state the isLoading is true
                <div className="container">
                    <div className="row">
                        <Loading /> 
                    </div>
                </div>
            );
        }
        else if(props.dishes.errMess){   //says if the error message is true, then 
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (//Given below is how we use breadcrumb using reactstrap 
                <div className="container">
                    <div className="row">
                        <Breadcrumb id="bread">
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr /> 
                        </div>
                    </div>
                    <div className="row">
                            {menu}
                    </div>
                </div>
            );                  
    } 
        
export default Menu;//we always need to export the component
//Cause we'll import it somewhere tooo



//Here, we'll return the view for each of the item
//Whenever we represent a list of items, every item requires a key attribute. Key enables to identify each element uniquely
//Map operator iterates over every dish in dishes array  
//Now,when card is clicked, we'll call onClick(dish.id) function using props, as we passed it. And in menuCompo in onClick function, we'll call the onDishSelect function using arrow function, where the state of selectedDish is set to dishId