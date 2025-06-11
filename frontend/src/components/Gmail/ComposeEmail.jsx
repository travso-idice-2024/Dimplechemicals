import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const ComposeEmail = ({ gmailAccessToken, onClose }) => {
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [attachment, setAttachment] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComposeData({ ...composeData, [name]: value });
  };

  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
  };

  // const sendEmail = async () => {
  //   const boundary = "foo_bar_baz";
  //   let base64FileContent = "";

  //   if (attachment) {
  //     const fileContent = await readFileAsBase64(attachment);
  //     base64FileContent = fileContent.replace(/\r?\n|\r/g, "");
  //   }

  //   let emailParts = [
  //     `To: ${composeData.to}`,
  //     `Cc: umasharma0821@gmail.com`,
  //     `Subject: ${composeData.subject}`,
  //     "MIME-Version: 1.0",
  //     `Content-Type: multipart/mixed; boundary="${boundary}"`,
  //     "",
  //     `--${boundary}`,
  //     "Content-Type: text/plain; charset=UTF-8",
  //     "Content-Transfer-Encoding: 7bit",
  //     "",
  //     composeData.message,
  //   ];

  //   if (attachment) {
  //     emailParts = emailParts.concat([
  //       "",
  //       `--${boundary}`,
  //       `Content-Type: ${attachment.type}; name="${attachment.name}"`,
  //       "Content-Transfer-Encoding: base64",
  //       `Content-Disposition: attachment; filename="${attachment.name}"`,
  //       "",
  //       base64FileContent,
  //     ]);
  //   }

  //   emailParts.push(`--${boundary}--`);

  //   const email = emailParts.join("\r\n");

  //   const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
  //     .replace(/\+/g, "-")
  //     .replace(/\//g, "_")
  //     .replace(/=+$/, "");

  //   try {
  //     const response = await fetch(
  //       "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${gmailAccessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ raw: base64EncodedEmail }),
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Email sent successfully!");
  //       onClose();
  //     } else {
  //       const error = await response.json();
  //       console.error("Send email error:", error);
  //       alert("Failed to send email.");
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };

  // const readFileAsBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result.split(",")[1]);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const sendEmail = async () => {
  //   const email = [
  //     `To: ${composeData.to}`,
  //     `Cc: umasharma0821@gmail.com`,
  //     "Content-Type: text/plain; charset=utf-8",
  //     `Subject: ${composeData.subject}`,
  //     "",
  //     composeData.message,
  //   ].join("\n");

  //   const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
  //     .replace(/\+/g, "-")
  //     .replace(/\//g, "_")
  //     .replace(/=+$/, "");

  //   try {
  //     const response = await fetch(
  //       "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${gmailAccessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ raw: base64EncodedEmail }),
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Email sent successfully!");
  //       onClose();
  //     } else {
  //       const error = await response.json();
  //       console.error("Send email error:", error);
  //       alert("Failed to send email.");
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };


  const sendEmail = async () => {
    const boundary = "foo_bar_baz";
    let base64FileContent = "";
  
    // Read file as base64 if there's an attachment
    if (attachment) {
      const fileContent = await readFileAsBase64(attachment);
      base64FileContent = fileContent.replace(/\r?\n|\r/g, "");
    }
  
    // Compose email headers and body parts
    let emailParts = [
      `To: ${composeData.to}`,
      `Cc: umasharma0821@gmail.com`,
      `Subject: ${composeData.subject}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 7bit",
      "",
      composeData.message,
    ];
  
    // If attachment exists, add it to email body
    if (attachment) {
      emailParts = emailParts.concat([
        "",
        `--${boundary}`,
        `Content-Type: ${attachment.type || "application/octet-stream"}; name="${attachment.name}"`,
        "Content-Transfer-Encoding: base64",
        `Content-Disposition: attachment; filename="${attachment.name}"`,
        "",
        base64FileContent,
      ]);
    }
  
    // Close the MIME boundary
    emailParts.push(`--${boundary}--`);
  
    // Encode final email body
    const email = emailParts.join("\r\n");
    const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  
    // Send email via Gmail API
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
  
  // Helper: read file as base64
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Return base64 content without the Data URL prefix
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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

        <input type="file" onChange={handleAttachment} className="mb-3" />

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
