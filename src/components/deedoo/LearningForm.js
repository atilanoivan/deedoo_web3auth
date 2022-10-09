import React, { useState, useEffect } from "react";

function LearningForm (props){
    const [form, setForm] = useState(props.form);

    const selectForm = (form) => {
        setForm(form);   
        props.selectForm(form);                
    };
    
    return (
        <div className="container">
            <div className="section-title">
                <h2>LEARNING FORM</h2>
                <div className="bar"></div>                
            </div>
            <div className="row justify-content-center">
                <div className="row justify-content-center">
                <div className="col-lg-2 col-md-4 col-xs-6">
                        <div className="single-blog-post">            
                            <button className="deedoo-button-back"                
                            onClick={() => {
                                selectForm("");
                            }}
                            > {"< "}BACK</button>            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningForm;