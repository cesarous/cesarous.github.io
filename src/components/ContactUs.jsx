import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './css/ContactUs.css';

const EMAILJS_SERVICE_ID = 'service_cero';
const EMAILJS_TEMPLATE_ID = 'template_zxczxc9';
const EMAILJS_USER_ID = 'llNM_qDTX-jUPDiIL';

export const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_USER_ID)
      .then(() => {
        setStatus('success');
        form.current.reset();
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <section id="contact-form">
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="contact-form-field">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" />
          </div>
        </div>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="contact-form-field">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" />
          </div>
        </div>
        <div className="contact-form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>

        <div className="contact-form-footer">
          <button type="submit" className="contact-form-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending' : 'Send'}
          </button>
          <p className={`contact-form-status contact-form-status--${status}`} role="status">
            {status === 'success' && "Sent. I'll get back to you soon."}
            {status === 'error' && 'Something went wrong. Email me directly at cero@umich.edu.'}
          </p>
        </div>
      </form>
    </section>
  );
};

export default ContactUs;
