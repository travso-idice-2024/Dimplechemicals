import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { jwtDecode } from "jwt-decode";

const CLIENT_ID =
  "369846641543-at9qrr9at1c3mfg3rqpk1valfoq9rn2t.apps.googleusercontent.com";

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.modify",
].join(" ");

const useGmailAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [labels, setLabels] = useState([]);

  // Initialize GIS SDK
  useEffect(() => {
    /* global google */
    const initializeGis = () => {
      window.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          if (tokenResponse.error) {
            console.error("Token Error:", tokenResponse);
            return;
          }
          setAccessToken(tokenResponse.access_token);
          setIsAuthenticated(true);
          // Now, fetch user profile details (using token)
          fetchUserProfile(tokenResponse.access_token);
        },
      });

      // Check if already signed in
      if (window.google && google.accounts && google.accounts.oauth2) {
        const tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: (tokenResponse) => {
            if (tokenResponse.error) {
              console.error("Token error:", tokenResponse);
              return;
            }
            // Access token and user profile handling
            setAccessToken(tokenResponse.access_token);
            setIsAuthenticated(true);
            fetchUserProfile(tokenResponse.access_token);
          },
        });

        tokenClient.requestAccessToken();
      }
    };

    if (window.google && google.accounts && google.accounts.oauth2) {
      initializeGis();
    } else {
      window.onload = initializeGis;
    }
  }, []);

  const fetchUserProfile = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const user = await response.json();
      setUserProfile(user);
      console.log("User Profile:", user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // Login function using GIS
  const signIn = async () => {
    if (window.tokenClient) {
      window.tokenClient.requestAccessToken();
    } else {
      console.error("Token client not initialized.");
    }
  };

  // Logout function
  const signOut = () => {
    if (accessToken) {
      google.accounts.oauth2.revoke(accessToken, () => {
        setAccessToken(null);
        setIsAuthenticated(false);
        setEvents([]);
      });
    }
  };

  // Fetch Inbox Messages Function
  const fetchInboxMessages = async (label = "INBOX") => {
    //console.log("This message function is calling", label);
    //console.log("Label", label);

    try {
      if (!accessToken) {
        throw new Error("User not authenticated");
      }

      // Build query parameters
      const queryParams = new URLSearchParams({
        maxResults: "10",
      });

      if (label) {
        queryParams.append("labelIds", label);
      } else {
        queryParams.append("labelIds", "INBOX");
      }

      // Fetch the list of messages from Gmail
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      const messages = data.messages || [];

      // Fetch message details for each message
      const messageDetails = await Promise.all(
        messages.map(async (msg) => {
          const messageResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const messageData = await messageResponse.json();
          const headers = messageData.payload.headers;

          // Extract necessary headers
          const getHeader = (name) =>
            headers.find((h) => h.name === name)?.value || "";

          const from = getHeader("From");
          const to = getHeader("To");
          const subject = getHeader("Subject");
          const date = getHeader("Date");
          const snippet = messageData.snippet;
          const time = new Date(
            parseInt(messageData.internalDate)
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Decode plain text body if available
          let body = "";
          const parts = messageData.payload.parts;

          if (parts && parts.length) {
            const part = parts.find((p) => p.mimeType === "text/plain");
            if (part?.body?.data) {
              body = atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
            }
          } else if (messageData.payload.body?.data) {
            body = atob(
              messageData.payload.body.data
                .replace(/-/g, "+")
                .replace(/_/g, "/")
            );
          }

          return { id: msg.id, from, to, subject, date, snippet, time, body };
        })
      );

      //console.log("Inbox messages:", messageDetails);
      return messageDetails;
    } catch (error) {
      console.error("Failed to fetch inbox messages:", error);
      throw error;
    }
  };

  const fetchLabels = async () => {
    try {
      if (!accessToken) {
        throw new Error("User not authenticated");
      }

      const res = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/labels",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      setLabels(data.labels); // Assuming `setLabels` is a state update function in your component
    } catch (err) {
      console.error("Error fetching labels:", err);
    }
  };

  // ✅ Create Label Function
  const createLabel = async (labelName) => {
    try {
      if (!accessToken) throw new Error("User not authenticated");

      const response = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/labels",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: labelName,
            labelListVisibility: "labelShow",
            messageListVisibility: "show",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create label");
      }

      const data = await response.json();
      console.log("Label created successfully:", data);

      // Refresh label list after creation
      fetchLabels();
    } catch (error) {
      console.error("Error creating label:", error);
      throw error;
    }
  };

  //get message details
  const getMessageDetail = async (messageId) => {
    try {
      if (!accessToken) throw new Error("User not authenticated");

      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch message details");
      }

      const data = await response.json();
      console.log("message details", data);
      return data; // Return the message details
    } catch (error) {
      console.error("Error fetching message detail:", error);
      throw error;
    }
  };

  //get message by sender

  const getMessagesBySender = async (accessToken, senderEmail) => {
    const query = `from:${senderEmail}`;
    const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(
      query
    )}&maxResults=10`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const data = await response.json();
      console.log("Messages by sender:", data);
      return data.messages || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  //applyLabelto message

  const applyLabelToMessage = async (accessToken, messageId, labelId) => {
    try {
      if (!accessToken) throw new Error("User not authenticated");

      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addLabelIds: [labelId],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to apply label to message");
      }

      console.log("Label applied successfully");
    } catch (error) {
      console.error("Error applying label to message:", error);
      throw error;
    }
  };

  const handleRemoveLabel = async (labelId) => {
    try {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/labels/${labelId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedLabels = labels.filter((label) => label.id !== labelId);
      setLabels(updatedLabels);
      //alert("Label removed successfully!");
    } catch (error) {
      console.error("Error removing label:", error);
      //alert("Failed to remove label.");
    }
  };

  return {
    isAuthenticated,
    accessToken,
    userProfile,
    signIn,
    signOut,
    fetchInboxMessages,
    fetchLabels,
    labels,
    createLabel,
    getMessageDetail,
    getMessagesBySender,
    applyLabelToMessage,
    handleRemoveLabel,
  };
};

export default useGmailAuth;
