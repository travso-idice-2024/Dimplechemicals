import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ComposeEmail = ({ gmailAccessToken, onClose }) => {
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComposeData({ ...composeData, [name]: value });
  };

  const sendEmail = async () => {
    const email = [
      `To: ${composeData.to}`,
      "Content-Type: text/plain; charset=utf-8",
      `Subject: ${composeData.subject}`,
      "",
      composeData.message,
    ].join("\n");

    const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    try {
      const response = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw: base64EncodedEmail }),
        }
      );

      if (response.ok) {
        alert("Email sent successfully!");
        onClose();
      } else {
        const error = await response.json();
        console.error("Send email error:", error);
        alert("Failed to send email.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 p-2 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h3 className="text-xl font-semibold mb-4">Compose Email</h3>

        <input
          type="email"
          name="to"
          placeholder="To"
          value={composeData.to}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={composeData.subject}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={composeData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32 mb-3"
        ></textarea>

        <button
          onClick={sendEmail}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ComposeEmail;
