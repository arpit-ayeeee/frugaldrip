import React from 'react';
import {Link} from 'react-router-dom';//We wont use NavLink, Link is enough
//We'll define the footer component as a function component

function Footer(){
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h5 className="text-secondary">Links</h5>
                        <ul className="list-unstyled" id="link">
                            <li><Link to="/home" className="text-secondary">Home</Link></li>
                            <li><Link to="/about" className="text-secondary">About Us</Link></li>
                            <li><Link to="/menu" className="text-secondary">Collection</Link></li>
                            <li><Link to="/contact" className="text-secondary">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5 text-secondary">
                        <h5>Our Address</h5>
                        <address className="text-secondary">
                        Ramky North, Avalahalli<br />
                        Yelahanka, Bengaluru (560064)<br />
                        Karnataka<br />
                        <i className="fa fa-phone fa-lg"></i>: +91 6266066700<br />
                        <i className="fa fa-fax fa-lg"></i>: +91 6266066700<br />
                        <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:frugaldrip69420@gmail.com">
                        frugaldrip69420@gmail.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center m-auto">
                        <div className="text-center">
                                <a class="btn btn-social-icon btn-facebook" href="https://www.instagram.com/arpit.ayeeeeeeeee"><i class="fa fa-instagram"></i></a>
		                		<a class="btn btn-social-icon btn-facebook" href="https://www.facebook.com/arpitjaiswal282000"><i class="fa fa-facebook"></i></a>
		                		<a class="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/arpit-jaiswal-a63076172"><i class="fa fa-linkedin"></i></a>
		                        <a class="btn btn-social-icon btn-google" href="mailto:frugaldrip69420@gmail.com"><i class="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto text-secondary">
                        <p>© Copyright 2020 Frugal Drip</p>
                    </div>
                </div>
            </div>
         </div>
    )
}



export default Footer;
