import React, { useState } from 'react';
import './css/ContactList.css';

const ContactRow = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.description.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // Clipboard API unavailable - the value is still visible to copy by hand.
    }
  };

  if (item.link) {
    return (
      <a className="contact-row" href={item.link} target="_blank" rel="noreferrer">
        <span className="contact-row-label">{item.title}</span>
        <span className="contact-row-value">
          {item.description}
          <span className="contact-row-arrow" aria-hidden="true">&#8599;</span>
        </span>
      </a>
    );
  }

  return (
    <button type="button" className="contact-row" onClick={handleCopy}>
      <span className="contact-row-label">{item.title}</span>
      <span className="contact-row-value">
        {item.description}
        <span className={`contact-row-copied${copied ? ' contact-row-copied--visible' : ''}`}>
          Copied
        </span>
      </span>
    </button>
  );
};

const ContactList = ({ items }) => {
  return (
    <div className="contact-list">
      {items.map((item) => (
        <ContactRow key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ContactList;
