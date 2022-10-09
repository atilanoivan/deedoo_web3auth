import React from 'react';

import * as Icon from 'react-feather';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-area bg-f7fafd">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2">
                        <div className="single-footer-widget">
                            <div className="logo">
                                <a>
                                <img src="/images/dark_transparent_cropped.png" alt="logo" style={{height: '47px'}} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-5">
                        <div className="single-footer-widget">
                            <h3>Support</h3>
                            <ul className="list">
                                <li>
                                    <a href='' target="_blank" rel="noopener noreferrer">Terms and conditions </a>
                                </li>                                
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-5">
                        <div className="single-footer-widget">
                            <h3>Title here</h3>                            
                            <ul className="footer-contact-info">
                                <li> 
                                    <Icon.MapPin />
                                    Text here
                                </li>                                
                            </ul>
                            
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        <div className="copyright-area">
                            <p>Copyright &copy; {currentYear} <a href="" target="_blank">C</a></p>
                        </div>
                    </div>
                </div>
            </div>

            
        </footer>
    )
     
}

export default Footer; 