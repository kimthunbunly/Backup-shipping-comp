import React from "react";

import "./contact.css";

// import homeIcon from "./home.png"
import ContactDesription from "../../components/contact_description.jsx";
import ContactForm from "../../components/contact_form.jsx";
const About = () => {
    return (
        <div className="container card mt-4 mb-4 custom-shadow">
            <div className="card-body">
                <h2>
                    <p>Contact us</p>
                </h2>
                <hr />

                <ContactDesription />
                <div className="contact-form">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default About;
