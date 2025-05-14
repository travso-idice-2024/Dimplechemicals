import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Inbox = ({  accessToken, fetchInboxMessages, labelName = "INBOX" }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

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

console.log("emails",emails);

  useEffect(() => {
    if (accessToken) {
      getInbox();
    }
  }, [accessToken,labelName]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
        <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-blue-600" />
        {labelName}
      </h2>

      {loading ? (
        <p>Loading emails...</p>
      ) : (
        <div className="border rounded-lg bg-white divide-y">
          {emails?.map((email) => (
            <div
              key={email.id}
              className="flex items-start md:items-center flex-col md:flex-row md:justify-between px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
            >
              {/* Left icons */}
              <div className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox" />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-blue-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400"
                />
              </div>

              {/* Email content */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 overflow-hidden">
                <div className="font-medium truncate w-32 sm:w-40">
                  {email?.from}
                </div>
                <div className="truncate flex-1">
                  <span className="font-semibold">{email?.subject}</span>{" "}
                  - <span className="text-gray-600">{email?.snippet}</span>
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
