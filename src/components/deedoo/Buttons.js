import React, { useState, useEffect } from "react";

function Buttons (props){
    const [form, setForm] = useState(props.form);

    const selectForm = (form) => {
        console.log("Selected form1: " + form);
        setForm(form);   
        props.selectForm(form);                
    };
    
    return (
        <div className="container">
            <div className="section-title">
                <h2>TITLE HERE</h2>
                <div className="bar"></div>
                <p>Select an option:</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-xs-8">
                    <div className="single-blog-post">            
                        <button className="deedoo-button"
                        onClick={() => {
                            selectForm("teaching");
                        }}
                        
                        > TEACHING </button>            
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-xs-8">
                    <div className="single-blog-post">            
                        <button className="deedoo-button"                
                        onClick={() => {
                            selectForm("backing");
                        }}
                        > BACKING </button>            
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-xs-8">
                    <div className="single-blog-post">            
                        <button className="deedoo-button"                
                        onClick={() => {
                            selectForm("learning");
                        }}
                        > LEARNING</button>            
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Buttons;