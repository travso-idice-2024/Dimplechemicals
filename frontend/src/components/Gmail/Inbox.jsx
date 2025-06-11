import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Inbox = ({
  gmailAccessToken,
  fetchInboxMessages,
  labelName = "INBOX",
  getMessageDetail,
}) => {
  //console.log("labelName" ,labelName);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState({});

  const getInbox = async () => {
    try {
      const msgs = await fetchInboxMessages(labelName);
      setEmails(msgs);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getMessageFullDetail = async (msgid) => {
    try {
      const msgs = await getMessageDetail(msgid);
      setSelectedMessage(msgs);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  console.log("selectedMessage", selectedMessage);

  useEffect(() => {
    if (gmailAccessToken) {
      getInbox();
    }
  }, [gmailAccessToken, labelName]);

  function getHeader(headers, name) {
    if (!headers) return "";
    const header = headers.find((h) => h.name === name);
    return header ? header.value : "";
  }

  function getBody(payload) {
    if (!payload) return "No content available";

    let encodedBody = "";
    if (payload.parts) {
      const htmlPart = payload.parts.find(
        (part) => part.mimeType === "text/html"
      );
      encodedBody = htmlPart?.body?.data;
    } else {
      encodedBody = payload.body?.data;
    }

    if (!encodedBody) return "No content";

    return atob(encodedBody.replace(/-/g, "+").replace(/_/g, "/"));
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
        <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-blue-600" />
        {labelName}
      </h2>

      {loading ? (
        <p>Loading emails...</p>
      ) : selectedMessage && selectedMessage.payload ? (
        // Show the full message details if a message is selected
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <button
            className="back-button text-blue-600"
            onClick={() => setSelectedMessage(null)} // Set to null to go back to the list
          >
            ← Back to inbox
          </button>
          <h3 className="text-xl font-bold mb-2">
            {getHeader(selectedMessage.payload.headers, "Subject")}
          </h3>
          <p>
            <strong>From:</strong>{" "}
            {getHeader(selectedMessage.payload.headers, "From")}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {getHeader(selectedMessage.payload.headers, "Date")}
          </p>
          <div
            className="mt-4 border-t pt-4"
            dangerouslySetInnerHTML={{
              __html: getBody(selectedMessage.payload),
            }}
          ></div>

          {/* Show images */}
          {selectedMessage.attachments &&
            selectedMessage.attachments
              .filter((att) => att.mimeType.startsWith("image/"))
              .map((att, idx) => (
                <div key={idx} className="mt-4">
                  <strong>{att.filename}</strong>
                  <img
                    src={att.dataUrl}
                    alt={att.filename}
                    className="max-w-full h-auto border rounded shadow"
                  />
                </div>
              ))}

          {/* Show PDF attachments */}
          {selectedMessage.attachments &&
            selectedMessage.attachments
              .filter((att) => att.mimeType === "application/pdf")
              .map((att, idx) => (
                <div
                  key={idx}
                  className="mt-4 flex items-center gap-4 border p-2 rounded shadow"
                >
                  <img src="/pdf-icon.png" alt="PDF" className="w-12 h-12" />
                  <div>
                    <strong>{att.filename}</strong>
                    <div className="flex gap-2 mt-1">
                      <a
                        href={att.dataUrl}
                        download={att.filename}
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>
                      <a
                        href={att.dataUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        // Show the list of emails when no message is selected
        <div className="border rounded-lg bg-white divide-y">
          {emails?.map((email) => (
            <div
              key={email.id}
              onClick={() => {
                console.log("Clicked inbox message id:", email.id);
                getMessageFullDetail(email.id); // Fetch message details on click
                setSelectedMessage(email); // Set the selected email
              }}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
            >
              {/* Left icons */}
              <div className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox" />
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              </div>

              {/* Email content */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 overflow-hidden">
                <div className="font-medium truncate w-32 sm:w-40">
                  {email?.from}
                </div>
                <div className="truncate flex-1">
                  <span className="font-semibold">{email?.subject}</span> -{" "}
                  <span className="text-gray-600">{email?.snippet}</span>
                </div>
              </div>

              {/* Time */}
              <div className="text-sm text-gray-500 w-16 text-right">
                {email?.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;
