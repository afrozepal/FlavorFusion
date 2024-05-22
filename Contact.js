import React from 'react';
import { Nav, Nav2 } from './nav.js';
import './stylingcontact.css';
import { FaPhone, FaEnvelope, FaInstagram ,FaLinkedin  } from 'react-icons/fa'; // Import icons from react-icons library

const Contact = () => {
  return (
    <>
      <Nav />
      <Nav2 />
      <div className="contact-container">
        <h1 className="contact-heading">Contact Us</h1>
        <p className="contact-subheading">One step away from taste</p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5513466616294!2d74.30043917469469!3d31.4815257490619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2s!4v1713620104188!5m2!1sen!2s"
        width="100%"
        height="300"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="parent-container">
       <div className="white-transparent-container">     
          <div className="row">
            <div className="col-md-12">
              <FaPhone /> +1 234 567 890
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <a href="mailto:chsamreen370@gmail.com" className="contact-link" ><FaEnvelope /> FlavourFusion@gmail.com</a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            <a href="https://its_samreenriaz.com" className="contact-link"><FaInstagram /> instagram.com/FlavorFusion</a>
            </div>
          </div>
          <div className="row">
              <div className="col-md-12">
                <a href="https://linkedin.com/in/samreen-riaz-897ab5253" className="contact-link"><FaLinkedin /> linkedin.com/in/FlavorFusion</a>
              </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default Contact;
