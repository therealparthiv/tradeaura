import React, { useState } from "react";

// A reusable FAQ item component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const itemStyle = {
    borderBottom: "1px solid var(--border-color)",
    padding: "1.5rem 0",
  };

  const questionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "1.2rem",
  };

  const answerStyle = {
    marginTop: "1rem",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
    maxHeight: isOpen ? "200px" : "0",
    overflow: "hidden",
    transition: "max-height 0.3s ease-in-out",
  };

  return (
    <div style={itemStyle}>
      <div style={questionStyle} onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span
          style={{
            fontSize: "1.5rem",
            transform: isOpen ? "rotate(45deg)" : "none",
            transition: "transform 0.2s",
          }}>
          +
        </span>
      </div>
      <p style={answerStyle}>{answer}</p>
    </div>
  );
};

function ContactPage() {
  const faqs = [
    {
      question: "How do I open an account?",
      answer:
        'You can open an account completely online by clicking the "Login / Register" button. You will need your PAN card, Aadhaar card, and a bank proof to complete the KYC process.',
    },
    {
      question: "What are the brokerage charges?",
      answer:
        "We offer zero brokerage on equity delivery and direct mutual funds. For intraday and F&O trades, we charge a flat fee of ₹20 per executed order. Please visit our pricing page for more details.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Absolutely. We are a SEBI registered broker. Your funds and investments are held securely in your own Demat account with CDSL, and are protected under SEBI guidelines.",
    },
  ];

  const pageHeaderStyle = {
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundColor: "var(--background-light)",
  };

  const contactSectionStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    padding: "4rem 5%",
    flexWrap: "wrap",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    textAlign: "center",
    flex: "1",
    minWidth: "300px",
  };

  const faqSectionStyle = {
    padding: "4rem 5%",
    maxWidth: "900px",
    margin: "0 auto",
  };

  return (
    <div>
      <div style={pageHeaderStyle}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Support Center
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}>
          We're here to help you with any questions.
        </p>
      </div>

      <div style={contactSectionStyle}>
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "1rem" }}>Email Support</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Get in touch with our support team for any queries.
          </p>
          <a href="mailto:support@example.com" className="btn">
            Email Us
          </a>
        </div>
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "1rem" }}>Office Address</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
            TradeAura Technologies Pvt. Ltd.
            <br />
            123 Innovation Drive, Financial District
            <br />
            Kochi, Kerala, India - 682030
          </p>
        </div>
      </div>

      <div style={faqSectionStyle}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "3rem",
          }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default ContactPage;
