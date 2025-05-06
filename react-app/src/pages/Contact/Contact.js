import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/contact/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
                setFormData({ name: "", email: "", message: "" });
            } else {
                setResponseMessage("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setResponseMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>We’d love to hear from you! Reach out to us for any inquiries or support.</p>
            <div className="contact-details">
                <p><strong>Phone:</strong> +44 (123) 456-7890</p>
                <p><strong>Email:</strong> contact@ReEngage.com</p>
                <p><strong>Address:</strong> Stag Hill, University Campus, Guildford GU2 7XH</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit">Send Message</button>
            </form>
            {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
    );
};

export default Contact;