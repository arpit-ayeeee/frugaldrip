import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import{  Fade, Stagger} from 'react-animation-components';

function RenderLeader({leader, isLoading, errMess}){
    if(isLoading){
        return (
            <div className="container">
                <div className="row">
                <Loading />
                </div>
            </div>
        );
    }
    else if(errMess){
        return(
             <h4>{errMess}</h4>
        )
    }
    else
        return(
            <Media>
                    <Media left className="mr-5" >
                        <Media object width="100px" height="100px" src={baseUrl + leader.image}></Media>
                    </Media>
                    <Media body>
                        <Media heading className="text-success">{leader.name}</Media>
                        <p className="mb-3 d-none d-sm-block">{leader.designation}</p>
                        <p className="mb-5 d-none d-sm-block text-grey">{leader.description}</p>
                    </Media>
            </Media>
        );
}
function About(props) {

    const leaders = <Stagger in>
                        {props.leaders.map((leader) => {
                            return (
                                <Fade in>
                                    <RenderLeader leader={leader} 
                                    isLoading={props.leadersLoading}
                                    errMess ={props.errMess}/>
                                </Fade>
                            );
                        })}
                    </Stagger>
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>About Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-6">
                        <h2>About Us</h2>
                        <p>Frugal Drip is a street style fashion influenced clothing brand, which was started in 2020. Frugal Drip's clothing are inspired from various cultures of the past and the precognition future. Our collections range from street inspired clothing to retro aesthetic fashion such as vaporwave, retro punk, japanese streetwear,korean oversized wear, retro comics and art. We always aim to keep our brand up to date with ongoing trends and adding our touch to it. We ship across India. We use premium quality materials and Eco friendly inks.
                        Our goal is to establish Frugal Drip as a forefront brand for all types of vintage, street and fast fashion. </p>
                        <p>We want our brand to be associated with quality, customer service and of course , to be one of the best clothing brands in the history of the universe.Finally, we'd like to thank you for showing interest in our brand and hope you'll continue to support us.</p>
                        
                    </div>
                    <div className="col-12 col-md-5">
                        <Card>
                            <CardHeader className="bg-success text-black">Customer review</CardHeader>
                            <CardBody className="bg-dark text-success">
                                <dl className="row p-1">
                                    <dt className="col-8">Comfort</dt>
                                    <dd className="col-4"><i class="fa fa-check" aria-hidden="true"></i></dd>
                                    <dt className="col-8">Design</dt>
                                    <dd className="col-4"><i class="fa fa-check" aria-hidden="true"></i></dd>
                                    <dt className="col-8">Aesthetics</dt>
                                    <dd className="col-4"><i class="fa fa-check" aria-hidden="true"></i></dd>
                                    <dt className="col-8">Culture</dt>
                                    <dd className="col-4"><i class="fa fa-check" aria-hidden="true"></i></dd>
                                </dl>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 bg-success">
                        <Card>
                            <CardBody className="bg-dark">
                                <blockquote className="blockquote text-success">
                                    <p className="mb-0">"I like my money right where I can see it…hanging in my closet." </p>
                                    <footer className="blockquote-footer text-faded">Carrie Bradshaw
                                    </footer>
                                </blockquote>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 text-success">
                        <h2>Corporate Leadership</h2>
                    </div>
                    <div className="col-12">
                        <Media list>
                            {leaders}
                        </Media>
                    </div>
                </div>
            </div>
        );
}


export default About;    